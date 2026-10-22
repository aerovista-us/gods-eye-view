import {readFileSync,writeFileSync,appendFileSync} from 'node:fs';
import {join} from 'node:path';

const root='dist';
const page=join(root,'index.html');
let html=readFileSync(page,'utf8');
const splash=/<div id="loading-screen">[\s\S]*?<\/div>\s*<\/div>/;
if(!splash.test(html))throw new Error('Loading screen markup not found: upstream may have changed');
html=html.replace(splash,`<div id="loading-screen">
  <div class="loader-content horizon-splash">
    <div class="horizon-splash-kicker">HORIZON / SPATIAL INTELLIGENCE</div>
    <img class="horizon-splash-emblem" src="/gods-eye-view/horizon-mark.svg" alt="" />
    <h2 class="horizon-splash-title">HORIZON</h2>
    <p class="horizon-splash-subtitle">AERIAL &amp; VIDEO <span aria-hidden="true">/</span> AN AEROVISTA DIVISION</p>
    <div class="horizon-splash-rule" aria-hidden="true"><span></span></div>
    <p class="loader-status" role="status" aria-live="polite">Preparing your spatial workspace…</p>
    <p class="horizon-engine-credit">Spatial engine: God's Eye View · Open-source project by Bilawal Sidhu</p>
  </div>
</div>`);
html=html.replace(/<span class="first-run-kicker"[^>]*>.*?<\/span>/,'<span class="first-run-kicker">HORIZON / MISSION SELECTION</span>');
html=html.replace(/<h2 id="first-run-title"[^>]*>.*?<\/h2>/,'<h2 id="first-run-title">Explore the world from a new perspective</h2>');
html=html.replace(/<p id="first-run-description"[^>]*>.*?<\/p>/,'<p id="first-run-description">Choose a view to explore public signals across Earth. Data availability varies by source.</p>');
html=html.replace(/<span class="key-setup-kicker"[^>]*>.*?<\/span>/,'<span class="key-setup-kicker">HORIZON / SOURCE CONFIGURATION</span>');
html=html.replace('</head>','  <link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Orbitron:wght@700&display=swap" rel="stylesheet" />\n</head>');
writeFileSync(page,html);
appendFileSync(join(root,'horizon-brand.css'),`
/* Horizon operator-grade global visual system, Pages-only. */
:root {--hz-bg:#0f1115;--hz-panel:#171b20;--hz-panel2:#222831;--hz-border:rgba(192,200,211,.22);--hz-text:#e8edf2;--hz-muted:#aebcc8;--hz-signal:#00aeef;--hz-sky:#87ceeb;--hz-gold:#d1ae70}
html,body {color:var(--hz-text);font-family:Montserrat,Inter,system-ui,sans-serif}
body{background:var(--hz-bg)}
#loading-screen {background:radial-gradient(ellipse at 50% 40%,#1d2d34 0%,#12191d 42%,#0f1115 83%)!important;color:var(--hz-text)}
#loading-screen::before {content:"";position:absolute;inset:0;pointer-events:none;opacity:.12;background-image:linear-gradient(rgba(135,206,235,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(135,206,235,.2) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(to bottom,transparent,#000 40%,transparent)}
#loading-screen .horizon-splash {position:relative;display:flex;align-items:center;flex-direction:column;gap:12px;max-width:min(90vw,580px);padding:30px;text-align:center}
.horizon-splash-kicker {font:600 11px/1.5 Montserrat,system-ui,sans-serif;letter-spacing:.27em;color:var(--hz-sky)}
.horizon-splash-emblem {width:82px;height:82px;margin-top:20px;filter:drop-shadow(0 8px 30px rgba(0,174,239,.11))}
#loading-screen .horizon-splash-title {margin:0;color:var(--hz-text);font:700 clamp(27px,5vw,48px)/1.05 Orbitron,Montserrat,sans-serif;letter-spacing:.17em}
.horizon-splash-subtitle {font:600 11px/1.6 Montserrat,sans-serif;letter-spacing:.15em;color:var(--hz-gold)}
.horizon-splash-subtitle span {padding:0 9px;color:var(--hz-muted)}
.horizon-splash-rule {height:2px;width:min(80%,300px);background:rgba(192,192,192,.24);overflow:hidden;margin:12px auto}
.horizon-splash-rule span {display:block;height:100%;width:33%;background:var(--hz-signal);box-shadow:0 0 12px var(--hz-signal);animation:horizon-sweep 2.5s ease-in-out infinite alternate}
@keyframes horizon-sweep {from{transform:translateX(-100%)}to{transform:translateX(310%)}}
#loading-screen .loader-status {color:var(--hz-text);font-size:13px;line-height:1.5}
.horizon-engine-credit {font:400 10px/1.7 Montserrat,system-ui,sans-serif;color:var(--hz-muted);max-width:320px}
#title-bar .horizon-name strong {font-family:Orbitron,Montserrat,sans-serif;letter-spacing:.16em}
:is(#first-run-launcher,#key-setup,.panel-inner,.dock-popover-content,#control-panel-popover) {color:var(--hz-text);border-color:var(--hz-border)}
:is(#first-run-launcher,#key-setup) {background:linear-gradient(160deg,rgba(30,39,46,.98),rgba(15,17,21,.98));border:1px solid var(--hz-border);box-shadow:0 22px 70px rgba(0,0,0,.5)}
:is(#first-run-launcher,#key-setup) :is(h2,strong) {color:var(--hz-text)}
:is(#first-run-launcher,#key-setup) :is(p,small) {line-height:1.55}
:is(#first-run-launcher,#key-setup) :is(.first-run-kicker,.key-setup-kicker){color:var(--hz-sky);letter-spacing:.16em}
#first-run-launcher .first-run-choices button {border-color:var(--hz-border);background:rgba(24,35,43,.75);transition:background .15s,border-color .15s,transform .15s}
#first-run-launcher .first-run-choices button:hover {background:rgba(34,56,68,.9);border-color:var(--hz-sky);transform:translateY(-1px)}
:is(.style-btn,.dock-tray-toggle,#top-center-actions button,#command-dock button,#first-run-launcher button,#key-setup button):focus-visible {outline:2px solid var(--hz-sky)!important;outline-offset:3px}
:is(.style-btn,.dock-tray-toggle,#top-center-actions button,#command-dock button) {transition:border-color .16s ease,background .16s ease,color .16s ease}
:is(.style-btn.active,.style-btn[aria-pressed="true"]) {border-color:var(--hz-signal)!important}
#top-center-actions {border-color:var(--hz-border)}
#command-dock {color:var(--hz-text)}
:is(#global-loading-status,#toast,#style-indicator,#traffic-sync-chip,#cctv-sync-chip){backdrop-filter:blur(12px)}
:is(#first-run-launcher,#key-setup) [hidden] {display:none!important}
@media(max-width:700px){#loading-screen .horizon-splash{padding:18px}.horizon-splash-kicker{letter-spacing:.13em;font-size:10px}.horizon-splash-subtitle{font-size:9px;letter-spacing:.09em}#first-run-launcher{max-width:calc(100vw - 24px);max-height:calc(100dvh - 28px);overflow:auto}}
@media(prefers-reduced-motion:reduce){.horizon-splash-rule span{animation:none;transform:none!important}#first-run-launcher .first-run-choices button{transition:none}}
`);
console.log('Horizon UI pass applied: splash, mission launcher, provider dialog, menus, dock, states, mobile.');
