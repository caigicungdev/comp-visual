/* ======================= drawing kit ======================= */
const INK = '#3b2a20';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const SPECIES = {
  chief:    { animal: 'monkey',  fur: '#9b6542', skin: '#f6dcbc', paw: '#f0cfa9', top: '#34425f', label: 'Khỉ', name: 'Tyler Co' },
  scan:     { animal: 'owl',     fur: '#8c7556', skin: '#f1e3c6', paw: '#8c7556', top: '#d1a23d', label: 'Cú', name: 'Cú Minh' },
  tech:     { animal: 'chicken', fur: '#fbf3e4', skin: '#fbf3e4', paw: '#f1dfbf', top: '#6f8a57', label: 'Gà', name: 'Nick Quach' },
  writer:   { animal: 'rabbit',  fur: '#f5f0e6', skin: '#f5f0e6', paw: '#f5f0e6', top: '#7c98b3', label: 'Thỏ', name: 'Thỏ nhinhanh' },
  local:    { animal: 'panda',   fur: '#fbfaf6', skin: '#fbfaf6', paw: '#2f2a28', top: '#2f2a28', label: 'Gấu trúc', name: 'Bobb' },
  outreach: { animal: 'fox',     fur: '#d27a3c', skin: '#f8eddc', paw: '#5a3a28', top: '#b4523a', label: 'Cáo', name: 'Cáo ML' },
  report:   { animal: 'penguin', fur: '#36394a', skin: '#fbfaf6', paw: '#36394a', top: '#36394a', label: 'Cánh cụt', name: 'Cụt Tín' },
};
const DARK_PAW = ['#2f2a28', '#36394a', '#4c4a50', '#5a3a28'];
const S = (fill, extra = '') => `fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" ${extra}`;
const N = (fill, extra = '') => `fill="${fill}" stroke="none" ${extra}`;
const L = (w = 4, extra = '') => `fill="none" stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${extra}`;

function eyes(mode, dx = 16, y = 2, white = false) {
  if (mode === 'sleep') return `<path d="M ${-dx - 7},${y} Q ${-dx},${y + 6} ${-dx + 7},${y}" ${L(3.5)}/><path d="M ${dx - 7},${y} Q ${dx},${y + 6} ${dx + 7},${y}" ${L(3.5)}/>`;
  const one = (x) => (white ? `<circle cx="${x}" cy="${y}" r="7.5" ${S('#fff', 'stroke-width="3"')}/>` : '') +
    `<ellipse cx="${x}" cy="${y}" rx="5.2" ry="6.4" ${N(INK)}/><circle cx="${x + 1.6}" cy="${y - 2.4}" r="1.9" ${N('#fff')}/>`;
  return `<g class="eyes">${one(-dx)}${one(dx)}</g>`;
}
const blush = (dx = 28, y = 15) => `<ellipse cx="${-dx}" cy="${y}" rx="7.5" ry="4.6" ${N('#ee9f88', 'opacity=".8"')}/><ellipse cx="${dx}" cy="${y}" rx="7.5" ry="4.6" ${N('#ee9f88', 'opacity=".8"')}/>`;
const mouthOpen = (y = 13) => `<path d="M -6.5,${y} Q 0,${y + 12} 6.5,${y} Z" ${S('#d96f5e', 'stroke-width="3"')}/>`;
const mouthW = (y = 14) => `<path d="M -6,${y} Q -3,${y + 4.5} 0,${y} Q 3,${y + 4.5} 6,${y}" ${L(3)}/>`;

function head(kind, mode) {
  const sp = SPECIES[kind], m = mode === 'idle' ? 'sleep' : 'open';
  switch (sp.animal) {
    case 'monkey': return `
      <circle cx="-50" cy="4" r="17" ${S(sp.fur)}/><circle cx="-50" cy="4" r="8.5" ${N('#e6ae86')}/>
      <circle cx="50" cy="4" r="17" ${S(sp.fur)}/><circle cx="50" cy="4" r="8.5" ${N('#e6ae86')}/>
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      <path d="M 0,-14 C 8,-31 37,-30 38,-5 C 40,23 22,39 0,39 C -22,39 -40,23 -38,-5 C -37,-30 -8,-31 0,-14 Z" ${S(sp.skin, 'stroke-width="3.5"')}/>
      <path d="M -5,-49 Q 1,-60 9,-50" ${L(3.5)}/>
      ${eyes(m, 15, 4)}${blush(27, 17)}${mode === 'idle' ? mouthW(18) : mouthOpen(15)}`;
    case 'owl': return `
      <path d="M -40,-28 L -47,-63 L -16,-44 Z" ${S(sp.fur)}/><path d="M 40,-28 L 47,-63 L 16,-44 Z" ${S(sp.fur)}/>
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      <path d="M -30,-30 Q -20,-38 -10,-30 M 10,-30 Q 20,-38 30,-30" ${L(3, 'opacity=".55"')}/>
      <circle cx="-18" cy="2" r="20" ${N(sp.skin)}/><circle cx="18" cy="2" r="20" ${N(sp.skin)}/>
      ${eyes(m, 18, 2)}
      <circle cx="-18" cy="2" r="19" ${L(3.5)}/><circle cx="18" cy="2" r="19" ${L(3.5)}/><path d="M -1,0 Q 0,-4 1,0" ${L(3.5)}/>
      <path d="M -6,16 L 0,27 L 6,16 Q 0,12 -6,16 Z" ${S('#e2a23b', 'stroke-width="3"')}/>
      ${blush(36, 24)}`;
    case 'chicken': return `
      <path d="M -20,-40 Q -26,-64 -10,-60 Q -6,-78 6,-66 Q 16,-78 21,-58 Q 31,-58 24,-38 Z" ${S('#c9543c')}/>
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      <path d="M -26,-26 Q -18,-33 -10,-27 M 10,-27 Q 18,-33 26,-26" ${L(3, 'opacity=".35"')}/>
      ${eyes(m, 17, 0)}${blush(30, 15)}
      <path d="M -5,19 Q -9,35 0,36 Q 9,35 5,19 Z" ${S('#c9543c', 'stroke-width="3"')}/>
      <path d="M -11,8 Q 0,3 11,8 L 0,22 Z" ${S('#e2a23b', 'stroke-width="3"')}/>
      <path d="M -54,4 C -56,-72 56,-72 54,4" ${L(7)}/><path d="M -54,4 C -56,-72 56,-72 54,4" fill="none" stroke="#4f7393" stroke-width="3"/>
      <rect x="-62" y="-8" width="15" height="25" rx="6" ${S('#4f7393', 'stroke-width="3.5"')}/><rect x="47" y="-8" width="15" height="25" rx="6" ${S('#4f7393', 'stroke-width="3.5"')}/>
      <path d="M -54,15 Q -46,36 -20,34" ${L(3.5)}/><circle cx="-18" cy="34" r="4" ${S(INK, 'stroke-width="2"')}/>`;
    case 'raccoon': return `
      <g transform="rotate(-24 -33 -38)"><ellipse cx="-33" cy="-38" rx="14" ry="17" ${S(sp.fur)}/><ellipse cx="-33" cy="-36" rx="7" ry="9" ${N('#5a5960')}/></g>
      <g transform="rotate(24 33 -38)"><ellipse cx="33" cy="-38" rx="14" ry="17" ${S(sp.fur)}/><ellipse cx="33" cy="-36" rx="7" ry="9" ${N('#5a5960')}/></g>
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      <path d="M -8,-48 L 0,-30 L 8,-48" ${N('#7c7e82')}/>
      <path d="M -30,16 C -30,2 -14,6 0,10 C 14,6 30,2 30,16 C 30,34 14,42 0,42 C -14,42 -30,34 -30,16 Z" ${S(sp.skin, 'stroke-width="3.5"')}/>
      <path d="M -44,2 C -38,-16 -10,-15 0,-5 C 10,-15 38,-16 44,2 C 36,15 10,13 0,7 C -10,13 -36,15 -44,2 Z" ${S('#4c4a50', 'stroke-width="3.5"')}/>
      ${eyes(m, 17, 1, true)}
      <ellipse cx="0" cy="15" rx="5.5" ry="4" ${N(INK)}/>${mode === 'idle' ? mouthW(22) : mouthOpen(21)}
      <path d="M -54,4 C -56,-72 56,-72 54,4" ${L(7)}/><path d="M -54,4 C -56,-72 56,-72 54,4" fill="none" stroke="#c9543c" stroke-width="3"/>
      <rect x="-62" y="-8" width="15" height="25" rx="6" ${S('#c9543c', 'stroke-width="3.5"')}/><rect x="47" y="-8" width="15" height="25" rx="6" ${S('#c9543c', 'stroke-width="3.5"')}/>
      <path d="M -54,15 Q -48,34 -22,32" ${L(3.5)}/><circle cx="-20" cy="32" r="4" ${S(INK, 'stroke-width="2"')}/>`;
    case 'rabbit': return `
      <g transform="rotate(-9 -20 -62)"><ellipse cx="-20" cy="-66" rx="13" ry="33" ${S(sp.fur)}/><ellipse cx="-20" cy="-62" rx="6" ry="22" ${N('#f2b8ae')}/></g>
      <g transform="rotate(12 22 -62)"><ellipse cx="22" cy="-66" rx="13" ry="33" ${S(sp.fur)}/><ellipse cx="22" cy="-62" rx="6" ry="22" ${N('#f2b8ae')}/></g>
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      ${eyes(m, 17, 3)}${blush(28, 17)}
      <path d="M -4.5,10 L 4.5,10 L 0,15 Z" ${S('#e48f86', 'stroke-width="2.5"')}/>${mouthW(16)}
      <g transform="translate(40 -40) rotate(40)"><rect x="-4.5" y="-24" width="9" height="40" ${S('#e2b13f', 'stroke-width="3"')}/><rect x="-4.5" y="-30" width="9" height="7" rx="2" ${S('#e48f86', 'stroke-width="3"')}/><path d="M -4.5,16 L 0,26 L 4.5,16 Z" ${S('#f3dcb6', 'stroke-width="3"')}/></g>`;
    case 'panda': return `
      <circle cx="-37" cy="-36" r="15" ${S('#2f2a28')}/><circle cx="37" cy="-36" r="15" ${S('#2f2a28')}/>
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      <ellipse cx="-18" cy="3" rx="12" ry="15" transform="rotate(24 -18 3)" ${N('#2f2a28')}/><ellipse cx="18" cy="3" rx="12" ry="15" transform="rotate(-24 18 3)" ${N('#2f2a28')}/>
      ${m === 'sleep' ? `<path d="M -24,4 Q -18,9 -12,4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M 12,4 Q 18,9 24,4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`
        : `<g class="eyes"><circle cx="-17" cy="2" r="5" ${N('#fff')}/><circle cx="-16" cy="2.5" r="2.6" ${N(INK)}/><circle cx="17" cy="2" r="5" ${N('#fff')}/><circle cx="18" cy="2.5" r="2.6" ${N(INK)}/></g>`}
      <ellipse cx="0" cy="17" rx="5.5" ry="4" ${N(INK)}/>${mode === 'idle' ? mouthW(23) : mouthOpen(22)}${blush(32, 20)}`;
    case 'fox': return `
      <path d="M -45,-18 L -42,-70 L -10,-45 Z" ${S(sp.fur)}/><path d="M -38,-30 L -37,-58 L -20,-44 Z" ${N('#f3dfc6')}/>
      <path d="M 45,-18 L 42,-70 L 10,-45 Z" ${S(sp.fur)}/><path d="M 38,-30 L 37,-58 L 20,-44 Z" ${N('#f3dfc6')}/>
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      <path d="M -49,6 C -32,2 -14,10 0,20 C 14,10 32,2 49,6 C 44,34 22,48 0,48 C -22,48 -44,34 -49,6 Z" ${S(sp.skin, 'stroke-width="3.5"')}/>
      ${eyes(m, 18, 0)}<ellipse cx="0" cy="20" rx="5.5" ry="4" ${N(INK)}/>${mode === 'idle' ? mouthW(27) : mouthOpen(26)}${blush(30, 17)}`;
    case 'penguin': return `
      <circle cx="0" cy="0" r="50" ${S(sp.fur)}/>
      <path d="M 0,-20 C 10,-36 40,-31 40,-4 C 41,25 21,41 0,41 C -21,41 -41,25 -40,-4 C -40,-31 -10,-36 0,-20 Z" ${S(sp.skin, 'stroke-width="3.5"')}/>
      ${eyes(m, 16, 2)}<path d="M -8,13 L 8,13 L 0,22 Z" ${S('#e2a23b', 'stroke-width="3"')}/>${blush(28, 18)}`;
  }
  return '';
}

function torso(kind) {
  const sp = SPECIES[kind];
  const shape = 'M -47,4 L -42,-56 Q -40,-74 -22,-76 L 22,-76 Q 40,-74 42,-56 L 47,4 Z';
  switch (sp.animal) {
    case 'monkey': return `
      <path d="${shape}" ${S(sp.top)}/>
      <path d="M -16,-76 L 0,-40 L 16,-76 Z" ${S('#fbfaf6', 'stroke-width="3.5"')}/>
      <path d="M -6,-72 L 6,-72 L 4,-64 L -4,-64 Z" ${S('#b8483a', 'stroke-width="3"')}/><path d="M -4,-64 L -7,-34 L 0,-26 L 7,-34 L 4,-64 Z" ${S('#b8483a', 'stroke-width="3"')}/>
      <path d="M -22,-76 L -9,-48 L -17,-44 L -8,-28" ${L(3.5)}/><path d="M 22,-76 L 9,-48 L 17,-44 L 8,-28" ${L(3.5)}/>
      <rect x="25" y="-63" width="11" height="6" rx="1.5" ${S('#fbfaf6', 'stroke-width="2.5"')}/>
      <circle cx="0" cy="-16" r="3" ${S('#d9b25a', 'stroke-width="2"')}/>`;
    case 'owl': return `<path d="${shape}" ${S(sp.top)}/><path d="M -16,-76 Q 0,-58 16,-76" ${L(3.5)}/><path d="M -30,-46 L -30,-20 M 30,-46 L 30,-20" ${L(3, 'opacity=".5"')}/>`;
    case 'chicken': return `<path d="${shape}" ${S(sp.fur)}/><path d="M -30,-50 L 30,-50 L 27,0 L -27,0 Z" ${S(sp.top, 'stroke-width="3.5"')}/><path d="M -30,-50 L -22,-76 M 30,-50 L 22,-76" ${L(4)}/><rect x="-12" y="-34" width="24" height="16" rx="3" ${S('#86a26c', 'stroke-width="3"')}/>`;
    case 'raccoon': return `<path d="${shape}" ${S(sp.fur)}/><path d="M -28,-48 L 28,-48 L 26,0 L -26,0 Z" ${S(sp.top, 'stroke-width="3.5"')}/><path d="M -28,-48 L -22,-76 M 28,-48 L 22,-76" ${L(4)}/>`;
    case 'rabbit': return `<path d="${shape}" ${S(sp.top)}/><path d="M -20,-76 Q 0,-62 20,-76" ${S('#fbfaf6', 'stroke-width="3.5"')}/><path d="M -36,-40 L 36,-40 M -38,-26 L 38,-26" ${L(2.5, 'opacity=".35"')}/>`;
    case 'panda': return `<path d="${shape}" ${S('#fbfaf6')}/><path d="M -47,4 L -42,-56 Q -40,-74 -22,-76 L -10,-76 Q -30,-40 -30,4 Z" ${S('#2f2a28', 'stroke-width="3.5"')}/><path d="M 47,4 L 42,-56 Q 40,-74 22,-76 L 10,-76 Q 30,-40 30,4 Z" ${S('#2f2a28', 'stroke-width="3.5"')}/><path d="M -10,-74 L 0,-68 L 10,-74 L 10,-62 L 0,-68 L -10,-62 Z" ${S('#c9543c', 'stroke-width="3"')}/>`;
    case 'fox': return `<path d="${shape}" ${S(sp.fur)}/><path d="M -18,-76 Q 0,-40 18,-76" ${S(sp.skin, 'stroke-width="3.5"')}/><path d="M -30,-78 Q 0,-64 30,-78 L 28,-66 Q 0,-52 -28,-66 Z" ${S(sp.top, 'stroke-width="3.5"')}/><path d="M 14,-62 L 22,-30 L 32,-34 L 24,-62" ${S(sp.top, 'stroke-width="3.5"')}/>`;
    case 'penguin': return `<path d="${shape}" ${S(sp.fur)}/><path d="M -28,4 Q -32,-60 0,-70 Q 32,-60 28,4 Z" ${S('#fbfaf6', 'stroke-width="3.5"')}/><path d="M -12,-72 L 0,-66 L 12,-72 L 12,-58 L 0,-66 L -12,-58 Z" ${S('#c9543c', 'stroke-width="3"')}/><circle cx="0" cy="-66" r="2.5" ${N(INK)}/>`;
  }
  return '';
}

function paws(kind, w = 0) {
  const sp = SPECIES[kind];
  const toe = DARK_PAW.includes(sp.paw) ? 'stroke="#fbfaf6"' : '';
  const one = (x, cls) => `<g class="${cls}"><path d="M ${x - 13},-2 Q ${x - 14},-18 ${x},-18 Q ${x + 14},-18 ${x + 13},-2 Z" ${S(sp.paw, 'stroke-width="3.5"')}/><path d="M ${x - 4},-11 L ${x - 4},-6 M ${x + 4},-11 L ${x + 4},-6" ${L(2.2, toe)}/></g>`;
  return one(-36 - w, 'pl') + one(36 + w, 'pr');
}

function bubble(state, x, y) {
  if (state === 'on') return `<g transform="translate(${x} ${y})"><path d="M -24,-16 Q -24,-28 -12,-28 L 12,-28 Q 24,-28 24,-16 L 24,-4 Q 24,8 12,8 L -6,8 L -14,18 L -12,8 Q -24,8 -24,-4 Z" ${S('#fffdf8', 'stroke-width="3"')}/><g class="dots"><circle cx="-10" cy="-10" r="3.5" ${N(INK)}/><circle cx="0" cy="-10" r="3.5" ${N(INK)}/><circle cx="10" cy="-10" r="3.5" ${N(INK)}/></g></g>`;
  if (state === 'wait') return `<g transform="translate(${x} ${y})"><g class="bang"><circle cx="0" cy="-10" r="17" ${S('#f0c45a', 'stroke-width="3"')}/><path d="M 0,-20 L 0,-8" ${L(4.5)}/><circle cx="0" cy="-1" r="2.6" ${N(INK)}/></g></g>`;
  return `<g transform="translate(${x} ${y})" class="zz"><text x="0" y="0" font-family="Baloo 2, sans-serif" font-weight="800" font-size="20" fill="${INK}">z</text><text x="10" y="-6" font-family="Baloo 2, sans-serif" font-weight="800" font-size="15" fill="${INK}">z</text><text x="18" y="-12" font-family="Baloo 2, sans-serif" font-weight="800" font-size="11" fill="${INK}">z</text></g>`;
}
function mug(x, y, color) {
  return `<g transform="translate(${x} ${y})"><g class="steam"><path d="M -4,-26 Q -8,-32 -4,-38 Q 0,-44 -4,-50" ${L(2.5, 'opacity=".55"')}/><path d="M 5,-26 Q 1,-32 5,-38" ${L(2.5, 'opacity=".55"')}/></g><path d="M 10,-17 Q 20,-17 20,-10 Q 20,-3 10,-4" ${L(3.5)}/><path d="M -11,-22 L 11,-22 L 9,0 L -9,0 Z" ${S(color, 'stroke-width="3.5"')}/></g>`;
}
function laptop(x, color) {
  return `<g transform="translate(${x} 0)"><path d="M -36,-4 L 36,-4 L 40,2 L -40,2 Z" ${S('#c8ccc8', 'stroke-width="3.5"')}/><rect x="-32" y="-52" width="64" height="47" rx="5" ${S('#dfe2dd', 'stroke-width="3.5"')}/><circle cx="0" cy="-29" r="6" ${S(color, 'stroke-width="2.5"')}/></g>`;
}
function prop(kind, x) {
  switch (SPECIES[kind].animal) {
    case 'owl': return `<g transform="translate(${x} -8) rotate(-25)"><rect x="-3" y="-2" width="6" height="22" rx="2" ${S('#8c5a34', 'stroke-width="3"')}/><circle cx="0" cy="-14" r="13" ${S('#e8f1f2', 'stroke-width="3.5"')}/><path d="M -5,-19 Q -2,-22 2,-21" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>`;
    case 'chicken':
    case 'raccoon': return `<g transform="translate(${x} -2)"><rect x="-22" y="-20" width="44" height="20" rx="3" ${S('#b8483a', 'stroke-width="3.5"')}/><path d="M -10,-20 L -10,-28 L 10,-28 L 10,-20" ${L(3.5)}/><path d="M -22,-11 L 22,-11" ${L(3)}/></g>`;
    case 'rabbit': return `<g transform="translate(${x} -2) rotate(-6)"><rect x="-20" y="-8" width="40" height="8" rx="2" ${S('#fbfaf6', 'stroke-width="3"')}/><rect x="-20" y="-15" width="40" height="7" rx="2" ${S('#7c98b3', 'stroke-width="3"')}/></g>`;
    case 'panda': return `<g transform="translate(${x} -2)"><path d="M -20,0 L -20,-26 L -6,-26 L -2,-21 L 20,-21 L 20,0 Z" ${S('#e2b13f', 'stroke-width="3.5"')}/><path d="M -20,0 L -16,-14 L 24,-14 L 20,0 Z" ${S('#efc965', 'stroke-width="3.5"')}/></g>`;
    case 'fox': return `<g transform="translate(${x} -2)"><rect x="-20" y="-16" width="40" height="16" rx="2" ${S('#fbfaf6', 'stroke-width="3.5"')}/><path d="M -20,-16 L 0,-5 L 20,-16" ${L(3)}/><circle cx="12" cy="-14" r="5" ${S('#b8483a', 'stroke-width="2.5"')}/></g>`;
    case 'penguin': return `<g transform="translate(${x} -2) rotate(-8)"><rect x="-17" y="-34" width="34" height="34" rx="3" ${S('#c49a6c', 'stroke-width="3.5"')}/><rect x="-12" y="-28" width="24" height="24" ${N('#fbfaf6')}/><path d="M -8,-9 L -2,-16 L 3,-12 L 9,-22" fill="none" stroke="#b8483a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><rect x="-7" y="-38" width="14" height="7" rx="2" ${S('#9fa1a3', 'stroke-width="2.5"')}/></g>`;
  }
  return '';
}
function plant(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <g class="leaf">
      <path d="M 0,-40 C -30,-60 -46,-96 -30,-120 C -8,-104 -4,-70 0,-40 Z" ${S('#6f9a5b', 'stroke-width="3.5"')}/><path d="M -2,-48 Q -18,-80 -28,-112" ${L(2.5)}/>
      <path d="M 0,-40 C 30,-58 50,-90 40,-118 C 14,-106 6,-72 0,-40 Z" ${S('#7aa864', 'stroke-width="3.5"')}/><path d="M 2,-48 Q 22,-78 36,-110" ${L(2.5)}/>
      <path d="M 0,-40 C -8,-80 0,-118 14,-140 C 22,-110 16,-74 0,-40 Z" ${S('#5f8a4d', 'stroke-width="3.5"')}/><path d="M 2,-50 Q 6,-96 12,-132" ${L(2.5)}/>
    </g>
    <path d="M -26,-42 L 26,-42 L 20,0 L -20,0 Z" ${S('#b9704f')}/><path d="M -28,-48 L 28,-48 L 28,-38 L -28,-38 Z" ${S('#c98262')}/></g>`;
}

function station(bot, x, y, st, chief) {
  const sp = SPECIES[bot.bot]; const w = chief ? 300 : 178; const dt = '#e3b57b', df = '#c98f56', dk = '#b47a45';
  const mode = st.st;
  let s = `<g transform="translate(${x} ${y})">`;
  s += `<path d="M -40,-58 Q -40,-96 0,-96 Q 40,-96 40,-58 L 40,-20 L -40,-20 Z" ${S(chief ? '#7e3f35' : '#5d6b62', 'stroke-width="3.5"')}/>`;
  s += `<g class="${mode === 'idle' ? 'breathe' : ''}">${torso(bot.bot)}<g transform="translate(0 -122)"><g class="${mode === 'idle' ? '' : 'bob'}">${head(bot.bot, mode)}</g></g></g>`;
  s += `<path d="M ${-w / 2 - 6},-18 L ${w / 2 + 6},-18 L ${w / 2 + 6},0 L ${-w / 2 - 6},0 Z" ${S(dt)}/>`;
  s += `<path d="M ${-w / 2},0 L ${w / 2},0 L ${w / 2},${chief ? 86 : 74} L ${-w / 2},${chief ? 86 : 74} Z" ${S(df)}/>`;
  s += `<path d="M ${-w / 2 + 8},7 L ${w / 2 - 8},7" ${L(2.5, 'opacity=".3"')}/>`;
  if (chief) {
    s += `<rect x="${-w / 2 + 16}" y="16" width="70" height="56" rx="5" ${S(dk, 'stroke-width="3.5"')}/><rect x="${w / 2 - 86}" y="16" width="70" height="56" rx="5" ${S(dk, 'stroke-width="3.5"')}/>`;
    s += `<circle cx="${-w / 2 + 51}" cy="44" r="4" ${S('#e2b13f', 'stroke-width="2.5"')}/><circle cx="${w / 2 - 51}" cy="44" r="4" ${S('#e2b13f', 'stroke-width="2.5"')}/>`;
  }
  const npY = chief ? 24 : 20, npW = chief ? 136 : 132, npH = chief ? 46 : 42;
  const dot = mode === 'on' ? '#4f8a3c' : mode === 'wait' ? '#c98a17' : '#a3958a';
  s += `<rect x="${-npW / 2}" y="${npY}" width="${npW}" height="${npH}" rx="9" ${S(chief ? '#efd38a' : '#fffaf0', 'stroke-width="3.5"')}/>`;
  s += `<text x="${-npW / 2 + 12}" y="${npY + 18}" font-family="Baloo 2, sans-serif" font-weight="800" font-size="14" letter-spacing=".5" fill="${INK}">${esc(SPECIES[bot.bot].name || bot.ma)}</text>`;
  s += `<circle cx="${npW / 2 - 14}" cy="${npY + 13}" r="5" ${S(dot, 'stroke-width="2.5"')}/>`;
  s += `<text x="${-npW / 2 + 12}" y="${npY + 34}" font-family="Be Vietnam Pro, sans-serif" font-weight="500" font-size="11.5" fill="#6e5b4c">${esc(bot.ma + ' · ' + bot.ten)}</text>`;
  if (chief) {
    s += `<g transform="translate(-112 0)"><path d="M -12,-4 L 12,-4 L 8,-12 L -8,-12 Z" ${S('#c9a24c', 'stroke-width="3"')}/><path d="M 0,-12 L 0,-46" ${L(3.5)}/><path d="M -22,-44 Q 0,-66 22,-44 Z" ${S('#3f6e4f', 'stroke-width="3.5"')}/></g>`;
    s += `<g transform="translate(96 -2)"><path d="M -24,-4 L 20,-4 L 24,-14 L -20,-14 Z" ${S('#fbfaf6', 'stroke-width="3"')}/><path d="M -22,-14 L 22,-14 L 26,-24 L -18,-24 Z" ${S('#f3eedf', 'stroke-width="3"')}/></g>`;
    s += mug(134, -2, '#b8483a');
    s += paws(bot.bot, 8);
  } else {
    s += laptop(0, DARK_PAW.includes(sp.top) ? '#c9543c' : sp.top);
    s += `<g class="${mode === 'on' ? 'typing' : ''}">${paws(bot.bot)}</g>`;
    s += prop(bot.bot, -66);
    s += mug(68, -2, ['#7c98b3', '#b8483a', '#e2b13f', '#6f9a5b'][bot.bot.length % 4]);
  }
  s += bubble(mode, chief ? 64 : 58, -166);
  s += `</g>`;
  return s;
}

const DEPTS = {
  boss:    { name: 'Phòng Giám đốc',  wall: '#b9cec5', members: ['chief'] },
  meet:    { name: 'Phòng họp',       wall: '#c4cfda', members: [] },
  cafe:    { name: 'Góc cà phê',      wall: '#e3d2ac', members: [], tile: true },
  data:    { name: 'Phòng Dữ liệu',   wall: '#cad6be', members: ['scan', 'report'] },
  tech:    { name: 'Phòng Kỹ thuật',  wall: '#c6ccd5', members: ['tech'] },
  content: { name: 'Phòng Nội dung',  wall: '#e3cbc2', members: ['writer'] },
  sales:   { name: 'Phòng Khách hàng', wall: '#ddd3a9', members: ['local', 'outreach'] },
};
const DEPT_OF = {}; Object.entries(DEPTS).forEach(([k, d]) => d.members.forEach((m) => { DEPT_OF[m] = k; }));
const FLOOR_BAND = 56;

function signBoard(cx, y, text) {
  const w = Math.max(150, text.length * 10.5 + 44);
  return `<g transform="translate(${cx} ${y})"><path d="M ${-w / 2 + 18},-14 L ${-w / 2 + 18},0 M ${w / 2 - 18},-14 L ${w / 2 - 18},0" ${L(3)}/>
    <rect x="${-w / 2}" y="0" width="${w}" height="34" rx="9" ${S('#fffaf0', 'stroke-width="3.5"')}/>
    <text x="0" y="23" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="16" letter-spacing=".6" fill="${INK}">${esc(text.toUpperCase())}</text></g>`;
}
function roomShell(r, d) {
  const wb = r.y + r.h - FLOOR_BAND;
  let s = `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${d.wall}"/>`;
  for (let x = r.x + 34; x < r.x + r.w; x += 68) s += `<path d="M ${x},${r.y} L ${x},${wb - 64}" stroke="#3b2a20" stroke-opacity=".05" stroke-width="3"/>`;
  s += `<rect x="${r.x}" y="${wb - 64}" width="${r.w}" height="64" fill="#3b2a20" fill-opacity=".08"/>`;
  for (let x = r.x + 26; x < r.x + r.w; x += 52) s += `<path d="M ${x},${wb - 56} L ${x},${wb - 10}" ${L(2.5, 'opacity=".18"')}/>`;
  s += `<path d="M ${r.x},${wb - 64} L ${r.x + r.w},${wb - 64}" ${L(3.5)}/>`;
  if (d.tile) {
    s += `<rect x="${r.x}" y="${wb}" width="${r.w}" height="${FLOOR_BAND}" fill="#efe6d3"/>`;
    for (let x = r.x, i = 0; x < r.x + r.w; x += 28, i++) for (let y = wb, j = 0; y < wb + FLOOR_BAND; y += 28, j++) if ((i + j) % 2) s += `<rect x="${x}" y="${y}" width="28" height="28" fill="#d9cdb5"/>`;
  } else {
    s += `<rect x="${r.x}" y="${wb}" width="${r.w}" height="${FLOOR_BAND}" fill="#d8a96f"/>`;
    [wb + 19, wb + 38].forEach((y, j) => { s += `<path d="M ${r.x},${y} L ${r.x + r.w},${y}" stroke="#bf8f57" stroke-width="3"/>`; });
    for (let row = 0; row < 3; row++) for (let x = r.x + 40 + (row % 2) * 70; x < r.x + r.w; x += 140) s += `<path d="M ${x},${wb + row * 19} L ${x},${wb + row * 19 + 19}" stroke="#bf8f57" stroke-width="3"/>`;
  }
  s += `<rect x="${r.x}" y="${wb - 10}" width="${r.w}" height="12" ${S('#f3ecdc', 'stroke-width="3.5"')}/>`;
  return s;
}
function windowBox(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ${S('#cfe4ea')}/>
    <path d="M ${x + 18},${y + 46} q 10,-16 26,-8 q 12,-12 24,2 q 14,0 12,12 l -60,0 q -10,0 -2,-6 Z" ${S('#fbfaf6', 'stroke-width="3"')}/>
    <path d="M ${x + w / 2},${y} L ${x + w / 2},${y + h} M ${x},${y + h / 2} L ${x + w},${y + h / 2}" ${L(4)}/>
    <rect x="${x - 8}" y="${y + h - 2}" width="${w + 16}" height="11" rx="3" ${S('#f3ecdc', 'stroke-width="3.5"')}/>
    <path d="M ${x - 12},${y - 8} Q ${x + 8},${y + h / 2} ${x - 2},${y + h + 4} L ${x - 20},${y + h + 4} Q ${x - 24},${y + h / 2} ${x - 12},${y - 8} Z" ${S('#d9a441', 'stroke-width="3.5"')}/>
    <path d="M ${x + w + 12},${y - 8} Q ${x + w - 8},${y + h / 2} ${x + w + 2},${y + h + 4} L ${x + w + 20},${y + h + 4} Q ${x + w + 24},${y + h / 2} ${x + w + 12},${y - 8} Z" ${S('#d9a441', 'stroke-width="3.5"')}/>
    <path d="M ${x - 26},${y - 10} L ${x + w + 26},${y - 10}" ${L(5)}/>`;
}
function clockFace(x, y, r, withIds) {
  let s = `<g transform="translate(${x} ${y})"><circle r="${r}" ${S('#fbfaf5', 'stroke-width="5"')}/>`;
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6, r1 = r * .74, r2 = r * (i % 3 ? .82 : .87); s += `<path d="M ${(Math.sin(a) * r1).toFixed(1)},${(-Math.cos(a) * r1).toFixed(1)} L ${(Math.sin(a) * r2).toFixed(1)},${(-Math.cos(a) * r2).toFixed(1)}" ${L(i % 3 ? 2 : 3.5)}/>`; }
  s += `<path ${withIds ? 'id="clk-h"' : ''} d="M 0,0 L 0,${-r * .45}" ${L(5)}/><path ${withIds ? 'id="clk-m"' : ''} d="M 0,0 L 0,${-r * .68}" ${L(3.5)}/><circle r="4" ${N(INK)}/></g>`;
  return s;
}
function poster(x, y, w, h, kind) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ${S(kind === 'cork' ? '#c99a63' : kind === 'blue' ? '#5f7f9f' : '#fbfaf5')}/>`;
  if (kind === 'bars') {
    const bw = (w - 30) / 4; [0.4, 0.62, 0.5, 0.85].forEach((v, i) => { const bh = (h - 30) * v; s += `<rect x="${x + 12 + i * (bw + 2)}" y="${y + h - 12 - bh}" width="${bw - 4}" height="${bh}" ${S(['#9cb7d2', '#8dbb6f', '#f0c45a', '#b8483a'][i], 'stroke-width="2.5"')}/>`; });
  } else if (kind === 'map') {
    s += `<path d="M ${x + 14},${y + 30} q 18,-14 34,-4 q 10,10 -4,22 q -18,8 -30,-6 Z M ${x + w - 54},${y + 22} q 20,-6 34,8 q 4,18 -14,26 q -20,2 -24,-14 Z M ${x + w / 2 - 10},${y + h - 26} q 14,-8 22,2 q 0,12 -14,14 q -10,-4 -8,-16 Z" ${S('#8dbb6f', 'stroke-width="2.5"')}/>`;
    [[x + 30, y + 30], [x + w - 34, y + 34], [x + w / 2, y + h - 18]].forEach(([px, py]) => { s += `<path d="M ${px},${py} l -5,-9 a 5.5,5.5 0 1 1 10,0 Z" ${S('#b8483a', 'stroke-width="2"')}/>`; });
  } else if (kind === 'cork') {
    [['#f3d272', 10, 10, -4], ['#f2b8ae', w / 2 + 2, 14, 5], ['#bcd7a8', 16, h / 2 + 4, 3], ['#fbfaf6', w / 2, h / 2 + 2, -6]].forEach(([c, dx, dy, rot]) => {
      s += `<g transform="rotate(${rot} ${x + dx + 16} ${y + dy + 14})"><rect x="${x + dx}" y="${y + dy}" width="${w / 2 - 16}" height="${h / 2 - 18}" ${S(c, 'stroke-width="2.5"')}/><circle cx="${x + dx + (w / 2 - 16) / 2}" cy="${y + dy + 4}" r="3" ${S('#b8483a', 'stroke-width="1.5"')}/></g>`;
    });
  } else if (kind === 'blue') {
    s += `<path d="M ${x + 12},${y + h - 14} L ${x + 12},${y + 14} L ${x + w - 14},${y + 14} M ${x + 26},${y + 30} L ${x + w - 30},${y + 30} L ${x + w - 30},${y + h - 26} L ${x + 26},${y + h - 26} Z M ${x + w / 2},${y + 30} L ${x + w / 2},${y + h - 26}" fill="none" stroke="#e8f1f2" stroke-width="2.5" stroke-linecap="round"/>`;
    s += `<text x="${x + w / 2}" y="${y + h - 8}" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="11" fill="#e8f1f2">&lt;/&gt;</text>`;
  } else if (kind === 'logo') {
    s += `<text x="${x + w / 2}" y="${y + h / 2 + 8}" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="22" fill="#46557a">TicoSystem</text>`;
  }
  return s;
}
function rackBox(x, floor) {
  const h = 210, w = 74, y = floor - h;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ${S('#4f5664')}/>`;
  for (let i = 0; i < 6; i++) { const yy = y + 14 + i * 32; s += `<rect x="${x + 9}" y="${yy}" width="${w - 18}" height="22" rx="3" ${S('#6b7382', 'stroke-width="3"')}/><circle class="led" cx="${x + 19}" cy="${yy + 11}" r="3" ${N(i % 2 ? '#8dbb6f' : '#f0c45a')}/><path d="M ${x + 30},${yy + 11} L ${x + w - 16},${yy + 11}" ${L(2.5, 'opacity=".5"')}/>`; }
  return s;
}
function bookcase(x, floor, w = 96, h = 220) {
  const y = floor - h; let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ${S('#b47a45')}/>`;
  const cols = [['#46557a', '#b8483a', '#e2b13f', '#6f9a5b', '#a8566a'], ['#6f9a5b', '#e2b13f', '#46557a', '#b8483a'], ['#a8566a', '#46557a', '#e2b13f', '#6f9a5b', '#b8483a']];
  for (let r = 0; r < 3; r++) {
    const sy = y + 14 + r * 66; s += `<rect x="${x + 8}" y="${sy}" width="${w - 16}" height="56" ${N('#8a5a32')}/><path d="M ${x + 8},${sy + 56} L ${x + w - 8},${sy + 56}" ${L(3.5)}/>`;
    let bx = x + 12; cols[r].forEach((c, i) => { const bw = 11 + (i % 2) * 3, bh = 40 + ((i * 7) % 14); if (bx + bw > x + w - 10) return; s += `<rect x="${bx}" y="${sy + 56 - bh}" width="${bw}" height="${bh}" rx="2" ${S(c, 'stroke-width="2.5"')}/>`; bx += bw + 2; });
  }
  return s;
}
function meetingTable(cx, floor) {
  let s = '';
  [-110, 0, 110].forEach((dx) => { s += `<path d="M ${cx + dx - 34},${floor - 78} Q ${cx + dx - 34},${floor - 120} ${cx + dx},${floor - 120} Q ${cx + dx + 34},${floor - 120} ${cx + dx + 34},${floor - 78} Z" ${S('#5d6b62', 'stroke-width="3.5"')}/>`; });
  s += `<path d="M ${cx - 180},${floor - 90} L ${cx + 180},${floor - 90} L ${cx + 180},${floor - 74} L ${cx - 180},${floor - 74} Z" ${S('#e3b57b')}/>`;
  s += `<path d="M ${cx - 160},${floor - 74} L ${cx - 160},${floor - 14} M ${cx + 160},${floor - 74} L ${cx + 160},${floor - 14}" ${L(7)}/>`;
  s += `<g transform="translate(${cx - 60} ${floor - 90})"><path d="M -24,0 L 20,0 L 24,-8 L -20,-8 Z" ${S('#fbfaf6', 'stroke-width="3"')}/></g>`;
  s += mug(cx + 60, floor - 90, '#7c98b3');
  return s;
}
function cafeCorner(r, floor) {
  const x = r.x + 34; let s = '';
  s += `<rect x="${x}" y="${r.y + 70}" width="190" height="58" rx="4" ${S('#c98f56')}/><path d="M ${x + 95},${r.y + 70} L ${x + 95},${r.y + 128}" ${L(3)}/><circle cx="${x + 84}" cy="${r.y + 112}" r="3" ${N(INK)}/><circle cx="${x + 106}" cy="${r.y + 112}" r="3" ${N(INK)}/>`;
  s += `<rect x="${x}" y="${floor - 110}" width="190" height="96" ${S('#c98f56')}/><rect x="${x - 6}" y="${floor - 122}" width="202" height="14" rx="3" ${S('#efe6d3', 'stroke-width="3.5"')}/>`;
  s += `<rect x="${x + 14}" y="${floor - 96}" width="74" height="70" rx="4" ${S('#b47a45', 'stroke-width="3"')}/><rect x="${x + 102}" y="${floor - 96}" width="74" height="70" rx="4" ${S('#b47a45', 'stroke-width="3"')}/>`;
  s += `<g transform="translate(${x + 54} ${floor - 122})"><rect x="-30" y="-72" width="60" height="72" rx="6" ${S('#4f5664')}/><rect x="-20" y="-62" width="40" height="18" rx="3" ${S('#9cb7d2', 'stroke-width="2.5"')}/><path d="M -6,-40 L -6,-30 M 6,-40 L 6,-30" ${L(3.5)}/><path d="M -11,-18 L 11,-18 L 9,0 L -9,0 Z" ${S('#fbfaf6', 'stroke-width="3"')}/></g>`;
  s += mug(x + 130, floor - 122, '#b8483a') + mug(x + 160, floor - 122, '#e2b13f');
  const sx = r.x + r.w - 220;
  s += `<path d="M ${sx},${floor - 14} L ${sx},${floor - 92} Q ${sx},${floor - 120} ${sx + 28},${floor - 120} L ${sx + 152},${floor - 120} Q ${sx + 180},${floor - 120} ${sx + 180},${floor - 92} L ${sx + 180},${floor - 14} Z" ${S('#7c98b3')}/>`;
  s += `<rect x="${sx - 14}" y="${floor - 72}" width="208" height="40" rx="14" ${S('#8fa9c2')}/><rect x="${sx - 22}" y="${floor - 92}" width="30" height="72" rx="12" ${S('#7c98b3')}/><rect x="${sx + 172}" y="${floor - 92}" width="30" height="72" rx="12" ${S('#7c98b3')}/>`;
  s += `<rect x="${sx + 30}" y="${floor - 104}" width="46" height="38" rx="10" ${S('#f0c45a', 'stroke-width="3.5"')} transform="rotate(-8 ${sx + 53} ${floor - 85})"/>`;
  return s;
}

