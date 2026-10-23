"""Build public/ for Netlify.

- public/index.html   : giao diện (src/shell.html + src/crypto.js + src/kit.js + src/game.js)
- public/data.enc.json: số liệu đã mã hóa AES-256-GCM (PBKDF2-SHA256, 250k vòng)

Số liệu gốc nằm trong data/ và mật khẩu trong .password (hoặc biến môi trường SEO_OPS_PASSWORD);
cả hai đều bị .gitignore, không bao giờ đẩy lên GitHub.
Chạy:  python3 build.py            (dựng cả giao diện và số liệu)
       python3 build.py --ui-only  (chỉ dựng lại giao diện)
"""
import base64, datetime, json, os, secrets, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC, DATA, OUT = (os.path.join(ROOT, d) for d in ("src", "data", "public"))
os.makedirs(OUT, exist_ok=True)

def build_ui():
    rd = lambda f: open(os.path.join(SRC, f), encoding="utf-8").read()
    html = rd("shell.html") + "\n<script>\n" + rd("crypto.js") + rd("kit.js") + "\n" + rd("game.js") + "\n</script>\n</body>\n</html>\n"
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(html)
    open(os.path.join(OUT, "_headers"), "w").write(
        "/*\n  X-Robots-Tag: noindex, nofollow\n  X-Frame-Options: DENY\n  Referrer-Policy: no-referrer\n"
        "/data.enc.json\n  Cache-Control: no-store\n/data.public.json\n  Cache-Control: no-store\n")
    open(os.path.join(OUT, "robots.txt"), "w").write("User-agent: *\nDisallow: /\n")
    print("public/index.html", len(html), "bytes")

def build_data():
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    pw = os.environ.get("SEO_OPS_PASSWORD")
    if not pw:
        pw = open(os.path.join(ROOT, ".password"), encoding="utf-8").read().strip().splitlines()[-1].strip()
    L = lambda n: json.load(open(os.path.join(DATA, n), encoding="utf-8"))
    now = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=7)
    data = {
        "meta": {"site": "ticosystem.com", "start": "2026-10-23", "built": now.strftime("%d/%m/%Y %H:%M") + " ICT",
                 "colors": {"chief": "#9b6542", "scan": "#6b8a45", "tech": "#4f7393", "writer": "#a8566a",
                            "local": "#3c6d68", "outreach": "#c0602f", "report": "#46557a"}},
        "bots": L("bots.json"), "plan": L("plan.json"), "activity": L("activity.json"),
        "gsc": L("gsc_summary.json")[0], "queries": L("gsc_queries.json"), "targets": L("targets.json"), "audit": L("audit.json"),
    }
    public = {
        "meta": data["meta"], "bots": data["bots"],
        "plan": [{k: r[k] for k in ("id", "ngay", "date", "lich", "bot", "bot_ten", "viec", "trang_thai") if k in r} for r in data["plan"]],
        "activity": [{k: r[k] for k in ("id", "luc", "gio", "bot", "bot_ten", "ma", "viec")} for r in data["activity"]],
    }
    json.dump(public, open(os.path.join(OUT, "data.public.json"), "w", encoding="utf-8"), ensure_ascii=False)
    salt, iv, it = secrets.token_bytes(16), secrets.token_bytes(12), 250000
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=it).derive(pw.encode())
    ct = AESGCM(key).encrypt(iv, json.dumps(data, ensure_ascii=False).encode(), None)
    e = lambda b: base64.b64encode(b).decode()
    json.dump({"salt": e(salt), "iv": e(iv), "iter": it, "ct": e(ct)}, open(os.path.join(OUT, "data.enc.json"), "w"))
    print("public/data.enc.json", data["meta"]["built"])

build_ui()
if "--ui-only" not in sys.argv:
    build_data()
