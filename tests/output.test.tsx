import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const base=process.env.SITE_BASE || '/';
const built=existsSync('dist/index.html');
function files(dir:string):string[]{return readdirSync(dir).flatMap(f=>statSync(join(dir,f)).isDirectory()?files(join(dir,f)):[join(dir,f)]);}
test('todos os links internos e recursos do HTML gerado existem', {skip:!built},()=>{for(const f of files('dist').filter(f=>f.endsWith('.html'))){const html=readFileSync(f,'utf8');for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){const url=match[1];if(/^(https?:|data:|mailto:)/.test(url))continue;assert.ok(url.startsWith(base),`${f}: caminho fora da base: ${url}`);const target=join('dist',decodeURIComponent(url.slice(base.length)));assert.ok(existsSync(target),`${f}: recurso ausente: ${url}`);if(statSync(target).isDirectory())assert.ok(existsSync(join(target,'index.html')),`${f}: índice ausente: ${url}`)}}});
test('HTML de cada serviço contém conteúdo, título e Open Graph próprios',{skip:!built},()=>{for(const dir of readdirSync('dist/servicos')){const html=readFileSync(`dist/servicos/${dir}/index.html`,'utf8');assert.match(html,/<h1>/);assert.match(html,/property="og:title"/);assert.match(html,/name="description"/);assert.match(html,/application\/ld\+json/);assert.ok(!html.includes('<!--app-->'))}assert.ok(existsSync('dist/404.html'));assert.ok(existsSync('dist/robots.txt'));assert.ok(existsSync('dist/sitemap.xml'))});
