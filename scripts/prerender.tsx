import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { services } from '../src/data/services';
import { store } from '../src/config/store';
import { metadata } from '../src/utils/metadata';
const base=process.env.SITE_BASE || '/';
if(!base.startsWith('/')||!base.endsWith('/'))throw new Error('SITE_BASE deve começar e terminar com /.');
// SSR roda sem Vite: usa a mesma base para os recursos renderizados.
const template=await readFile('dist/index.html','utf8');
if(!template.includes('<!--app-->')||!template.includes('<!--seo-->'))throw new Error('Execute o build do Vite antes de gerar as páginas estáticas.');
const routes=['/',...services.map(s=>`/servicos/${s.slug}/`),'/sobre/','/privacidade/','/termos/','/404/'];
const site=(process.env.SITE_URL || store.url).replace(/\/$/,'');
if(site && !/^https:\/\//.test(site))throw new Error('SITE_URL deve ser uma URL HTTPS completa.');
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
for(const route of routes){const meta=metadata(route);const canonical=site?site+(route==='/'?'/':route):'';const seo=`<meta name="description" content="${escape(meta.description)}"/><meta property="og:type" content="website"/><meta property="og:locale" content="pt_BR"/><meta property="og:site_name" content="${escape(store.name)}"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/>${canonical?`<link rel="canonical" href="${escape(canonical)}"/><meta property="og:url" content="${escape(canonical)}"/><meta property="og:image" content="${escape(site+'/assets/compartilhamento.png')}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/>`:''}${route==='/404/'?'<meta name="robots" content="noindex"/>':''}`;const markup=renderToString(<MemoryRouter initialEntries={[route]}><App/></MemoryRouter>).replace(/(src|href)="\/(?!\/)([^"]*)"/g, (_, attribute, path) => `${attribute}="${base}${path}"`);const data={'@context':'https://schema.org','@type':'WebSite',name:store.name,...(site?{url:site}:{})};const html=template.replace(/<title>.*?<\/title>/,`<title>${escape(meta.title)}</title>`).replace('<!--seo-->',seo+`<script type="application/ld+json">${JSON.stringify(data).replaceAll('<','\\u003c')}</script>`).replace('<!--app-->',markup);const directory=route==='/404/'?'dist':`dist${route}`;await mkdir(directory,{recursive:true});await writeFile(route==='/404/'?'dist/404.html':`${directory}/index.html`,html);}
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${site?`Sitemap: ${site}/sitemap.xml\n`:''}`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site?routes.filter(r=>r!='/404/').map(r=>`<url><loc>${escape(site+r)}</loc></url>`).join(''):''}</urlset>`);
await writeFile('dist/.nojekyll','');
console.log(`HTML estático gerado para ${routes.length} rotas. Base: ${base}. ${site?'SEO absoluto configurado.':'Configure SITE_URL para URLs canônicas, Open Graph e sitemap público.'}`);
