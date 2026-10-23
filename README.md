# Văn phòng bot SEO · TicoSystem

Trang mô phỏng "phòng SEO" của ticosystem.com: 7 bot (khỉ Chief, cú, gấu mèo, thỏ, gấu trúc, cáo, chim cánh cụt) đi lại giữa các phòng ban, kèm số liệu Search Console, kế hoạch 15 ngày và nhật ký.

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| `src/shell.html` | Khung trang và CSS |
| `src/kit.js` | Bộ vẽ nhân vật, bàn ghế, phòng (SVG) |
| `src/game.js` | Bản đồ, mô phỏng đi lại, camera zoom/kéo, trang từng phòng |
| `src/crypto.js` | Giải mã số liệu bằng mật khẩu ngay trên trình duyệt |
| `build.py` | Dựng `public/` |
| `public/` | Thư mục Netlify xuất bản (`index.html`, `data.enc.json`) |

## Bảo mật

Số liệu chỉ có trong `public/data.enc.json` dưới dạng mã hóa AES-256-GCM (khóa sinh từ mật khẩu bằng PBKDF2-SHA256, 250.000 vòng). Số liệu gốc (`data/`) và mật khẩu (`.password`) bị `.gitignore` nên không có trên GitHub.

## Cập nhật

```bash
python3 build.py            # dựng lại giao diện + số liệu (cần data/ và .password)
python3 build.py --ui-only  # chỉ sửa giao diện
git add public src build.py && git commit -m "..." && git push
```

Netlify nối với repo này sẽ tự xuất bản sau mỗi lần push.
