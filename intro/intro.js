/* MAVIO OPUS · Kennenlernen
   Einleitungsfilm: Blatt Papier → Grundriss → Materialien (erst gläsern) → Wohnung wächst →
   was umgesetzt wird, bekommt Farbe → Kamera geht hinein → echte Räume. Darunter: Wer wir sind + Ablauf. */
import * as THREE from './three.module.min.js';

const RED = '#ff1e3c';
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = () => innerWidth < 760 || (innerHeight > innerWidth * 1.15 && innerWidth < 1200);

/* ---------------- Oberfläche ---------------- */
const css = `
#intro{position:fixed;inset:0;z-index:65;background:#070707;color:#f2efe9;overflow-y:auto;overflow-x:hidden;opacity:0;pointer-events:none;transition:opacity .6s;-webkit-overflow-scrolling:touch;user-select:text;-webkit-user-select:text}
#intro.on{opacity:1;pointer-events:auto}
#intro .stage{position:sticky;top:0;height:100vh;height:100dvh;overflow:hidden}
#intro canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#intro .ph{position:absolute;inset:0;opacity:0;transition:opacity 1.4s ease;background:center/cover no-repeat}
#intro .ph.on{opacity:1}
#intro .ph.kb{animation:ioKB 6s ease-out forwards}
@keyframes ioKB{from{transform:scale(1.02) translate3d(0,0,0)}to{transform:scale(1.14) translate3d(-1.5%,-1%,0)}}
#intro .vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 90% at 50% 45%,rgba(7,7,7,0) 45%,rgba(7,7,7,.75) 100%),linear-gradient(180deg,rgba(7,7,7,.55),rgba(7,7,7,0) 22%,rgba(7,7,7,0) 62%,rgba(7,7,7,.85))}
#intro .bar{position:absolute;left:0;right:0;top:0;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:calc(env(safe-area-inset-top,0px) + 14px) max(20px,env(safe-area-inset-right,0px)) 0 max(20px,env(safe-area-inset-left,0px))}
#intro .bar .k{font-size:10px;letter-spacing:.45em;text-transform:uppercase;color:#a9a49c}
#intro .bar .k b{color:${RED};font-weight:500}
#intro .bar .acts{display:flex;gap:8px}
#intro .ib{border:1px solid rgba(242,239,233,.22);background:rgba(7,7,7,.45);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#f2efe9;border-radius:999px;padding:10px 16px;font:inherit;font-size:10.5px;letter-spacing:.28em;text-transform:uppercase;cursor:pointer}
#intro .ib:hover{border-color:${RED}}
#intro .cap{position:absolute;z-index:3;left:max(28px,6vw);right:max(28px,6vw);bottom:calc(env(safe-area-inset-bottom,0px) + 13vh);pointer-events:none}
#intro .cap .s{display:block;font-size:10px;letter-spacing:.45em;text-transform:uppercase;color:${RED};margin-bottom:12px;opacity:0;transform:translateY(10px);transition:.8s}
#intro .cap .t{display:block;font-family:'Bodoni Moda',Didot,Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(30px,4.6vw,68px);line-height:1.02;max-width:900px;opacity:0;transform:translateY(16px);transition:1s cubic-bezier(.2,.7,.2,1)}
#intro .cap.on .s,#intro .cap.on .t{opacity:1;transform:none}
#intro .prog{position:absolute;z-index:3;left:max(28px,6vw);right:max(28px,6vw);bottom:calc(env(safe-area-inset-bottom,0px) + 7vh);height:1px;background:rgba(242,239,233,.15)}
#intro .prog i{display:block;height:100%;width:0;background:${RED}}
#intro .down{position:absolute;z-index:3;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);transform:translateX(-50%);font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:#a9a49c;opacity:0;transition:opacity .8s;cursor:pointer;border:none;background:none;font-family:inherit;padding:10px}
#intro .down.on{opacity:1}
#intro .down::after{content:"";display:block;width:1px;height:26px;margin:10px auto 0;background:linear-gradient(${RED},transparent);animation:ioDn 1.8s ease-in-out infinite}
@keyframes ioDn{0%,100%{transform:scaleY(.4);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}}
#intro .about{position:relative;z-index:2;background:linear-gradient(180deg,#070707,#0b0a09);padding:clamp(56px,9vw,120px) max(24px,6vw) calc(env(safe-area-inset-bottom,0px) + 90px)}
#intro .about .in{max-width:1080px;margin:0 auto}
#intro .kick{font-size:10.5px;letter-spacing:.45em;text-transform:uppercase;color:${RED}}
#intro h2{margin:14px 0 0;font-family:'Bodoni Moda',Didot,Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(40px,6vw,88px);line-height:.98}
#intro .lead{margin:26px 0 0;font-size:clamp(16px,1.5vw,20px);line-height:1.75;color:#d8d3ca;max-width:760px}
#intro .name{margin:44px 0 0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
#intro .name div{border-top:1px solid rgba(242,239,233,.18);padding-top:14px}
#intro .name b{display:block;font-family:'Bodoni Moda',Didot,Georgia,serif;font-size:40px;font-weight:400;color:${RED};line-height:1}
#intro .name span{display:block;margin-top:8px;font-size:13px;letter-spacing:.06em;color:#f2efe9}
#intro .name small{display:block;margin-top:4px;font-size:12px;color:#a9a49c;line-height:1.5}
#intro .opus{margin:18px 0 0;font-size:13px;color:#a9a49c}
#intro .opus i{color:#f2efe9}
#intro h3{margin:72px 0 22px;font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:#a9a49c;font-weight:500}
#intro .vals{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
#intro .vals div{border:1px solid rgba(242,239,233,.14);border-radius:18px;padding:22px;background:rgba(255,255,255,.02)}
#intro .vals b{display:block;font-family:'Bodoni Moda',Didot,Georgia,serif;font-style:italic;font-weight:400;font-size:26px}
#intro .vals span{display:block;margin-top:8px;font-size:13.5px;line-height:1.65;color:#a9a49c}
#intro ol.flow{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;counter-reset:f;position:relative}
#intro ol.flow li{counter-increment:f;padding:0 18px 0 0;position:relative}
#intro ol.flow li::before{content:counter(f,decimal-leading-zero);display:block;font-family:'Bodoni Moda',Didot,Georgia,serif;font-size:38px;color:${RED};line-height:1}
#intro ol.flow li::after{content:"";position:absolute;left:58px;right:12px;top:20px;height:1px;background:rgba(242,239,233,.16)}
#intro ol.flow li:last-child::after{display:none}
#intro ol.flow b{display:block;margin-top:14px;font-size:16px;font-weight:500}
#intro ol.flow span{display:block;margin-top:6px;font-size:13px;line-height:1.6;color:#a9a49c}
#intro .inv{margin:56px 0 0;border:1px solid rgba(255,30,60,.35);border-radius:20px;padding:24px 26px;display:flex;gap:22px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:rgba(255,30,60,.05)}
#intro .inv p{margin:0;font-size:14.5px;line-height:1.7;color:#d8d3ca;max-width:640px}
#intro .inv p b{color:#f2efe9;font-weight:500}
#intro .cta{margin:56px 0 0;display:flex;gap:12px;flex-wrap:wrap}
#intro .cta button{border:1px solid rgba(242,239,233,.25);background:none;color:#f2efe9;border-radius:999px;padding:15px 24px;font:inherit;font-size:11px;letter-spacing:.3em;text-transform:uppercase;cursor:pointer}
#intro .cta button.red{background:${RED};border-color:${RED};color:#fff}
#intro .sign{margin:64px 0 0;font-family:'Bodoni Moda',Didot,Georgia,serif;font-style:italic;font-size:20px;color:#a9a49c}
@media (max-width:900px){
  #intro .name{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:22px}
  #intro .vals{grid-template-columns:1fr 1fr}
  #intro ol.flow{grid-template-columns:1fr;row-gap:22px}
  #intro ol.flow li{display:grid;grid-template-columns:56px 1fr;column-gap:12px;padding:0}
  #intro ol.flow li::before{grid-row:1/3}
  #intro ol.flow li b{margin-top:2px}
  #intro ol.flow li::after{display:none}
}
@media (max-width:560px){#intro .vals{grid-template-columns:1fr}#intro .cap{bottom:calc(env(safe-area-inset-bottom,0px) + 16vh)}#intro .bar .k{display:none}#intro .bar .acts{margin-left:auto}#intro .ib{padding:7px 11px;font-size:9px;letter-spacing:.14em}}
`;
const html = `
<div class="stage" id="ioStage">
  <canvas id="ioCanvas" aria-hidden="true"></canvas>
  <div class="ph" id="ioP1"></div><div class="ph" id="ioP2"></div><div class="ph" id="ioP3"></div>
  <div class="vig"></div>
  <div class="bar"><span class="k"><b>Mavio Opus</b> · Kennenlernen</span>
    <div class="acts"><button class="ib" id="ioReplay" hidden>Nochmal</button><button class="ib" id="ioSkip">Überspringen</button><button class="ib" id="ioClose">Schließen</button></div></div>
  <div class="cap" id="ioCap"><span class="s" id="ioS"></span><span class="t" id="ioT"></span></div>
  <div class="prog"><i id="ioProg"></i></div>
  <button class="down" id="ioDown">Wer wir sind</button>
</div>
<section class="about" id="ioAbout">
 <div class="in">
  <span class="kick">Kennenlernen</span>
  <h2>Wer wir sind</h2>
  <p class="lead">MAVIO OPUS macht aus Wohnungen Einzelstücke. Wir kaufen, planen und sanieren – vom ersten Strich auf dem Grundriss bis zum letzten Detail im Bad. In Ruhe, mit ausgesuchten Materialien und einer Ausführung, die man sieht und spürt.</p>
  <div class="name">
   <div><b>A</b><span>Anspruch</span><small>Wir machen es richtig – oder gar nicht.</small></div>
   <div><b>V</b><span>Veredelung</span><small>Marmor, Fischgrät, Stuck: Material mit Charakter.</small></div>
   <div><b>I</b><span>Individualität</span><small>Jede Wohnung bekommt ihre eigene Handschrift.</small></div>
   <div><b>O</b><span>Ordnung</span><small>Saubere Planung, saubere Baustelle, saubere Übergabe.</small></div>
  </div>
  <p class="opus"><i>Opus</i> – lateinisch für „Werk“. Jede Wohnung ist eines.</p>

  <h3>Was uns ausmacht</h3>
  <div class="vals">
   <div><b>In Ruhe</b><span>Wir nehmen uns die Zeit, die eine gute Wohnung braucht. Nichts wird schnell-schnell gemacht.</span></div>
   <div><b>Im Detail</b><span>Fugenbild, Stuckprofil, Übergänge – die kleinen Dinge entscheiden über das Ganze.</span></div>
   <div><b>Ganz oder gar nicht</b><span>Wir sanieren komplett: ganze Wohnungen und Häuser im Innenausbau. Kein Stückwerk.</span></div>
   <div><b>Aus einer Hand</b><span>Ankauf, Planung, Sanierung und Verkauf – mit einem festen Ansprechpartner.</span></div>
  </div>

  <h3>So arbeiten wir</h3>
  <ol class="flow">
   <li><b>Kennenlernen</b><span>Ihre Wünsche, Ihr Stil, Ihr Budgetrahmen.</span></li>
   <li><b>Grundriss &amp; Planung</b><span>Aufmaß vor Ort, jeder Raum wird durchgeplant.</span></li>
   <li><b>Material &amp; Bemusterung</b><span>Parkett, Marmor, Fliesen, Armaturen – Sie wählen mit uns aus.</span></li>
   <li><b>Ausführung</b><span>Komplettsanierung mit festen Handwerkern – sauber und termintreu.</span></li>
   <li><b>Übergabe</b><span>Gemeinsame Abnahme. Eine Wohnung, die wirklich fertig ist.</span></li>
  </ol>

  <div class="inv"><p><b>Für Investoren:</b> Wir kaufen gemeinsam, sanieren in eigener Hand und verkaufen gemeinsam – auf Wunsch als Standard-Linie mit fester Ausstattung und Kalkulation pro m².</p></div>

  <div class="cta"><button class="red" data-go="kontakt">Termin vereinbaren</button><button data-go="refs">Referenzen ansehen</button><button data-go="ablauf">Ablauf im Detail</button></div>
  <p class="sign">In Ruhe. Im Detail. Individuell.</p>
 </div>
</section>`;

let root, renderer, scene, camera, clock, raf = 0, T = 0, playing = false, built = false, W = 1, H = 1;
const DUR = 31;

/* ---------------- Texturen (gemalt, kein Download nötig) ---------------- */
function cvs(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
function rnd(s) { return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function tex(c, rep) { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); } return t; }
function marble() { const [c, g] = cvs(1024, 1024); const r = rnd(7); g.fillStyle = '#f1eee8'; g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 14; i++) { let x = r() * 1024, y = 0; g.beginPath(); g.moveTo(x, y); g.lineWidth = .6 + r() * 2.6; g.strokeStyle = `rgba(${90 + r() * 40},${90 + r() * 40},${96 + r() * 40},${.25 + r() * .5})`;
    while (y < 1024) { x += (r() - .5) * 46; y += 10 + r() * 22; g.lineTo(x, y); } g.stroke(); }
  g.filter = 'blur(1.2px)'; g.drawImage(c, 0, 0); g.filter = 'none'; return tex(c); }
function herringbone() { const [c, g] = cvs(1024, 1024); const r = rnd(11); g.fillStyle = '#6e4c2f'; g.fillRect(0, 0, 1024, 1024);
  const L = 160, B = 40; g.save(); g.translate(512, 512); g.rotate(Math.PI / 4); g.translate(-900, -900);
  for (let row = -2; row < 30; row++) for (let col = -2; col < 30; col++) { const x = col * L, y = row * B * 2 + col * B;
    for (const k of [0, 1]) { const shade = 120 + r() * 50; g.fillStyle = `rgb(${shade + 40},${shade - 5},${shade - 55})`;
      if (k === 0) g.fillRect(x, y, L - 3, B - 3); else g.fillRect(x + L - B, y + B, B - 3, L - 3);
      g.fillStyle = 'rgba(60,35,15,.18)'; for (let j = 0; j < 4; j++) { if (k === 0) g.fillRect(x, y + r() * B, L - 3, 1); else g.fillRect(x + L - B + r() * B, y + B, 1, L - 3); } } }
  g.restore(); return tex(c, [3, 3]); }
function oak() { const [c, g] = cvs(1024, 1024); const r = rnd(5); for (let y = 0; y < 1024; y += 64) { let x = -r() * 300; while (x < 1024) { const len = 300 + r() * 400, s = 175 + r() * 35;
    g.fillStyle = `rgb(${s + 30},${s + 5},${s - 40})`; g.fillRect(x, y, len - 3, 61); g.fillStyle = 'rgba(120,85,45,.12)'; for (let j = 0; j < 6; j++) g.fillRect(x, y + r() * 60, len - 3, 1); x += len; } }
  return tex(c, [2, 2]); }
function terrazzo() { const [c, g] = cvs(1024, 1024); const r = rnd(3); g.fillStyle = '#cfcac2'; g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 2600; i++) { const s = 2 + r() * 9; const t = r(); g.fillStyle = t < .5 ? `rgba(80,76,72,${.4 + r() * .4})` : t < .8 ? 'rgba(245,242,236,.8)' : `rgba(160,60,55,${.35 + r() * .3})`;
    g.beginPath(); g.ellipse(r() * 1024, r() * 1024, s, s * (.5 + r() * .5), r() * 3, 0, 7); g.fill(); } return tex(c, [2, 2]); }
function plaster() { const [c, g] = cvs(512, 512); const r = rnd(9); g.fillStyle = '#ece6dc'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(${r() < .5 ? 255 : 120},${r() < .5 ? 250 : 110},${r() < .5 ? 240 : 100},.05)`; g.fillRect(r() * 512, r() * 512, 2, 2); } return tex(c, [2, 1]); }
function tableTex() { const [c, g] = cvs(2048, 1024); const r = rnd(13); const grd = g.createLinearGradient(0, 0, 2048, 0); grd.addColorStop(0, '#16120f'); grd.addColorStop(.5, '#201914'); grd.addColorStop(1, '#14100d'); g.fillStyle = grd; g.fillRect(0, 0, 2048, 1024);
  for (let i = 0; i < 260; i++) { let y = r() * 1024; g.beginPath(); g.moveTo(0, y); for (let x = 0; x <= 2048; x += 64) { y += (r() - .5) * 6; g.lineTo(x, y); } g.strokeStyle = `rgba(${70 + r() * 40},${50 + r() * 30},${35 + r() * 20},${.08 + r() * .12})`; g.lineWidth = .5 + r() * 2; g.stroke(); }
  return tex(c); }

/* ---------------- Grundriss (Meter) ---------------- */
const PW = 10, PH = 7, SC = 0.2; // 10 × 7 m, Maßstab im Modell
const WALLS = [[0, 0, 10, 0], [10, 0, 10, 7], [10, 7, 0, 7], [0, 7, 0, 0], [6, 0, 6, 2.6], [6, 3.6, 6, 7], [6, 3.5, 7, 3.5], [8, 3.5, 10, 3.5], [8, 0, 8, 1.5], [8, 2.4, 8, 3.5]];
const ROOMS = [{ n: 'Wohnen · Essen', r: [0, 0, 6, 7], m: 'hb' }, { n: 'Schlafen', r: [6, 3.5, 10, 7], m: 'oak' }, { n: 'Küche · Flur', r: [6, 0, 8, 3.5], m: 'tz' }, { n: 'Bad', r: [8, 0, 10, 3.5], m: 'mb' }];
const toM = (x, y) => [(x - PW / 2) * SC, -(y - PH / 2) * SC];

let planC, planG, planT, drawn = -1;
function drawPlan(p) { // p: 0..1 Fortschritt des Zeichnens
  if (Math.abs(p - drawn) < .004) return; drawn = p;
  const w = planC.width, h = planC.height, g = planG, m = 150, sc = (w - 2 * m) / PW;
  g.fillStyle = '#f2ede3'; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(60,70,90,.07)'; g.lineWidth = 1; for (let x = m; x <= w - m; x += sc / 2) { g.beginPath(); g.moveTo(x, m * .7); g.lineTo(x, h - m * .7); g.stroke(); } for (let y = m * .7; y <= h - m * .7; y += sc / 2) { g.beginPath(); g.moveTo(m, y); g.lineTo(w - m, y); g.stroke(); }
  const P = (x, y) => [m + x * sc, h - m * .9 - y * sc];
  const total = WALLS.reduce((s, [a, b, c, d]) => s + Math.hypot(c - a, d - b), 0); let left = p * 1.15 * total;
  g.strokeStyle = '#25221f'; g.lineCap = 'square';
  for (const [a, b, c, d] of WALLS) { const L = Math.hypot(c - a, d - b); if (left <= 0) break; const f = Math.min(1, left / L); left -= L;
    const [x1, y1] = P(a, b), [x2, y2] = P(a + (c - a) * f, b + (d - b) * f); g.lineWidth = (a === 0 && c === 0) || (b === 0 && d === 0) || (a === 10 && c === 10) || (b === 7 && d === 7) ? 14 : 8; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
  const q = Math.max(0, (p - .55) / .45);
  if (q > 0) { g.globalAlpha = q;
    g.fillStyle = '#3b3631'; g.font = `italic ${Math.round(sc * .32)}px Georgia,serif`; g.textAlign = 'center';
    for (const R of ROOMS) { const [x1, y1, x2, y2] = R.r; const [cx, cy] = P((x1 + x2) / 2, (y1 + y2) / 2); g.fillText(R.n, cx, cy); g.font = `${Math.round(sc * .2)}px Georgia,serif`; g.fillText(`${((x2 - x1) * (y2 - y1)).toFixed(1).replace('.', ',')} m²`, cx, cy + sc * .32); g.font = `italic ${Math.round(sc * .32)}px Georgia,serif`; }
    g.strokeStyle = 'rgba(190,30,50,.75)'; g.lineWidth = 2; const [ax, ay] = P(0, -.5), [bx] = P(10, -.5); g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, ay); g.moveTo(ax, ay - 10); g.lineTo(ax, ay + 10); g.moveTo(bx, ay - 10); g.lineTo(bx, ay + 10); g.stroke();
    g.fillStyle = 'rgba(190,30,50,.85)'; g.font = `${Math.round(sc * .2)}px Georgia,serif`; g.fillText('10,00 m', (ax + bx) / 2, ay - 12);
    g.textAlign = 'right'; g.fillStyle = '#25221f'; g.font = `600 ${Math.round(sc * .16)}px Helvetica,Arial,sans-serif`; g.fillText('MAVIO OPUS', w - m, m * .55); g.font = `${Math.round(sc * .13)}px Helvetica,Arial,sans-serif`; g.fillStyle = '#6b645b'; g.fillText('GRUNDRISS · M 1:50', w - m, m * .55 + sc * .2);
    g.globalAlpha = 1; }
  planT.needsUpdate = true; }

/* ---------------- Szene ---------------- */
const ghosts = []; // {mats:[], edges, real:{...}, t0}
function ghostMat(base) { const m = base.clone(); m.transparent = true; m.opacity = .1; m.depthWrite = false; m.userData.real = { color: base.color.clone(), map: base.map || null }; m.map = null; m.color = new THREE.Color('#dfe8f0'); return m; }
function withEdges(mesh, op = .55) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), new THREE.LineBasicMaterial({ color: '#e9eef3', transparent: true, opacity: op })); mesh.add(e); return e; }
function makeGhost(mesh, realAt) { const real = mesh.material; const ghost = ghostMat(real); mesh.material = ghost; const edges = withEdges(mesh); ghosts.push({ mesh, real, ghost, edges, realAt, done: false }); return mesh; }

let paper, mats = [], walls = [], floors = [], cornice = [], sweep, key, model;
function build() {
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('ioCanvas'), antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile() ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  scene = new THREE.Scene(); scene.background = new THREE.Color('#070707'); scene.fog = new THREE.Fog('#070707', 6, 13);
  camera = new THREE.PerspectiveCamera(38, 1, .01, 50);
  scene.add(new THREE.HemisphereLight('#fff3e2', '#0c0a08', .55));
  key = new THREE.DirectionalLight('#ffe9cf', 2.1); key.position.set(-2.5, 4.5, 2); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; key.shadow.bias = -.0004; scene.add(key);
  const fill = new THREE.DirectionalLight('#cfd9ff', .35); fill.position.set(3, 2, -2); scene.add(fill);
  sweep = new THREE.SpotLight('#fff1dc', 0, 6, .45, .6, 1.2); sweep.position.set(0, 2.2, 0); scene.add(sweep); scene.add(sweep.target);

  const table = new THREE.Mesh(new THREE.PlaneGeometry(14, 9), new THREE.MeshStandardMaterial({ map: tableTex(), roughness: .55, metalness: .05 }));
  table.rotation.x = -Math.PI / 2; table.receiveShadow = true; scene.add(table);

  [planC, planG] = cvs(2400, 1720); planT = tex(planC); drawPlan(0);
  paper = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.86), new THREE.MeshStandardMaterial({ map: planT, roughness: .92, transparent: true, opacity: 0, emissive: '#ffffff', emissiveMap: planT, emissiveIntensity: .32 }));
  paper.rotation.x = -Math.PI / 2; paper.position.y = .002; paper.receiveShadow = true; scene.add(paper);

  /* Materialmuster auf dem Tisch */
  const MB = marble(), HB = herringbone(), OK = oak(), TZ = terrazzo(), PL = plaster();
  const sample = (geo, mat, from, to, ry, at) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; m.userData = { from: new THREE.Vector3(...from), to: new THREE.Vector3(...to), ry, at }; m.position.copy(m.userData.from); scene.add(m); makeGhost(m, 0); mats.push(m); return m; };
  const mbMat = new THREE.MeshPhysicalMaterial({ map: MB, roughness: .18, clearcoat: .6, clearcoatRoughness: .2 });
  sample(new THREE.BoxGeometry(.62, .035, .42), mbMat, [-3.4, 1.4, 1.6], [-1.85, .018, .55], .25, 5.6);
  sample(new THREE.BoxGeometry(.5, .028, .5), new THREE.MeshStandardMaterial({ map: HB, roughness: .55 }), [3.6, 1.6, 1.4], [1.85, .014, .62], -.35, 6.1);
  sample(new THREE.BoxGeometry(.56, .024, .22), new THREE.MeshStandardMaterial({ map: OK, roughness: .6 }), [3.2, 1.3, -1.8], [1.75, .012, -.55], .5, 6.6);
  sample(new THREE.BoxGeometry(.3, .03, .3), new THREE.MeshStandardMaterial({ map: TZ, roughness: .4 }), [-3.4, 1.2, -1.6], [-1.8, .015, -.48], -.2, 7.1);
  const prof = new THREE.Shape(); prof.moveTo(0, 0); prof.lineTo(.09, 0); prof.quadraticCurveTo(.085, .03, .05, .04); prof.quadraticCurveTo(.02, .05, .015, .09); prof.lineTo(0, .09); prof.lineTo(0, 0);
  const stuck = new THREE.ExtrudeGeometry(prof, { depth: .55, bevelEnabled: false }); stuck.translate(0, 0, -.275);
  sample(stuck, new THREE.MeshStandardMaterial({ color: '#efeae1', roughness: .7 }), [0, 1.8, 2.6], [-.15, 0, 1.12], Math.PI / 2, 7.6);
  const brass = new THREE.MeshStandardMaterial({ color: '#a8875a', metalness: .85, roughness: .35 });
  const tap = new THREE.Group(); const c1 = new THREE.Mesh(new THREE.CylinderGeometry(.022, .026, .16, 32), brass); c1.position.y = .08; const arc = new THREE.Mesh(new THREE.TorusGeometry(.06, .012, 16, 48, Math.PI), brass); arc.position.set(.06, .16, 0); tap.add(c1, arc);
  tap.userData = { from: new THREE.Vector3(.4, 1.7, -2.6), to: new THREE.Vector3(.75, 0, -1.12), ry: .6, at: 8.1 }; tap.position.copy(tap.userData.from); scene.add(tap); tap.children.forEach(m => { m.castShadow = true; makeGhost(m, 0); }); mats.push(tap);

  /* Wohnung, die aus dem Grundriss wächst */
  model = new THREE.Group(); model.position.y = .004; scene.add(model);
  const Hh = 2.8 * SC, Th = .2 * SC;
  const wallMat = new THREE.MeshStandardMaterial({ map: PL, roughness: .9, color: '#ffffff' });
  WALLS.forEach(([a, b, c, d], i) => { const L = Math.hypot(c - a, d - b) * SC + Th; const g = new THREE.BoxGeometry(L, Hh, Th); g.translate(0, Hh / 2, 0);
    const w = new THREE.Mesh(g, wallMat); const [x1, z1] = toM(a, b), [x2, z2] = toM(c, d); w.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2); w.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    w.castShadow = true; w.receiveShadow = true; w.scale.y = .001; w.userData.i = i; model.add(w); makeGhost(w, 0); walls.push(w); });
  const fm = { hb: new THREE.MeshStandardMaterial({ map: HB, roughness: .5 }), oak: new THREE.MeshStandardMaterial({ map: OK, roughness: .55 }), tz: new THREE.MeshStandardMaterial({ map: TZ, roughness: .35 }), mb: new THREE.MeshPhysicalMaterial({ map: MB, roughness: .15, clearcoat: .7 }) };
  ROOMS.forEach((R, i) => { const [x1, y1, x2, y2] = R.r; const g = new THREE.BoxGeometry((x2 - x1) * SC - Th, .006, (y2 - y1) * SC - Th); const f = new THREE.Mesh(g, fm[R.m].clone());
    if (f.material.map) { f.material.map = f.material.map.clone(); f.material.map.needsUpdate = true; f.material.map.repeat.set((x2 - x1) / 2.2, (y2 - y1) / 2.2); }
    const [cx, cz] = toM((x1 + x2) / 2, (y1 + y2) / 2); f.position.set(cx, .003, cz); f.receiveShadow = true; f.visible = false; model.add(f); makeGhost(f, 0); floors.push(f); });
  /* Stuckleiste oben an den Wänden */
  const cMat = new THREE.MeshStandardMaterial({ color: '#f6f1e8', roughness: .6 });
  WALLS.forEach(([a, b, c, d]) => { const L = Math.hypot(c - a, d - b) * SC; const g = new THREE.BoxGeometry(L, .012, Th * 1.9); const m = new THREE.Mesh(g, cMat); const [x1, z1] = toM(a, b), [x2, z2] = toM(c, d);
    m.position.set((x1 + x2) / 2, Hh - .006, (z1 + z2) / 2); m.rotation.y = -Math.atan2(z2 - z1, x2 - x1); m.visible = false; model.add(m); cornice.push(m); });
  built = true; resize(); }

/* ---------------- Ablauf ---------------- */
const ease = t => t < 0 ? 0 : t > 1 ? 1 : t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const span = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const CAM = [ // Zeit, Position, Blickziel
  [0, [0, 4.6, .25], [0, 0, 0]], [4.5, [0, 3.7, 1.1], [0, 0, 0]], [8.5, [2.3, 2.4, 2.6], [0, .05, 0]], [13, [-1.9, 1.9, 2.5], [0, .12, 0]],
  [17.5, [-1.75, 1.55, 2.1], [0, .1, 0]], [20.6, [-1.35, 1.1, 1.45], [-.15, .1, -.1]], [23, [-1.2, .95, 1.25], [-.15, .1, -.15]]];
function camAt(t) { let i = 0; while (i < CAM.length - 2 && t > CAM[i + 1][0]) i++; const [t0, p0, q0] = CAM[i], [t1, p1, q1] = CAM[i + 1]; const k = ease(span(t, t0, t1));
  const q = q0.map((v, j) => v + (q1[j] - v) * k), f = camera.aspect < .8 ? 1.7 : 1; camera.position.set(...p0.map((v, j) => q[j] + (v + (p1[j] - v) * k - q[j]) * f)); camera.lookAt(...q); }
const CAPS = [[.6, 'Am Anfang', 'Ein Blatt Papier.'], [3.6, 'Der Grundriss', 'Jeder Raum wird zuerst gedacht.'], [6.2, 'Das Material', 'Marmor, Parkett, Stuck, Messing.'],
  [9.6, 'Die Planung', 'Aus dem Plan wächst die Wohnung.'], [13.6, 'Die Ausführung', 'Was wir umsetzen, wird lebendig.'], [18.6, 'Das Ergebnis', 'Und dann: Ihr Zuhause.'],
  [27.4, 'Mavio Opus', 'In Ruhe. Im Detail. Individuell.']];
let capI = -1;
function caption(t) { let k = -1; CAPS.forEach((c, i) => { if (t >= c[0]) k = i; }); if (k === capI) return; capI = k; const el = document.getElementById('ioCap');
  el.classList.remove('on'); setTimeout(() => { if (k < 0) return; document.getElementById('ioS').textContent = CAPS[k][1]; document.getElementById('ioT').textContent = CAPS[k][2]; el.classList.add('on'); }, 380); }
function realize(g, k) { const m = g.mesh.material; if (k >= 1 && !g.done) { g.mesh.material = g.real; g.edges.visible = false; g.done = true; return; } if (g.done) return;
  m.opacity = .1 + .9 * k; m.color.lerpColors(new THREE.Color('#dfe8f0'), g.real.color, k); if (k > .5 && g.real.map && !m.map) { m.map = g.real.map; m.needsUpdate = true; } g.edges.material.opacity = .55 * (1 - k); }
const PHOTOS = [['ioP1', 'raum1.jpg', 20.4], ['ioP2', 'raum5.jpg', 23.2], ['ioP3', 'raum7.jpg', 26]];
function photos(t) { PHOTOS.forEach(([id, src, at], i) => { const el = document.getElementById(id); if (!el.style.backgroundImage) el.style.backgroundImage = `url(${src})`;
  const on = t >= at && (i === PHOTOS.length - 1 || t < PHOTOS[i + 1][2] + .6); if (on !== el.classList.contains('on')) { el.classList.toggle('on', on); if (on) { el.classList.remove('kb'); void el.offsetWidth; el.classList.add('kb'); } } }); }

function frame() {
  if (!playing) return; raf = requestAnimationFrame(frame);
  const dt = Math.min(.05, clock.getDelta()); T += dt; const t = T;
  document.getElementById('ioProg').style.width = (Math.min(1, t / DUR) * 100).toFixed(2) + '%';
  paper.material.opacity = ease(span(t, .2, 1.6));
  drawPlan(ease(span(t, 1.2, 6.2)));
  mats.forEach(m => { const k = ease(span(t, m.userData.at, m.userData.at + 1.6)); m.visible = t > m.userData.at - .05; m.position.lerpVectors(m.userData.from, m.userData.to, k); m.position.y += Math.sin(k * Math.PI) * .25; m.rotation.y = m.userData.ry + (1 - k) * 2.4; m.rotation.z = (1 - k) * .6; });
  walls.forEach((w, i) => { const k = ease(span(t, 9.4 + i * .18, 11.6 + i * .18)); w.scale.y = Math.max(.001, k); w.visible = k > .002; });
  floors.forEach((f, i) => { f.visible = t > 9.2; });
  /* Umsetzen: Material auf dem Tisch wird echt, danach der passende Raum */
  const R = 13.6; const order = [[mats[0], floors[3]], [mats[1], floors[0]], [mats[2], floors[1]], [mats[3], floors[2]]];
  order.forEach(([s, f], i) => { const a = R + i * 1.05, k = ease(span(t, a, a + .9)); [s, ...(s.children || [])].forEach(o => ghosts.filter(g => g.mesh === o).forEach(g => realize(g, k)));
    ghosts.filter(g => g.mesh === f).forEach(g => realize(g, ease(span(t, a + .35, a + 1.3)))); });
  const kw = ease(span(t, R + 4.2, R + 5.4)); ghosts.filter(g => walls.includes(g.mesh)).forEach(g => realize(g, kw));
  ghosts.filter(g => g.mesh === mats[4]).forEach(g => realize(g, ease(span(t, R + 4.2, R + 5)))); cornice.forEach(c => c.visible = t > R + 5.2);
  ghosts.filter(g => mats[5].children.includes(g.mesh)).forEach(g => realize(g, ease(span(t, R + 3.6, R + 4.4))));
  /* Lichtkegel fährt über das, was gerade umgesetzt wird */
  const sw = span(t, R - .2, R + 5.6); sweep.intensity = Math.sin(sw * Math.PI) * 4.5; const sx = -1.2 + sw * 2.4; sweep.position.set(sx, 2.3, .3); sweep.target.position.set(sx * .6, 0, 0);
  key.intensity = 2.1 - ease(span(t, 20, 22)) * .6;
  camAt(t); caption(t); photos(t);
  const fade = ease(span(t, 19.9, 21.1)); document.getElementById('ioCanvas').style.opacity = String(1 - fade * .85);
  if (t >= DUR - 3) { document.getElementById('ioDown').classList.add('on'); document.getElementById('ioReplay').hidden = false; }
  if (t >= DUR) { playing = false; }
  renderer.render(scene, camera);
}
function resize() { if (!built) return; const st = document.getElementById('ioStage'); W = st.clientWidth; H = st.clientHeight; renderer.setSize(W, H, false); camera.aspect = W / H; camera.fov = W / H < .8 ? 58 : 38; camera.updateProjectionMatrix(); if (!playing) renderer.render(scene, camera); }

function reset() { T = 0; capI = -1; drawn = -1; ghosts.forEach(g => { g.done = false; g.ghost.opacity = .1; g.ghost.color.set('#dfe8f0'); g.ghost.map = null; g.ghost.needsUpdate = true; g.mesh.material = g.ghost; g.edges.visible = true; g.edges.material.opacity = .55; });
  walls.forEach(w => { w.scale.y = .001; w.visible = false; }); mats.forEach(m => m.visible = false); cornice.forEach(c => c.visible = false); floors.forEach(f => f.visible = false);
  ['ioP1', 'ioP2', 'ioP3'].forEach(id => document.getElementById(id).classList.remove('on', 'kb')); document.getElementById('ioCanvas').style.opacity = '1';
  document.getElementById('ioDown').classList.remove('on'); document.getElementById('ioReplay').hidden = true; document.getElementById('ioCap').classList.remove('on'); }
function play() { reset(); playing = true; clock = new THREE.Clock(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
function seek(t) { reset(); T = t; playing = true; clock = new THREE.Clock(); frame(); playing = false; cancelAnimationFrame(raf); renderer.render(scene, camera); }

function ensureDom() {
  if (root) return; const st = document.createElement('style'); st.textContent = css; document.head.append(st);
  root = document.createElement('div'); root.id = 'intro'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', 'Mavio Opus kennenlernen'); root.innerHTML = html; document.body.append(root);
  const about = () => root.scrollTo({ top: document.getElementById('ioAbout').offsetTop, behavior: 'smooth' });
  document.getElementById('ioClose').onclick = close; document.getElementById('ioDown').onclick = about;
  document.getElementById('ioSkip').onclick = () => { if (built) seek(DUR); about(); };
  document.getElementById('ioReplay').onclick = () => { root.scrollTo({ top: 0, behavior: 'smooth' }); play(); };
  root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { const k = { kontakt: S2('kontakt'), refs: S2('refs'), ablauf: S2('steps') }[b.dataset.go]; close(); if (k >= 0) setTimeout(() => { try { go(k); } catch (e) { } }, 350); });
  addEventListener('resize', resize); addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('on')) close(); });
}
function S2(kind) { try { return S.findIndex(s => s.kind === kind); } catch (e) { return -1; } }
function open() { ensureDom(); root.scrollTop = 0; root.classList.add('on'); document.body.style.overflow = 'hidden';
  try { if (!built) build(); resize(); if (still) { seek(DUR); } else play(); } catch (e) { console.warn('Intro-3D nicht verfügbar', e); document.getElementById('ioCanvas').style.display = 'none'; document.getElementById('ioP1').style.backgroundImage = 'url(raum1.jpg)'; document.getElementById('ioP1').classList.add('on'); document.getElementById('ioDown').classList.add('on'); } }
function close() { if (!root) return; root.classList.remove('on'); playing = false; cancelAnimationFrame(raf); document.body.style.overflow = ''; }

window.MOIntro = { open, close, seek: t => { ensureDom(); root.classList.add('on'); if (!built) build(); resize(); seek(t); }, get time() { return T; } };
