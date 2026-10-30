/* Abwandlungen von Zeichen 2 (O in der Spitze des M verschweißt). 200×200, Farbe = currentColor, Fugen = var(--gap). */
const MPOLY='30,150 30,20 64,20 100,82 136,20 170,20 170,150 136,150 136,82 116,116 84,116 64,82 64,150';
const O2=(cx=100,cy=142,r=36,w=24)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="${w}"/>`;
const GAP=(cx,cy,r,w)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" style="stroke:var(--gap,#070605)" stroke-width="${w}"/>`;
const MARKS=[
 {k:'A',n:'Original',d:'Die Nr. 2, wie du sie gewählt hast.',
  s:()=>`<polygon points="${MPOLY}" fill="currentColor"/>${O2()}`},
 {k:'B',n:'Rund',d:'Weiche, runde Enden – wirkt wärmer und hochwertiger.',
  s:()=>`<path d="M47 152 V40 L100 108 L153 40 V152" fill="none" stroke="currentColor" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>${O2(100,146,32,22)}`},
 {k:'C',n:'Schlank',d:'Schmaler und höher, das O kleiner – elegant wie eine Säule.',
  s:()=>`<polygon points="52,152 52,12 78,12 100,64 122,12 148,12 148,152 122,152 122,74 109,100 91,100 78,74 78,152" fill="currentColor"/>${O2(100,150,26,18)}`},
 {k:'D',n:'Fuge',d:'Ein feiner Spalt trennt O und M – wie zwei geschmiedete Teile.',
  s:()=>`<polygon points="${MPOLY}" fill="currentColor"/>${GAP(100,142,36,38)}${O2()}`},
 {k:'E',n:'Gravur',d:'Eine dünne Linie läuft durch M und O, wie eingraviert.',
  s:()=>`<polygon points="${MPOLY}" fill="currentColor"/>${O2()}<polyline points="47,146 47,34 100,104 153,34 153,146" fill="none" style="stroke:var(--gap,#070605)" stroke-width="3" stroke-linejoin="miter"/>${GAP(100,142,36,3)}`},
 {k:'F',n:'Sockel',d:'Kleine Sockel oben und unten wie bei einer römischen Inschrift.',
  s:()=>`<polygon points="${MPOLY}" fill="currentColor"/><rect x="20" y="12" width="54" height="9" fill="currentColor"/><rect x="126" y="12" width="54" height="9" fill="currentColor"/><rect x="20" y="146" width="54" height="9" fill="currentColor"/><rect x="126" y="146" width="54" height="9" fill="currentColor"/>${O2(100,150,34,22)}`},
 {k:'G',n:'Kette',d:'Ein größerer Ring legt sich wie ein Kettenglied um beide Beine.',
  s:()=>`<polygon points="${MPOLY}" fill="currentColor"/>${GAP(100,130,58,30)}${O2(100,130,58,16)}`},
 {k:'H',n:'Kontur',d:'Das M nur als Umriss, das O massiv – leicht und doch kräftig.',
  s:()=>`<polygon points="${MPOLY}" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="miter"/>${O2(100,144,34,26)}`},
 {k:'I',n:'Gemeißelt',d:'Schräg angeschnittene Kanten, als wäre es aus Stein geschlagen.',
  s:()=>`<polygon points="30,156 30,34 44,20 64,20 100,82 136,20 156,20 170,34 170,156 136,148 136,82 116,116 84,116 64,82 64,148" fill="currentColor"/>${O2()}`},
 {k:'J',n:'Medaillon',d:'Das Zeichen in einem feinen Kreis – wie eine Münze, passt zum Ring.',
  s:()=>`<circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" stroke-width="4"/><g transform="translate(100 104) scale(.66) translate(-100 -105)"><polygon points="${MPOLY}" fill="currentColor"/>${O2()}</g>`}
];
function markSVG(k,attrs=''){const m=MARKS.find(x=>x.k===k)||MARKS[0];return `<svg viewBox="0 0 200 200" ${attrs}>${m.s()}</svg>`;}
