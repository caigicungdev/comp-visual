/* ======================= office map (top-down) ======================= */
const MAP_W = 1600, MAP_H = 1000;
const ROOMS = {
  data: { x: 40, y: 40, w: 380, h: 390, top: true }, tech: { x: 420, y: 40, w: 380, h: 390, top: true },
  content: { x: 800, y: 40, w: 380, h: 390, top: true }, sales: { x: 1180, y: 40, w: 380, h: 390, top: true },
  meet: { x: 40, y: 560, w: 480, h: 400 }, boss: { x: 520, y: 560, w: 560, h: 400 }, cafe: { x: 1080, y: 560, w: 480, h: 400 },
};
const CORR_Y = 495;
const doorOf = (id) => { const r = ROOMS[id], cx = id === 'boss' ? 800 : r.x + r.w / 2; return { x: cx, inY: r.top ? 400 : 592, corrY: CORR_Y }; };
const HOME = { scan: [150, 214], report: [310, 214], tech: [560, 214], writer: [940, 214], local: [1290, 214], outreach: [1450, 214], chief: [800, 742] };
const EXIT = { scan: -82, report: 82, tech: -82, writer: -82, local: -82, outreach: 82, chief: 0 };
const CAFE_SEATS = [[1158, 712], [1262, 712], [1158, 868], [1262, 868], [1352, 926], [1432, 926]];
const GUEST = [[742, 892], [858, 892]];
const FLOORS = { data: 'url(#f-wood)', tech: 'url(#f-tech)', content: 'url(#f-rose)', sales: 'url(#f-sand)', meet: 'url(#f-blue)', boss: 'url(#f-dark)', cafe: 'url(#f-check)' };

const mapDefs = () => `<defs>
  <pattern id="f-wood" width="140" height="56" patternUnits="userSpaceOnUse"><rect width="140" height="56" fill="#dcb27a"/><path d="M0 28H140M0 56H140M40 0V28M110 28V56" stroke="#c49558" stroke-width="2.5"/></pattern>
  <pattern id="f-dark" width="140" height="56" patternUnits="userSpaceOnUse"><rect width="140" height="56" fill="#c8915a"/><path d="M0 28H140M0 56H140M40 0V28M110 28V56" stroke="#ad7a45" stroke-width="2.5"/></pattern>
  <pattern id="f-tech" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#b8c0ca"/><circle cx="6" cy="6" r="2" fill="#a2abb7"/><circle cx="18" cy="18" r="2" fill="#a2abb7"/></pattern>
  <pattern id="f-rose" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#dcbdb1"/><path d="M0 12H24M12 0V24" stroke="#d0ada0" stroke-width="2"/></pattern>
  <pattern id="f-sand" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#d7c890"/><circle cx="12" cy="12" r="2.2" fill="#c7b77c"/></pattern>
  <pattern id="f-blue" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#b4c3cf"/><path d="M0 24L24 0" stroke="#a6b6c3" stroke-width="2"/></pattern>
  <pattern id="f-check" width="56" height="56" patternUnits="userSpaceOnUse"><rect width="56" height="56" fill="#efe6d3"/><rect width="28" height="28" fill="#dacfb7"/><rect x="28" y="28" width="28" height="28" fill="#dacfb7"/></pattern>
  <pattern id="f-hall" width="48" height="48" patternUnits="userSpaceOnUse"><rect width="48" height="48" fill="#ece4d2"/><path d="M0 0H48V48" fill="none" stroke="#d8ccb6" stroke-width="2"/></pattern>
</defs>`;

const T = (fill, w = 3.5, extra = '') => `fill="${fill}" stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${extra}`;
function deskT(cx, cy, w = 130, h = 56, mugc = '#7c98b3') {
  return `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="7" ${T('#e3b57b')}/>
  <path d="M ${cx - w / 2 + 6},${cy + h / 2 - 8} L ${cx + w / 2 - 6},${cy + h / 2 - 8}" ${L(2.5, 'opacity=".3"')}/>
  <rect x="${cx - 21}" y="${cy - 14}" width="42" height="26" rx="4" ${T('#dfe2dd', 3)}/><rect x="${cx - 21}" y="${cy + 10}" width="42" height="6" rx="2" ${T('#4f5664', 2.5)}/>
  <circle cx="${cx - w / 2 + 20}" cy="${cy - 4}" r="8.5" ${T(mugc, 3)}/><circle cx="${cx - w / 2 + 20}" cy="${cy - 4}" r="4.5" fill="#7a4a2c"/>
  <g transform="rotate(8 ${cx + w / 2 - 26} ${cy})"><rect x="${cx + w / 2 - 40}" y="${cy - 14}" width="26" height="30" rx="2" ${T('#fbfaf6', 2.5)}/><path d="M ${cx + w / 2 - 34},${cy - 6} h 14 M ${cx + w / 2 - 34},${cy + 1} h 14 M ${cx + w / 2 - 34},${cy + 8} h 9" ${L(2, 'opacity=".45"')}/></g>`;
}
const chairT = (x, y, c = '#5d6b62') => `<circle cx="${x}" cy="${y - 6}" r="23" ${T(c)}/><circle cx="${x}" cy="${y - 6}" r="14" fill="#fff" opacity=".12"/>`;
function plantT(x, y, s = 1) {
  let g = `<g transform="translate(${x} ${y}) scale(${s})"><g class="leaf">`;
  for (let i = 0; i < 7; i++) { const a = i * 360 / 7; g += `<ellipse cx="0" cy="-17" rx="9" ry="18" transform="rotate(${a})" ${T(i % 2 ? '#7aa864' : '#5f8a4d', 3)}/>`; }
  return g + `</g><circle r="13" ${T('#b9704f', 3)}/><circle r="7" fill="#7a4a2c"/></g>`;
}
function rackT(x, y, w, h) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ${T('#4f5664')}/>`;
  for (let i = 0; i < Math.floor((h - 16) / 22); i++) { const yy = y + 10 + i * 22; s += `<rect x="${x + 8}" y="${yy}" width="${w - 16}" height="15" rx="3" ${T('#6b7382', 2.5)}/><circle class="led" cx="${x + 16}" cy="${yy + 7.5}" r="2.6" fill="${i % 2 ? '#8dbb6f' : '#f0c45a'}" style="animation-delay:${(i * .37) % 1.3}s"/>`; }
  return s;
}
function shelfT(x, y, w, h) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ${T('#b47a45')}/>`;
  const cs = ['#46557a', '#b8483a', '#e2b13f', '#6f9a5b', '#a8566a'];
  if (h > w) { for (let yy = y + 8, i = 0; yy < y + h - 14; yy += 14, i++) s += `<rect x="${x + 6}" y="${yy}" width="${w - 12 - (i % 3) * 4}" height="10" rx="2" ${T(cs[i % 5], 2)}/>`; }
  else { for (let xx = x + 8, i = 0; xx < x + w - 14; xx += 14, i++) s += `<rect x="${xx}" y="${y + 6}" width="10" height="${h - 12 - (i % 3) * 4}" rx="2" ${T(cs[i % 5], 2)}/>`; }
  return s;
}
function sofaT(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" ${T('#7c98b3')}/><rect x="${x + 8}" y="${y + h - 22}" width="${w - 16}" height="16" rx="8" ${T('#6a86a2', 3)}/>
  <rect x="${x + 14}" y="${y + 8}" width="${w / 2 - 20}" height="${h - 36}" rx="10" ${T('#8fa9c2', 3)}/><rect x="${x + w / 2 + 6}" y="${y + 8}" width="${w / 2 - 20}" height="${h - 36}" rx="10" ${T('#8fa9c2', 3)}/>`;
}
function roundTableT(x, y, r) { return `<circle cx="${x}" cy="${y}" r="${r}" ${T('#e3b57b')}/><circle cx="${x - 8}" cy="${y - 6}" r="7" ${T('#fbfaf6', 2.5)}/><circle cx="${x - 8}" cy="${y - 6}" r="3.5" fill="#7a4a2c"/>`; }
const stoolT = (x, y) => `<circle cx="${x}" cy="${y - 6}" r="17" ${T('#b8664f')}/>`;

function drawMap(D) {
  let s = mapDefs();
  s += `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#9fb59a"/>`;
  for (let i = 0; i < 40; i++) { const x = (i * 263) % MAP_W, y = (i * 151) % MAP_H; s += `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" fill="#8fa98b"/>`; }
  s += `<rect x="26" y="26" width="${MAP_W - 52}" height="${MAP_H - 52}" rx="10" fill="#d9cdb7"/>`;
  s += `<rect x="40" y="430" width="1520" height="130" fill="url(#f-hall)"/>`;
  s += `<rect x="120" y="470" width="1360" height="50" rx="25" ${T('#c76b4f', 3, 'opacity=".9"')}/><rect x="134" y="480" width="1332" height="30" rx="15" fill="none" stroke="#f0d3a8" stroke-width="3" stroke-dasharray="12 9"/>`;
  Object.entries(ROOMS).forEach(([id, r]) => { s += `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${FLOORS[id]}"/>`; });
  // furniture
  const deskOf = (id) => { const [x, y] = HOME[id]; return [x, y + 44]; };
  ['scan', 'report', 'tech', 'writer', 'local', 'outreach'].forEach((id, i) => { const [x, y] = HOME[id]; s += chairT(x, y); const [dx, dy] = deskOf(id); s += deskT(dx, dy, 130, 56, ['#7c98b3', '#b8483a', '#e2b13f', '#6f9a5b'][i % 4]); });
  // data room
  s += `<rect x="60" y="56" width="68" height="44" rx="4" ${T('#9aa1a8')}/><path d="M 66,78 h 56" ${L(2.5)}/><circle cx="94" cy="68" r="2.5" fill="${INK}"/><circle cx="94" cy="90" r="2.5" fill="${INK}"/>`;
  s += plantT(386, 80, .9) + plantT(80, 392, .8);
  s += `<rect x="190" y="44" width="100" height="12" rx="3" ${T('#fbfaf5', 3)}/>`;
  // tech room
  s += rackT(680, 64, 92, 170) + `<path d="M 680,180 C 640,200 620,240 600,258" fill="none" stroke="#4f5664" stroke-width="4" stroke-dasharray="7 6" stroke-linecap="round"/>`;
  s += plantT(452, 392, .8) + plantT(770, 392, .8);
  // content room
  s += shelfT(1124, 70, 40, 280) + shelfT(830, 54, 150, 30) + plantT(1080, 392, .85);
  s += `<rect x="1010" y="300" width="90" height="62" rx="12" ${T('#a8566a')}/><rect x="1022" y="310" width="66" height="36" rx="8" fill="#bf7286"/>`;
  // sales room
  s += `<rect x="1210" y="58" width="60" height="40" rx="4" ${T('#9aa1a8')}/><rect x="1280" y="58" width="60" height="40" rx="4" ${T('#9aa1a8')}/><path d="M 1216,78 h 48 M 1286,78 h 48" ${L(2.5)}/>`;
  s += plantT(1530, 80, .85) + plantT(1210, 392, .8) + `<rect x="1350" y="44" width="110" height="12" rx="3" ${T('#fbfaf5', 3)}/>`;
  // meeting room
  s += `<rect x="110" y="566" width="340" height="12" rx="3" ${T('#fbfaf5', 3)}/>`;
  [[180, 690], [280, 682], [380, 690], [180, 852], [280, 860], [380, 852]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="21" ${T('#5d6b62')}/>`; });
  s += `<ellipse cx="280" cy="770" rx="170" ry="70" ${T('#e3b57b')}/><ellipse cx="280" cy="770" rx="150" ry="54" fill="none" stroke="#c98f56" stroke-width="2.5"/>`;
  s += `<g transform="rotate(-6 230 760)"><rect x="210" y="745" width="40" height="30" rx="2" ${T('#fbfaf6', 2.5)}/></g><circle cx="330" cy="772" r="8.5" ${T('#7c98b3', 3)}/><circle cx="330" cy="772" r="4.5" fill="#7a4a2c"/>`;
  s += plantT(486, 930, .8) + plantT(74, 930, .8);
  // boss room
  s += `<ellipse cx="800" cy="812" rx="230" ry="120" ${T('#b8664f')}/><ellipse cx="800" cy="812" rx="205" ry="100" fill="none" stroke="#f0d3a8" stroke-width="3" stroke-dasharray="12 9"/>`;
  s += chairT(800, 742, '#7e3f35');
  s += deskT(800, 800, 250, 74, '#b8483a') + `<g transform="translate(888 792)"><circle r="12" ${T('#3f6e4f', 3)}/><circle r="4" fill="#f0c45a"/></g>`;
  GUEST.forEach(([x, y]) => { s += `<rect x="${x - 22}" y="${y - 26}" width="44" height="40" rx="12" ${T('#7c98b3')}/>`; });
  s += shelfT(536, 590, 36, 300) + plantT(1050, 594, .9) + plantT(1050, 930, .9) + plantT(560, 930, .8);
  // cafe
  s += `<rect x="1500" y="590" width="50" height="300" rx="6" ${T('#c98f56')}/><rect x="1494" y="584" width="62" height="312" rx="6" fill="none" stroke="${INK}" stroke-width="3.5"/>`;
  s += `<rect x="1506" y="620" width="38" height="46" rx="5" ${T('#4f5664', 3)}/><circle cx="1525" cy="652" r="6" ${T('#fbfaf6', 2.5)}/>`;
  [700, 730, 760].forEach((y, i) => { s += `<circle cx="1525" cy="${y}" r="8" ${T(['#b8483a', '#e2b13f', '#7c98b3'][i], 3)}/>`; });
  s += `<rect x="1508" y="800" width="34" height="52" rx="6" ${T('#cfe4ea', 3)}/><circle cx="1525" cy="814" r="9" ${T('#9cc3d3', 2.5)}/>`;
  [[1210, 712], [1210, 868]].forEach(([x, y]) => { s += stoolT(x - 52, y) + stoolT(x + 52, y) + roundTableT(x, y - 4, 34); });
  s += sofaT(1312, 900, 160, 52) + plantT(1110, 592, .85) + plantT(1110, 930, .8) + plantT(1470, 610, .7);
  // walls
  const wall = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${T('#efe6d6')}/>`;
  s += wall(26, 26, MAP_W - 52, 14) + wall(26, MAP_H - 40, MAP_W - 52, 14) + wall(26, 26, 14, MAP_H - 52) + wall(MAP_W - 40, 26, 14, MAP_H - 52);
  const gapsTop = [230, 610, 990, 1370], gapsBot = [280, 800, 1320];
  const run = (y, gaps) => { let x0 = 40; gaps.forEach((g) => { s += wall(x0, y, g - 48 - x0, 12); x0 = g + 48; }); s += wall(x0, y, MAP_W - 40 - x0, 12); };
  run(424, gapsTop); run(554, gapsBot);
  [414, 794, 1174].forEach((x) => { s += wall(x, 40, 12, 384); });
  [514, 1074].forEach((x) => { s += wall(x, 566, 12, MAP_H - 606); });
  gapsTop.forEach((g) => { s += `<rect x="${g - 34}" y="404" width="68" height="16" rx="6" ${T('#b8664f', 3)}/>`; });
  gapsBot.forEach((g) => { s += `<rect x="${g - 34}" y="570" width="68" height="16" rx="6" ${T('#b8664f', 3)}/>`; });
  // labels + click areas
  Object.entries(ROOMS).forEach(([id, r]) => {
    const name = DEPTS[id].name, w = name.length * 9.2 + 40;
    s += `<rect class="room-hit" data-room="${id}" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="transparent"/>`;
    const lx = r.top ? r.x + 14 : r.x + 14, ly = r.top ? r.y + r.h - 50 : r.y + r.h - 46;
    s += `<g data-room="${id}" class="room-hit" style="cursor:pointer"><rect x="${lx}" y="${ly}" width="${w}" height="30" rx="15" ${T('#fffaf0', 3)}/><text x="${lx + 14}" y="${ly + 20}" font-family="Baloo 2, sans-serif" font-weight="800" font-size="14" fill="${INK}">${esc(name)} →</text></g>`;
  });
  s += `<g id="actors"></g><g id="fx"></g>`;
  return s;
}

/* ---------- actors ---------- */
function miniTorso(id) {
  const sp = SPECIES[id];
  const base = 'M -18,-2 Q -19,-31 0,-33 Q 19,-31 18,-2 Z';
  switch (sp.animal) {
    case 'monkey': return `<path d="${base}" ${T(sp.top, 3)}/><path d="M -6,-32 L 0,-18 L 6,-32 Z" ${T('#fbfaf6', 2.5)}/><path d="M -2,-29 L 2,-29 L 3,-14 L 0,-10 L -3,-14 Z" ${T('#b8483a', 2)}/>`;
    case 'panda': return `<path d="${base}" ${T('#fbfaf6', 3)}/><path d="M -18,-2 Q -19,-31 -6,-33 L -10,-2 Z M 18,-2 Q 19,-31 6,-33 L 10,-2 Z" ${T('#2f2a28', 2.5)}/>`;
    case 'penguin': return `<path d="${base}" ${T(sp.fur, 3)}/><path d="M -10,-2 Q -12,-26 0,-29 Q 12,-26 10,-2 Z" fill="#fbfaf6"/><path d="M -5,-30 L 0,-27 L 5,-30 L 5,-24 L 0,-27 L -5,-24 Z" ${T('#c9543c', 2)}/>`;
    case 'raccoon': return `<path d="${base}" ${T(sp.fur, 3)}/><path d="M -11,-22 L 11,-22 L 10,-2 L -10,-2 Z" ${T(sp.top, 2.5)}/>`;
    case 'fox': return `<path d="${base}" ${T(sp.fur, 3)}/><path d="M -13,-32 Q 0,-26 13,-32 L 12,-26 Q 0,-20 -12,-26 Z" ${T(sp.top, 2.5)}/>`;
    default: return `<path d="${base}" ${T(sp.top, 3)}/>`;
  }
}
function spriteSVG(id, mode) {
  const sp = SPECIES[id];
  return `<g class="flip">
    <ellipse cx="0" cy="2" rx="21" ry="7" fill="${INK}" opacity=".18"/>
    <g class="feet"><ellipse class="fl" cx="-8" cy="-2" rx="7" ry="5" ${T(DARK_PAW.includes(sp.paw) ? sp.paw : sp.fur === '#f5f0e6' ? '#f5f0e6' : sp.paw, 2.5)}/><ellipse class="fr" cx="8" cy="-2" rx="7" ry="5" ${T(DARK_PAW.includes(sp.paw) ? sp.paw : sp.fur === '#f5f0e6' ? '#f5f0e6' : sp.paw, 2.5)}/></g>
    <g class="bodyg">
      <ellipse cx="-19" cy="-16" rx="5.5" ry="9" ${T(sp.paw, 2.5)}/><ellipse cx="19" cy="-16" rx="5.5" ry="9" ${T(sp.paw, 2.5)}/>
      ${miniTorso(id)}
      <g transform="translate(0 -52) scale(.44)"><g class="headg">${head(id, mode)}</g></g>
    </g></g>`;
}

/* ---------- app ---------- */
const form = document.getElementById('lock-form');
document.getElementById('lock-ava').innerHTML = head('chief', 'on');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const err = document.getElementById('err'); err.textContent = '';
  try { start(await unlock(document.getElementById('pw').value)); } catch (x) { console.error(x); err.textContent = 'Sai mật khẩu rồi. Thử lại nhé.'; }
});
function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
const NS = 'http://www.w3.org/2000/svg';
const nf = new Intl.NumberFormat('vi-VN');
const nf1 = new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pct = new Intl.NumberFormat('vi-VN', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });
function vnNow() { return new Date(Date.now() + (new Date().getTimezoneOffset() + 420) * 60000); }
function isoDate(d) { const p = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; }
const hhmm = () => { const n = vnNow(); return String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0'); };
function avatar(id, mode, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '-75 -80 150 150'); s.setAttribute('aria-hidden', 'true'); if (cls) s.setAttribute('class', cls); s.innerHTML = head(id, mode); return s; }

function start(D) {
  document.getElementById('lock').hidden = true;
  document.getElementById('app').hidden = false;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) document.getElementById('app').classList.add('anim');
  const now = vnNow(), today = isoDate(now);
  const dayN = Math.min(15, Math.max(1, Math.floor((new Date(today + 'T00:00:00') - new Date(D.meta.start + 'T00:00:00')) / 864e5) + 1));
  D._day = dayN;
  const colors = D.meta.colors;
  const BOT = Object.fromEntries(D.bots.map((b) => [b.bot, b]));
  const deptName = (id) => DEPTS[DEPT_OF[id]].name;

  // ---- status from real data
  const state = {};
  D.bots.forEach((b) => {
    const rows = D.plan.filter((r) => r.bot === b.bot);
    const todays = rows.filter((r) => r.date === today && r.trang_thai !== 'Xong');
    const waiting = todays.filter((r) => r.trang_thai === 'Chờ bạn');
    const recent = D.activity.filter((r) => r.bot === b.bot && (Date.now() - new Date(r.luc).getTime()) < 2 * 3600e3);
    const next = rows.filter((r) => r.date > today && r.trang_thai !== 'Xong').sort((x, y) => x.ngay - y.ngay)[0];
    let st = 'idle', label = 'Đang nghỉ', task = next ? `Tiếp theo, ngày ${next.ngay}: ${next.viec}` : 'Chưa có việc trong lịch.';
    if (todays.length && waiting.length === todays.length) { st = 'wait'; label = 'Chờ bạn'; task = waiting[0].viec; }
    else if (todays.length) { st = 'on'; label = 'Đang làm'; task = todays.find((r) => r.trang_thai !== 'Chờ bạn').viec; }
    else if (recent.length) { st = 'on'; label = 'Vừa xong'; task = recent[recent.length - 1].viec; }
    state[b.bot] = { st, label, task, rows };
  });

  // ---- hud
  document.getElementById('brand-ava').innerHTML = head('chief', 'on');
  document.getElementById('site-name').textContent = D.meta.site + ' · TicoSystem';
  document.getElementById('chip-day').textContent = dayN;
  const sorted = [...D.activity].sort((a, b) => String(b.luc).localeCompare(String(a.luc)));
  document.getElementById('chip-live').textContent = 'Cập nhật ' + (sorted[0] ? sorted[0].gio : '');
  const clock = document.getElementById('chip-clock');
  const tick = () => {
    const n = vnNow(); clock.textContent = hhmm() + ' giờ VN';
    const h = document.getElementById('clk-h'), m = document.getElementById('clk-m');
    if (h) h.setAttribute('transform', `rotate(${(n.getHours() % 12) * 30 + n.getMinutes() * .5})`);
    if (m) m.setAttribute('transform', `rotate(${n.getMinutes() * 6 + n.getSeconds() * .1})`);
  };
  tick(); setInterval(tick, 15000);

  // ---- roster
  const roster = document.getElementById('roster');
  D.bots.forEach((b) => {
    const s = state[b.bot];
    const btn = el('button', 'mate'); btn.type = 'button'; btn.dataset.bot = b.bot; btn.setAttribute('aria-pressed', 'false');
    const txt = el('span'); const small = el('small'); small.append(el('i', s.st === 'on' ? 'on' : s.st === 'wait' ? 'wait' : ''), document.createTextNode(s.label));
    txt.append(el('b', null, b.ma), small);
    btn.append(avatar(b.bot, s.st === 'idle' ? 'idle' : 'on'), txt);
    btn.addEventListener('click', () => { if (location.hash) location.hash = ''; select(b.bot, true); });
    roster.append(btn);
  });

  // ---- map
  const svg = document.getElementById('map');
  svg.innerHTML = drawMap(D);
  const actorsG = svg.querySelector('#actors'), fxG = svg.querySelector('#fx');
  const actors = {};
  D.bots.forEach((b) => {
    const s = state[b.bot];
    const g = document.createElementNS(NS, 'g'); g.setAttribute('data-bot', b.bot); g.setAttribute('class', 'actor sitting');
    g.innerHTML = spriteSVG(b.bot, s.st === 'idle' ? 'idle' : 'on');
    const st = document.createElementNS(NS, 'g'); st.setAttribute('class', 'status');
    st.innerHTML = `<g transform="translate(22 -78) scale(.5)">${bubble(s.st, 0, 0)}</g>`;
    g.append(st);
    const tag = document.createElementNS(NS, 'g');
    const tw = b.ma.length * 8 + 16;
    tag.innerHTML = `<rect x="${-tw / 2}" y="-118" width="${tw}" height="20" rx="10" ${T('#fffaf0', 2.5)}/><text x="0" y="-103.5" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="12" fill="${colors[b.bot]}">${esc(b.ma)}</text>`;
    g.append(tag);
    actorsG.append(g);
    const [x, y] = HOME[b.bot];
    actors[b.bot] = { id: b.bot, el: g, statusEl: st, x, y, path: [], dir: 1, busy: false, onArrive: null, room: DEPT_OF[b.bot], t: Math.random() * 10 };
  });
  const feet = (a, on) => { a.el.classList.toggle('sitting', !on); a.el.classList.toggle('walking', on); a.el.querySelector('.feet').style.display = on ? '' : 'none'; a.statusEl.style.display = on ? 'none' : ''; };
  Object.values(actors).forEach((a) => feet(a, false));

  // ---- camera
  const game = document.getElementById('game');
  const cam = { cx: MAP_W / 2, cy: MAP_H / 2, z: 1 }, camT = { ...cam };
  let follow = null;
  const view = () => { const vw = game.clientWidth || 800, vh = game.clientHeight || 500; const base = Math.min(vw / MAP_W, vh / MAP_H); return { vw, vh, base }; };
  const clampCam = (c) => {
    const { vw, vh, base } = view(); const sc = base * c.z, w = vw / sc, h = vh / sc;
    c.z = Math.max(1, Math.min(5, c.z));
    c.cx = w >= MAP_W ? MAP_W / 2 : Math.max(w / 2, Math.min(MAP_W - w / 2, c.cx));
    c.cy = h >= MAP_H ? MAP_H / 2 : Math.max(h / 2, Math.min(MAP_H - h / 2, c.cy));
  };
  const applyCam = () => { const { vw, vh, base } = view(); const sc = base * cam.z, w = vw / sc, h = vh / sc; svg.setAttribute('viewBox', `${(cam.cx - w / 2).toFixed(2)} ${(cam.cy - h / 2).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`); };
  const toMap = (px, py) => { const r = svg.getBoundingClientRect(); const { vw, vh, base } = view(); const sc = base * cam.z; return [cam.cx + (px - r.left - vw / 2) / sc, cam.cy + (py - r.top - vh / 2) / sc]; };
  const zoomAt = (factor, px, py) => {
    const [mx, my] = toMap(px, py); const z2 = Math.max(1, Math.min(5, camT.z * factor));
    const { vw, vh, base } = view(); const r = svg.getBoundingClientRect();
    camT.z = z2; camT.cx = mx - (px - r.left - vw / 2) / (base * z2); camT.cy = my - (py - r.top - vh / 2) / (base * z2); clampCam(camT);
  };
  const setFollow = (id) => {
    follow = id;
    document.getElementById('follow').hidden = !id;
    if (id) { document.getElementById('follow-name').textContent = 'Đang theo dõi ' + BOT[id].ma + ' · ' + SPECIES[id].label; camT.z = Math.max(camT.z, 2.4); }
    roster.querySelectorAll('.mate').forEach((m) => m.setAttribute('aria-pressed', String(m.dataset.bot === id)));
  };
  document.getElementById('unfollow').addEventListener('click', () => { select(null); });
  document.getElementById('zin').addEventListener('click', () => { const r = svg.getBoundingClientRect(); zoomAt(1.4, r.left + r.width / 2, r.top + r.height / 2); });
  document.getElementById('zout').addEventListener('click', () => { const r = svg.getBoundingClientRect(); zoomAt(1 / 1.4, r.left + r.width / 2, r.top + r.height / 2); });
  document.getElementById('zfit').addEventListener('click', () => { setFollow(null); camT.z = 1; camT.cx = MAP_W / 2; camT.cy = MAP_H / 2; });
  svg.addEventListener('wheel', (e) => { e.preventDefault(); zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY); }, { passive: false });
  const ptrs = new Map(); let moved = 0, pinch = null, downTarget = null;
  svg.addEventListener('pointerdown', (e) => {
    svg.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); moved = 0; downTarget = e.target;
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) }; }
  });
  svg.addEventListener('pointermove', (e) => {
    if (!ptrs.has(e.pointerId)) return;
    const prev = ptrs.get(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (ptrs.size === 2 && pinch) {
      const [a, b] = [...ptrs.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      zoomAt(d / pinch.d, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); Object.assign(cam, camT); pinch.d = d; moved += 10; return;
    }
    const dx = e.clientX - prev[0], dy = e.clientY - prev[1]; moved += Math.abs(dx) + Math.abs(dy);
    if (moved > 6) {
      svg.classList.add('dragging'); if (follow) setFollow(null);
      const { base } = view(); camT.cx -= dx / (base * camT.z); camT.cy -= dy / (base * camT.z); clampCam(camT); Object.assign(cam, camT);
    }
  });
  const up = (e) => {
    ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null; svg.classList.remove('dragging');
    if (moved <= 6 && ptrs.size === 0 && downTarget) {
      const b = downTarget.closest && downTarget.closest('[data-bot]');
      const r = downTarget.closest && downTarget.closest('[data-room]');
      if (b) select(b.getAttribute('data-bot'), true); else if (r) location.hash = 'phong-' + r.getAttribute('data-room');
    }
    downTarget = null;
  };
  svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
  new ResizeObserver(() => { clampCam(camT); clampCam(cam); applyCam(); }).observe(game);

  // ---- bubbles & feed
  const simFeed = [];
  const say = (id, text, ms = 2800) => {
    const a = actors[id]; const w = Math.min(260, text.length * 7.4 + 26);
    const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'say');
    g.innerHTML = `<g class="pop"><path d="M ${-w / 2},-162 Q ${-w / 2},-174 ${-w / 2 + 12},-174 L ${w / 2 - 12},-174 Q ${w / 2},-174 ${w / 2},-162 L ${w / 2},-138 Q ${w / 2},-126 ${w / 2 - 12},-126 L 8,-126 L -2,-114 L -4,-126 L ${-w / 2 + 12},-126 Q ${-w / 2},-126 ${-w / 2},-138 Z" ${T('#fffdf8', 3)}/><text x="0" y="-145" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-weight="600" font-size="13" fill="${INK}">${esc(text)}</text></g>`;
    g.dataset.for = id; fxG.append(g); a.bubble = g;
    setTimeout(() => { g.remove(); if (a.bubble === g) a.bubble = null; }, ms);
  };
  const logSim = (from, to, text) => { simFeed.unshift({ t: hhmm(), from, to, text }); if (simFeed.length > 30) simFeed.pop(); if (!selected) renderSide(); };

  // ---- routes
  const roomTop = (id) => !!ROOMS[DEPT_OF[id] || id].top;
  function exitPts(id) {
    if (id === 'chief') return [];
    const [x, y] = HOME[id]; return [[x + EXIT[id], y], [x + EXIT[id], 330]];
  }
  function route(fromId, toRoom, dest) {
    const a = actors[fromId]; const pts = [];
    const homeRoom = DEPT_OF[fromId];
    const atHome = Math.abs(a.x - HOME[fromId][0]) < 1 && Math.abs(a.y - HOME[fromId][1]) < 1;
    if (atHome) pts.push(...exitPts(fromId));
    const curRoom = atHome ? homeRoom : a.room;
    if (curRoom !== toRoom) {
      const A = doorOf(curRoom), B = doorOf(toRoom);
      pts.push([A.x, A.inY], [A.x, A.corrY], [B.x, B.corrY], [B.x, B.inY]);
    }
    pts.push(dest);
    return pts;
  }
  function goHome(id) {
    const a = actors[id]; const pts = [];
    const homeRoom = DEPT_OF[id];
    if (a.room !== homeRoom) { const A = doorOf(a.room), B = doorOf(homeRoom); pts.push([A.x, A.inY], [A.x, A.corrY], [B.x, B.corrY], [B.x, B.inY]); }
    if (id !== 'chief') { const [x, y] = HOME[id]; pts.push([x + EXIT[id], 330], [x + EXIT[id], y]); }
    pts.push(HOME[id]);
    return walk(id, pts, homeRoom);
  }
  function walk(id, pts, endRoom) {
    const a = actors[id]; a.path = pts.slice(); feet(a, true); a.endRoom = endRoom;
    return new Promise((res) => { a.onArrive = () => { a.room = endRoom; res(); }; });
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const visitPoint = (target, i) => target === 'chief' ? GUEST[i % 2] : [HOME[target][0] + (i % 2 ? 46 : -46), 336];

  // ---- scripted interactions (from the real plan + numbers)
  const g = D.gsc;
  const quick = D.queries.filter((q) => q.loai === 'Dịch vụ' && q.vi_tri <= 20).length;
  const EVENTS = [
    { from: 'scan', to: 'writer', say: 'Gửi bạn 20 từ khóa nè!', reply: 'Cảm ơn, mình đưa vào bài ngay' },
    { from: 'report', to: 'chief', say: `Báo cáo: ${nf.format(g.luot_hien_thi)} hiển thị, ${g.luot_nhap} nhấp`, reply: 'Theo dõi mỗi sáng nhé!' },
    { from: 'tech', to: 'chief', say: 'Sửa sitemap cần quyền vào web ạ', reply: 'Để mình xin quyền chủ web' },
    { from: 'writer', to: 'chief', say: 'Xong nháp 5 bài rồi ạ', reply: 'Tuyệt, chờ điền chỗ ⚠️ nhé' },
    { from: 'chief', to: 'tech', say: 'Ưu tiên sitemap và hreflang', reply: 'Rõ, sếp!' },
    { from: 'local', to: 'outreach', say: 'Ngày 3 mình lập Google Business', reply: 'Ngày 10 mình lo LinkedIn' },
    { from: 'scan', to: 'report', say: `${quick} từ khóa đang ở top 20`, reply: 'Mình theo dõi thứ hạng nhé' },
    { from: 'tech', to: 'writer', say: 'Nhớ thêm schema FAQ cho bài', reply: 'Ok, mình ghi chú lại' },
    { from: 'chief', to: 'local', say: 'Chuẩn bị hồ sơ Clutch nhé', reply: 'Dạ, ngày 8 xong ạ' },
    { from: 'outreach', to: 'cafe', say: 'Đi pha ly cà phê đã ☕' },
    { from: 'local', to: 'cafe', say: 'Nghỉ tay chút ☕' },
    { from: 'report', to: 'cafe', say: 'Cà phê rồi đọc số tiếp' },
  ];
  const cafeTaken = new Set();
  async function runEvent(ev) {
    const A = actors[ev.from]; A.busy = true;
    try {
      if (ev.to === 'cafe') {
        const seat = CAFE_SEATS.findIndex((_, i) => !cafeTaken.has(i)); if (seat < 0) return; cafeTaken.add(seat);
        await walk(ev.from, route(ev.from, 'cafe', CAFE_SEATS[seat]), 'cafe');
        feet(A, false); A.statusEl.style.display = 'none';
        say(ev.from, ev.say, 3200); logSim(ev.from, null, ev.say);
        await sleep(6500); cafeTaken.delete(seat);
      } else {
        const B = actors[ev.to]; B.busy = true;
        await walk(ev.from, route(ev.from, DEPT_OF[ev.to], visitPoint(ev.to, Math.random() * 2 | 0)), DEPT_OF[ev.to]);
        feet(A, false); A.statusEl.style.display = 'none';
        A.dir = B.x >= A.x ? 1 : -1;
        say(ev.from, ev.say); logSim(ev.from, ev.to, ev.say); await sleep(3000);
        say(ev.to, ev.reply); logSim(ev.to, ev.from, ev.reply); await sleep(3000);
        B.busy = false;
      }
      await goHome(ev.from);
      feet(A, false);
    } finally { A.busy = false; }
  }
  let evI = 0;
  const schedule = () => {
    const running = Object.values(actors).filter((a) => a.busy && a.path.length).length;
    if (running >= 2) return;
    for (let k = 0; k < EVENTS.length; k++) {
      const ev = EVENTS[(evI + k) % EVENTS.length];
      if (actors[ev.from].busy || (ev.to !== 'cafe' && actors[ev.to].busy)) continue;
      evI = (evI + k + 1) % EVENTS.length; runEvent(ev); return;
    }
  };
  if (!reduce) { setTimeout(schedule, 600); setTimeout(schedule, 2600); setInterval(schedule, 4200); }

  // ---- loop
  let last = performance.now(), sortT = 0;
  const frame = (t) => {
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    Object.values(actors).forEach((a) => {
      a.t += dt;
      if (a.path.length) {
        const [tx, ty] = a.path[0]; const dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy), step = 120 * dt;
        if (Math.abs(dx) > .5) a.dir = dx > 0 ? 1 : -1;
        if (d <= step) { a.x = tx; a.y = ty; a.path.shift(); if (!a.path.length && a.onArrive) { const f = a.onArrive; a.onArrive = null; f(); } }
        else { a.x += dx / d * step; a.y += dy / d * step; }
      }
      const bob = a.path.length ? Math.abs(Math.sin(a.t * 10)) * -3 : 0;
      a.el.setAttribute('transform', `translate(${a.x.toFixed(1)} ${(a.y + bob).toFixed(1)})`);
      a.el.firstChild.setAttribute('transform', `scale(${a.dir} 1)`);
      if (a.bubble) a.bubble.setAttribute('transform', `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)})`);
    });
    sortT += dt;
    if (sortT > .3) { sortT = 0; Object.values(actors).sort((p, q) => p.y - q.y).forEach((a) => actorsG.append(a.el)); }
    if (follow) { const a = actors[follow]; camT.cx = a.x; camT.cy = a.y - 50; clampCam(camT); }
    const k = Math.min(1, dt * 6); cam.cx += (camT.cx - cam.cx) * k; cam.cy += (camT.cy - cam.cy) * k; cam.z += (camT.z - cam.z) * k;
    applyCam();
    requestAnimationFrame(frame);
  };
  { const { vw, vh, base } = view(); if (vh > vw) { const zc = Math.max(vw / MAP_W, vh / MAP_H) / base; camT.z = cam.z = Math.min(5, zc * .92); camT.cx = cam.cx = 640; } }
  clampCam(camT); Object.assign(cam, camT); applyCam(); requestAnimationFrame(frame);

  // ---- side panel
  const side = document.getElementById('side');
  let selected = null;
  function feedList(items, empty) {
    const ul = el('ul', 'feed');
    if (!items.length) { const li = el('li', null, empty); li.style.display = 'block'; li.style.color = 'var(--ink-2)'; ul.append(li); }
    items.forEach((f) => {
      const li = el('li'); li.append(el('span', 't', f.t));
      const body = el('span'); const tg = el('span', 'tag', BOT[f.from].ma); tg.style.background = colors[f.from];
      body.append(tg); if (f.to) { body.append(document.createTextNode('→ ')); const t2 = el('span', 'tag', BOT[f.to].ma); t2.style.background = colors[f.to]; body.append(t2); }
      body.append(document.createTextNode(f.text)); li.append(body); ul.append(li);
    });
    return ul;
  }
  function realLog(rows) {
    const ul = el('ul', 'feed');
    rows.forEach((r) => { const li = el('li'); li.append(el('span', 't', r.gio.split(' ')[1] || r.gio)); const b = el('span'); const tg = el('span', 'tag', BOT[r.bot].ma); tg.style.background = colors[r.bot]; b.append(tg, document.createTextNode(r.viec), el('span', 'r', r.ket_qua)); li.append(b); ul.append(li); });
    return ul;
  }
  function renderSide() {
    side.replaceChildren();
    if (!selected) {
      const h = el('div', 'side-h'); h.append(el('h2', null, 'Đang diễn ra'), el('span', null, 'mô phỏng'));
      side.append(h, feedList(simFeed.slice(0, 8), 'Các bạn đang làm việc tại bàn…'));
      side.append(el('p', 'note', 'Cảnh đi lại và trò chuyện được dựng từ kế hoạch 15 ngày. Nhật ký dưới đây là việc đã làm thật.'));
      const h2 = el('div', 'side-h'); h2.append(el('h2', null, 'Nhật ký thật'), el('span', null, D.activity.length + ' việc'));
      side.append(h2, realLog(sorted));
      return;
    }
    const id = selected, b = BOT[id], s = state[id];
    const who = el('div', 'who'); const t = el('div'); t.append(el('b', null, b.ma + ' · ' + SPECIES[id].label), el('span', null, b.ten + ' · ' + deptName(id)));
    who.append(avatar(id, s.st === 'idle' ? 'idle' : 'on'), t);
    const pill = el('span', 'pill' + (s.st === 'on' ? ' on' : s.st === 'wait' ? ' wait' : '')); pill.append(el('i'), document.createTextNode(s.label));
    const now = el('div', 'box'); now.append(el('span', 'k', 'Việc đang làm'), document.createTextNode(s.task));
    const tasks = el('ul', 'list');
    s.rows.forEach((r) => { const li = el('li'); li.append(el('span', 'tag', 'N' + r.ngay)); li.firstChild.style.background = colors[id]; const sp = el('span', null, r.viec); sp.append(el('span', 'st' + (r.trang_thai === 'Chờ bạn' ? ' wait' : r.trang_thai === 'Xong' ? ' done' : ''), r.lich + ' · ' + r.trang_thai)); li.append(sp); tasks.append(li); });
    const btns = el('div', 'doors');
    const go = el('button', 'btn', 'Vào ' + deptName(id) + ' →'); go.type = 'button'; go.addEventListener('click', () => { location.hash = 'phong-' + DEPT_OF[id]; });
    const x = el('button', 'btn ghost', 'Bỏ chọn'); x.type = 'button'; x.addEventListener('click', () => select(null));
    btns.append(go, x);
    side.append(who, pill, now);
    if (s.rows.length) { const h = el('div', 'side-h'); h.append(el('h2', null, 'Lịch của ' + b.ma), el('span', null, s.rows.filter((r) => r.trang_thai === 'Xong').length + '/' + s.rows.length + ' xong')); side.append(h, tasks); }
    const mine = sorted.filter((r) => r.bot === id);
    if (mine.length) { const h = el('div', 'side-h'); h.append(el('h2', null, 'Đã làm')); side.append(h, realLog(mine)); }
    side.append(btns);
  }
  function select(id, followIt) {
    selected = id; setFollow(id && followIt ? id : null); renderSide();
  }
  renderSide();

  // ---- panels
  panels(D, state, dayN, now, today, colors, BOT);

  // ---- room page + router
  const roomView = document.getElementById('view-room'), mapView = document.getElementById('view-map');
  function showRoom(id) {
    if (!DEPTS[id]) { location.hash = ''; return; }
    const d = DEPTS[id];
    roomView.replaceChildren();
    const top = el('div', 'room-top card');
    const back = el('button', 'btn ghost', '← Bản đồ'); back.type = 'button'; back.addEventListener('click', () => { location.hash = ''; });
    const tt = el('div', 'grow'); tt.append(el('h2', null, d.name), el('span', null, d.members.length ? d.members.map((m) => BOT[m].ma + ' · ' + SPECIES[m].label).join('  ·  ') : (id === 'cafe' ? 'Nơi các bạn nghỉ tay' : 'Nơi cả đội họp và xem số liệu')));
    const doors = el('div', 'doors');
    Object.keys(DEPTS).filter((k) => k !== id).forEach((k) => { const b = el('button', 'btn ghost', DEPTS[k].name); b.type = 'button'; b.style.fontSize = '13px'; b.style.padding = '4px 10px'; b.addEventListener('click', () => { location.hash = 'phong-' + k; }); doors.append(b); });
    top.append(back, tt, doors);
    const vw = el('div', 'room-view card'); vw.innerHTML = roomFront(D, state, id);
    roomView.append(top, vw);
    const grid = el('div', 'room-grid');
    d.members.forEach((m) => {
      const s = state[m]; const c = el('div', 'member card');
      const who = el('div', 'who'); const t = el('div'); t.append(el('b', null, BOT[m].ma + ' · ' + SPECIES[m].label), el('span', null, BOT[m].ten));
      who.append(avatar(m, s.st === 'idle' ? 'idle' : 'on'), t);
      const pill = el('span', 'pill' + (s.st === 'on' ? ' on' : s.st === 'wait' ? ' wait' : '')); pill.append(el('i'), document.createTextNode(s.label));
      const box = el('div', 'box'); box.append(el('span', 'k', 'Việc đang làm'), document.createTextNode(s.task));
      const ul = el('ul', 'list'); s.rows.forEach((r) => { const li = el('li'); const tg = el('span', 'tag', 'N' + r.ngay); tg.style.background = colors[m]; const sp = el('span', null, r.viec); sp.append(el('span', 'st' + (r.trang_thai === 'Chờ bạn' ? ' wait' : r.trang_thai === 'Xong' ? ' done' : ''), r.lich + ' · ' + r.trang_thai + (r.ghi_chu ? ' · ' + r.ghi_chu : ''))); li.append(tg, sp); ul.append(li); });
      c.append(who, pill, box); if (s.rows.length) c.append(ul); else c.append(el('p', 'note', 'Chưa có việc riêng trong lịch 15 ngày.'));
      grid.append(c);
    });
    const contact = el('div', 'contact card');
    const ev = EVENTS.filter((e) => e.to !== 'cafe' && (d.members.includes(e.from) || d.members.includes(e.to)));
    const hh = el('div', 'side-h'); hh.append(el('h2', null, id === 'cafe' ? 'Ai hay ghé' : 'Liên lạc với phòng khác'), el('span', null, 'theo kế hoạch'));
    contact.append(hh);
    const ul = el('ul', 'list');
    const list = id === 'cafe' ? EVENTS.filter((e) => e.to === 'cafe') : id === 'meet' ? [] : ev;
    list.forEach((e) => { const li = el('li'); const tg = el('span', 'tag', BOT[e.from].ma); tg.style.background = colors[e.from]; const sp = el('span', null, (e.to !== 'cafe' ? '→ ' + BOT[e.to].ma + ' (' + deptName(e.to) + '): ' : '') + e.say); if (e.reply) sp.append(el('span', 'st', BOT[e.to].ma + ': ' + e.reply)); li.append(tg, sp); ul.append(li); });
    if (id === 'meet') { const li = el('li'); li.append(el('span', 'tag', 'GSC'), el('span', null, `${nf.format(g.luot_hien_thi)} hiển thị · ${g.luot_nhap} nhấp · vị trí TB ${nf1.format(g.vi_tri_tb)} (${g.ky})`)); li.firstChild.style.background = '#46557a'; ul.append(li); }
    contact.append(ul);
    const logs = sorted.filter((r) => d.members.includes(r.bot));
    if (logs.length) { const lc = el('div', 'contact card'); const h3 = el('div', 'side-h'); h3.append(el('h2', null, 'Việc đã làm thật'), el('span', null, logs.length + ' việc')); lc.append(h3, realLog(logs)); grid.append(lc); }
    grid.prepend(contact);
    roomView.append(grid);
    mapView.hidden = true; roomView.hidden = false; tick(); window.scrollTo(0, 0);
  }
  function routeView() {
    const h = location.hash.slice(1);
    if (h.startsWith('phong-')) showRoom(h.slice(6));
    else { roomView.hidden = true; mapView.hidden = false; clampCam(camT); applyCam(); }
  }
  window.addEventListener('hashchange', routeView); routeView();
  document.getElementById('foot-upd').textContent = 'Bản dựng ' + D.meta.built;
}

/* ---------- room page drawing (front view) ---------- */
function roomFront(D, state, id) {
  const bots = Object.fromEntries(D.bots.map((b) => [b.bot, b]));
  const W = 960, H = 480, r = { x: 0, y: 0, w: W, h: H }, d = DEPTS[id], floor = H - 14;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(d.name)}" xmlns="http://www.w3.org/2000/svg">` + roomShell(r, d);
  let front = '';
  if (id === 'boss') {
    s += windowBox(70, 90, 170, 150) + clockFace(W - 110, 130, 40, true) + bookcase(W - 150, floor, 100, 210) + plant(60, floor, .9);
    s += `<ellipse cx="${W / 2}" cy="${floor - 6}" rx="270" ry="22" ${S('#b8664f')}/><ellipse cx="${W / 2}" cy="${floor - 6}" rx="240" ry="13" fill="none" stroke="#f0d3a8" stroke-width="3" stroke-dasharray="10 8"/>`;
    const dy = floor - 86 * 1.12, cx = W / 2;
    front += `<g transform="translate(${cx} ${dy}) scale(1.12) translate(${-cx} ${-dy})">${station(bots.chief, cx, dy, state.chief, true)}</g>`;
  } else if (id === 'meet') {
    const bx = 80, bw = 520, by = 70, bh = 190, g = D.gsc, fmt = new Intl.NumberFormat('vi-VN');
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" ${S('#fbfaf5')}/><rect x="${bx + 10}" y="${by + bh - 4}" width="${bw - 20}" height="10" rx="3" ${S('#c9cec9', 'stroke-width="3.5"')}/>`;
    s += `<text x="${bx + 20}" y="${by + 34}" font-family="Baloo 2, sans-serif" font-weight="800" font-size="22" fill="#46557a">Search Console · 90 ngày</text>`;
    s += `<text x="${bx + 20}" y="${by + 62}" font-family="Baloo 2, sans-serif" font-weight="700" font-size="17" fill="${INK}">${fmt.format(g.luot_hien_thi)} hiển thị · ${fmt.format(g.luot_nhap)} nhấp · hạng ${String(g.vi_tri_tb).replace('.', ',')}</text>`;
    const pts = [0.15, 0.3, 0.22, 0.45, 0.38, 0.6, 0.52, 0.72], cw = bw - 160, ch = bh - 104;
    s += `<path d="M ${bx + 22},${by + 80} L ${bx + 22},${by + 80 + ch} L ${bx + 22 + cw},${by + 80 + ch}" ${L(3, 'stroke="#6e5b4c"')}/>`;
    s += `<path d="${pts.map((v, i) => `${i ? 'L' : 'M'} ${(bx + 30 + i * (cw - 14) / (pts.length - 1)).toFixed(1)},${(by + 76 + ch - v * ch).toFixed(1)}`).join(' ')}" fill="none" stroke="#b8483a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<g transform="translate(${bx + bw - 112} ${by + 80}) rotate(4)"><rect x="0" y="0" width="90" height="72" ${S('#f3d272', 'stroke-width="3"')}/><text x="45" y="30" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="15" fill="${INK}">Ngày</text><text x="45" y="57" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="23" fill="${INK}">${D._day}/15</text></g>`;
    s += meetingTable(W / 2 - 40, floor) + plant(W - 70, floor, .85) + windowBox(W - 250, 90, 150, 140);
  } else if (id === 'cafe') {
    s += cafeCorner(r, floor) + windowBox(W - 230, 84, 150, 130);
  } else {
    const m = d.members; const xs = m.length === 2 ? [W * .3, W * .7] : [W * .4];
    if (id === 'data') s += poster(W / 2 - 50, 80, 100, 78, 'bars') + windowBox(60, 90, 120, 110) + plant(W - 60, floor, .85);
    if (id === 'sales') s += poster(W / 2 - 55, 80, 110, 76, 'map') + plant(60, floor, .85) + windowBox(W - 180, 90, 120, 110);
    if (id === 'tech') s += poster(W - 300, 70, 100, 76, 'blue') + rackBox(W - 170, floor) + plant(60, floor, .85);
    if (id === 'content') s += poster(W - 330, 66, 110, 86, 'cork') + bookcase(W - 180, floor, 100, 220) + plant(60, floor, .85);
    m.forEach((mid, i) => { front += station(bots[mid], xs[i], floor - 74, state[mid], false); });
  }
  s += signBoard(W / 2, 16, d.name) + front + `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="4" ${L(5)}/></svg>`;
  return s;
}

/* ---------- report panels ---------- */
function panels(D, state, dayN, now, today, colors, BOT) {
  const g = D.gsc;
  document.getElementById('gsc-range').textContent = g.ky;
  const kp = [['Lượt nhấp', nf.format(g.luot_nhap), '90 ngày'], ['Lượt hiển thị', nf.format(g.luot_hien_thi), '90 ngày'], ['CTR', pct.format(g.ctr), 'trung bình'],
    ['Vị trí TB', nf1.format(g.vi_tri_tb), 'càng nhỏ càng tốt'], ['Đã lập chỉ mục', nf.format(g.trang_da_index), 'trang'], ['Chưa lập chỉ mục', nf.format(g.trang_chua_index), 'trang']];
  document.getElementById('kpis').replaceChildren(...kp.map(([k, v, s]) => { const d = el('div', 'kpi'); d.append(el('span', 'k', k), el('span', 'v', v), el('span', 's', s)); return d; }));
  const box = document.getElementById('qmap');
  const W = 520, H = 200, m = { l: 34, r: 12, t: 12, b: 30 };
  const x = (v) => m.l + (Math.min(v, 105) / 105) * (W - m.l - m.r);
  const y = (v) => H - m.b - (Math.log10(Math.max(v, 1)) / 2) * (H - m.t - m.b);
  const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Vị trí và lượt hiển thị của từng truy vấn');
  const add = (tag, attrs, text) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; svg.append(n); return n; };
  add('rect', { x: x(0), y: m.t, width: x(20) - x(0), height: H - m.t - m.b, fill: '#e3efd8', stroke: INK, 'stroke-width': 2, rx: 6 });
  add('text', { x: x(0) + 8, y: m.t + 16, fill: '#4f8a3c', 'font-size': 12, 'font-weight': 800, 'font-family': 'Baloo 2, sans-serif' }, 'Top 20');
  [1, 10, 100].forEach((v) => { add('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), stroke: '#d9d2c4', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }); add('text', { x: m.l - 6, y: y(v) + 4, 'text-anchor': 'end', fill: '#a3958a', 'font-size': 11, 'font-family': 'Be Vietnam Pro, sans-serif' }, v); });
  [1, 20, 50].forEach((v) => add('text', { x: x(v), y: H - 10, 'text-anchor': 'middle', fill: '#a3958a', 'font-size': 11, 'font-family': 'Be Vietnam Pro, sans-serif' }, v));
  add('text', { x: W - m.r, y: H - 10, 'text-anchor': 'end', fill: '#6e5b4c', 'font-size': 11, 'font-weight': 600, 'font-family': 'Be Vietnam Pro, sans-serif' }, 'vị trí trên Google →');
  const tip = el('div', 'tip'); tip.hidden = true;
  const cmap = { 'Dịch vụ': '#4f7393', 'Thương hiệu': '#d9a441', 'Dự án': '#a8566a', 'Không liên quan': '#cfc6b8' };
  D.queries.forEach((q) => {
    const c = add('circle', { cx: x(q.vi_tri), cy: y(q.luot_hien_thi), r: q.loai === 'Dịch vụ' && q.vi_tri <= 20 ? 6 : 4.5, fill: cmap[q.loai] || '#cfc6b8', stroke: INK, 'stroke-width': 1.8 });
    c.addEventListener('mouseenter', (ev) => { tip.replaceChildren(el('div', 's', q.loai), el('div', null, q.truy_van), el('div', 's', `vị trí ${nf1.format(q.vi_tri)} · ${q.luot_hien_thi} hiển thị`)); tip.hidden = false; const r = box.getBoundingClientRect(); tip.style.left = Math.min(ev.clientX - r.left + 10, r.width - 200) + 'px'; tip.style.top = Math.max(ev.clientY - r.top - 58, 0) + 'px'; });
    c.addEventListener('mouseleave', () => { tip.hidden = true; });
  });
  box.append(svg, tip);
  const tl = document.getElementById('timeline');
  for (let dd = 1; dd <= 15; dd++) {
    const rows = D.plan.filter((r) => r.ngay === dd);
    const col = el('div', 'day' + (dd === dayN ? ' today' : '')); col.title = rows.map((r) => `${r.trang_thai}: ${r.viec}`).join('\n');
    col.append(el('span', 'd', rows[0] ? rows[0].lich.split('/')[0] : dd));
    (rows.length ? rows : [null]).forEach((r) => col.append(el('span', 'blk' + (!r ? '' : r.trang_thai === 'Xong' ? ' done' : r.trang_thai === 'Chờ bạn' ? ' wait' : r.trang_thai === 'Đang làm' ? ' doing' : ''))));
    tl.append(col);
  }
  const done = D.plan.filter((r) => r.trang_thai === 'Xong').length;
  document.getElementById('tl-progress').textContent = `${done}/${D.plan.length} việc xong`;
  document.getElementById('today-date').textContent = `${now.getDate()}/${now.getMonth() + 1}`;
  const tlist = document.getElementById('today');
  const todayRows = D.plan.filter((r) => r.date === today);
  if (!todayRows.length) tlist.append(el('li', null, 'Hôm nay không có việc trong lịch.'));
  todayRows.forEach((r) => { const li = el('li'); const t = el('span', 'tag', BOT[r.bot].ma); t.style.background = colors[r.bot]; const b = el('span', null, r.viec); b.append(el('span', 'st' + (r.trang_thai === 'Chờ bạn' ? ' wait' : r.trang_thai === 'Xong' ? ' done' : ''), r.trang_thai + (r.ghi_chu ? ' · ' + r.ghi_chu : ''))); li.append(t, b); tlist.append(li); });
  const tg = document.getElementById('targets');
  D.targets.forEach((t) => { const row = el('div', 'tg'); const bar = el('div', 'bar'); const bi = el('i'); bi.style.width = Math.min(100, t.muc_tieu ? t.moc / t.muc_tieu * 100 : 0) + '%'; bar.append(bi); row.append(el('span', null, t.chi_so), el('span', 'chip', `${t.moc} → ${t.muc_tieu}`), bar); tg.append(row); });
  const lv = ['Cao', 'Trung bình', 'Thấp'], lc = ['#b8483a', '#c98a17', '#6e5b4c'];
  const open = D.audit.filter((a) => a.trang_thai !== 'Xong');
  document.getElementById('audit-open').textContent = `${open.length}/${D.audit.length} chưa sửa`;
  document.getElementById('issues').replaceChildren(...lv.map((l, i) => { const d = el('div', 'issue'); const v = el('span', 'v', open.filter((a) => a.muc_do === l).length); v.style.color = lc[i]; d.append(v, el('span', 'k', 'Mức ' + l.toLowerCase())); return d; }));
}
