let PAYLOAD = null;
const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
async function unlock(pw) {
  if (!PAYLOAD) PAYLOAD = await (await fetch('data.enc.json?v=' + Date.now(), { cache: 'no-store' })).json();
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  const k = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(PAYLOAD.salt), iterations: PAYLOAD.iter, hash: 'SHA-256' }, key, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(PAYLOAD.iv) }, k, b64(PAYLOAD.ct));
  return JSON.parse(new TextDecoder().decode(pt));
}
