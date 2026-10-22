import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'dist';
const file = join(dir, 'index.html');
let html = readFileSync(file, 'utf8');
const oldTitle = /<title>God's Eye View<\/title>/;
if (!oldTitle.test(html)) throw new Error('Expected source title not found');
html = html.replace(oldTitle, '<title>Horizon Aerial &amp; Video | An AeroVista Division</title>');
html = html.replace(/<meta name="apple-mobile-web-app-title" content="God's Eye"\s*\/>/, '<meta name="apple-mobile-web-app-title" content="Horizon Aerial" />');
html = html.replace(/<h1><span class="title-logo brand-logo"[\s\S]*?<\/h1>/, '<h1 class="horizon-identity"><img class="horizon-logo" src="/gods-eye-view/horizon-mark.svg" alt="" /><span class="horizon-name"><strong>HORIZON</strong><small>AERIAL &amp; VIDEO</small></span></h1>');
html = html.replace(/<p class="subtitle"[^>]*>[\s\S]*?<\/p>/, '<p class="subtitle horizon-subtitle">AN AEROVISTA DIVISION <span aria-hidden="true">·</span> SPATIAL INTELLIGENCE</p>');
html = html.replace(/<\/head>/, '  <meta name="description" content="Horizon Aerial & Video | An AeroVista Division. Explore the world with an interactive spatial intelligence globe." />\n  <link rel="icon" type="image/svg+xml" href="/gods-eye-view/horizon-mark.svg" />\n  <link rel="stylesheet" href="/gods-eye-view/horizon-brand.css" />\n</head>');
writeFileSync(file, html);
writeFileSync(join(dir, 'horizon-brand.css'), `
:root { --horizon-ink:#10130f; --horizon-gold:#d1ae70; --horizon-ivory:#f1efe8; }
#title-bar .horizon-identity {display:flex;align-items:center;gap:12px;margin:0;color:var(--horizon-ivory);font-family:Inter,system-ui,sans-serif;letter-spacing:.14em;line-height:1.08}
#title-bar .horizon-logo {width:43px;height:43px;object-fit:contain;flex:none;filter:drop-shadow(0 0 10px rgba(209,174,112,.28))}
#title-bar .horizon-name {display:flex;flex-direction:column;gap:3px}
#title-bar .horizon-name strong {font-size:clamp(17px,2vw,26px);font-weight:650;letter-spacing:.22em}
#title-bar .horizon-name small {color:var(--horizon-gold);font-size:10px;letter-spacing:.24em;font-weight:600}
#title-bar .horizon-subtitle {color:#d0c3a8;letter-spacing:.15em;font-size:10px}
#title-bar .title-glow {background:radial-gradient(ellipse at center,rgba(209,174,112,.14),transparent 70%)}
@media(max-width:600px){#title-bar .horizon-logo{width:32px;height:32px}#title-bar .horizon-name strong{font-size:16px}#title-bar .horizon-name small{font-size:8px}#title-bar .horizon-subtitle{font-size:8px}}
`);
writeFileSync(join(dir,'horizon-mark.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="night" x1="8" y1="4" x2="58" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#252a24"/><stop offset="1" stop-color="#10130f"/></linearGradient><linearGradient id="sun" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ead5a4"/><stop offset="1" stop-color="#b78b4c"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="13" fill="url(#night)"/><rect x="2.75" y="2.75" width="58.5" height="58.5" rx="12.25" fill="none" stroke="#f1efe8" stroke-opacity=".18" stroke-width="1.5"/><circle cx="45.5" cy="18.5" r="5.5" fill="url(#sun)"/><g fill="none" stroke="#f1efe8" stroke-linecap="round"><path d="M10 35.5C20.5 31.4 31.8 29 54 26" stroke-width="2.4"/><path d="M10 43.5C22.5 38.8 35.7 36.2 54 33.5" stroke-width="2.1" stroke-opacity=".82"/><path d="M10 51.5C23.2 46.8 37.2 44.2 54 41.5" stroke-width="1.8" stroke-opacity=".62"/></g></svg>`);
const manifestPath=join(dir,'manifest.webmanifest');
const manifest=JSON.parse(readFileSync(manifestPath,'utf8'));
manifest.name='Horizon Aerial & Video | An AeroVista Division';
manifest.short_name='Horizon Aerial';
manifest.description='Interactive spatial intelligence powered by God’s Eye View.';
manifest.icons=[{src:'horizon-mark.svg',sizes:'any',type:'image/svg+xml',purpose:'any'}];
writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log('Horizon Pages branding complete');
