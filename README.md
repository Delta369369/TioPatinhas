# TioPatinhas — vitrine de serviços com IA

Primeira versão estática em **pt-BR**, com nome comercial provisório **Lumia Studio**. React, Vite, TypeScript, Tailwind CSS, Lucide e React Router. Não exige backend, APIs pagas, cadastro ou banco de dados.

## Visualizar e executar

Na pasta `C:\Users\Victor_Delta\Downloads\CODEX\TioPatinhas`, abra um terminal. Requer Node.js 24 e pnpm 11 (se necessário, instale com `npm install -g pnpm@11.25.0`).

1. Execute `pnpm install --frozen-lockfile` e depois `pnpm dev`.
2. Abra o endereço local exibido no terminal, normalmente `http://127.0.0.1:5173/`.

Para validar a produção: `pnpm test`, `pnpm build`, `pnpm test:output` e `pnpm preview`. Abra a URL exibida pelo preview. Não abra o HTML com duplo clique: o site precisa de um servidor HTTP.

## Conteúdo entregue

- Página inicial com cinco cards compactos, seção de processo, benefícios e perguntas frequentes.
- Cinco páginas de serviços com demonstrações, materiais necessários, pacotes, prazos, revisões, perguntas frequentes e serviços relacionados.
- Menu móvel, links de navegação, comparador acessível por teclado, preferência por movimento reduzido e página 404.
- Atendimento pelo WhatsApp com mensagem específica para serviço e pacote. Número vazio exibe aviso de configuração, sem abrir telefone inventado.
- Páginas Sobre, Privacidade e Termos com informação transparente sobre a operação ainda em preparação.
- HTML gerado por rota com conteúdo e metadados individuais, Open Graph, JSON-LD WebSite, robots.txt e sitemap (URLs públicas exigem SITE_URL).
- Testes de regras comerciais, WhatsApp, renderização das rotas e verificação de links e assets do build.

## Alterar nome, contato e informações comerciais

Em **`src/config/store.ts`**, altere `name`, `tagline`, `whatsapp` e, opcionalmente, `url`. O nome alimenta a navegação, rodapé e metadados. WhatsApp deve conter somente dígitos no formato `55` + DDD + número, por exemplo um valor seu com 12 ou 13 dígitos. Nenhum número de exemplo é usado como canal ativo. Não inclua tokens ou segredos nesses arquivos públicos.

Em **`src/data/services.ts`**, cada serviço concentra descrição, aplicações, materiais, observações, perguntas e `packages`. Cada pacote possui `name`, `price` (número, em reais), `quantity`, `delivery`, `revisions` e `active`. Use `active: false` para desativá-lo; mantenha ao menos um pacote ativo por serviço. O preço inicial é o menor valor entre os pacotes ativos.

Os preços e prazos são provisórios. Confirme os valores, condições, identidade comercial e canal de privacidade antes de operar. Ajuste o texto de `src/pages/Institutional.tsx` às práticas reais de tratamento de materiais, exclusão, cancelamento e licenciamento. As páginas institucionais não substituem a definição dessas práticas.

## Imagens, vídeos e exemplos

Os arquivos ficam em **`public/assets/`**, servidos localmente sem dependência de bancos de imagens externos. `produto.webp` e `retrato.webp` foram gerados com a ferramenta integrada Imagegen e retratam produto e pessoa fictícios. Os prompts estão em `docs/ASSETS.md`. `produto-base.svg` é uma ilustração feita em código; seu comparador é uma simulação, não uma evidência de edição real. Os modelos de currículo e transcrição têm dados fictícios. O vídeo é um storyboard: nenhum player vazio ou vídeo de terceiros é apresentado como trabalho realizado.

Para trocar uma imagem, coloque o arquivo autorizado em `public/assets/` e ajuste `image` e `alt` em `src/data/services.ts`. Para substituir o par do comparador, edite as fontes em `Compare`, em `src/pages/ServicePage.tsx`, usando fotos do mesmo produto e atualizando a identificação da demonstração. Prefira WebP otimizado. Mantenha crédito e licença quando aplicáveis. A imagem de compartilhamento é `compartilhamento.png` (1200 × 630).

Para vídeos reais, coloque o MP4 autorizado nessa pasta e substitua o storyboard da página correspondente por `<video controls preload="metadata" poster="...">`. Use legendas com `<track>` e transcrição quando houver fala. Publique somente trabalhos próprios ou autorizados.

Para adicionar um serviço, inclua um objeto em `services` com slug único, conteúdo, imagem e pacotes. Catálogo, rota, sugestões, HTML estático e sitemap são gerados a partir dos dados. Ajuste o teste que exige cinco serviços quando ampliar o catálogo.

## Arquitetura e SEO

`src/components` contém componentes compartilhados; `src/pages`, páginas; `src/data`, catálogo; `src/config`, loja; `src/utils`, contato e metadados. `scripts/prerender.tsx` renderiza React no build, gravando `dist/servicos/<slug>/index.html` e páginas institucionais. React hidrata esse HTML no navegador e usa BrowserRouter para navegação. As páginas internas funcionam sem depender de fallback SPA para acesso direto ou atualização. Rotas inexistentes usam `404.html` (o provedor deve preservar o status HTTP 404).

`SITE_BASE` deve começar e terminar com `/`. Use `/` para domínio próprio ou hospedagem na raiz e `/TioPatinhas/` para uma página de projeto no Pages. `SITE_URL` é a URL pública completa sem barra final, incluindo a pasta, por exemplo `https://delta369369.github.io/TioPatinhas`. Não cadastre URL de um site que ainda não esteja ativo como se fosse uma publicação confirmada. Sem essa configuração, o build omite URLs canônicas e imagens OG absolutas e gera sitemap vazio, evitando inventar um domínio.

Exemplo em PowerShell para testar a base do repositório:

```powershell
$env:SITE_BASE = '/TioPatinhas/'
$env:SITE_URL = 'https://delta369369.github.io/TioPatinhas'
pnpm build
pnpm test:output
pnpm preview
```

Abra o caminho `/TioPatinhas/` no endereço do preview. Para voltar à raiz local, remova essas duas variáveis da sessão e rode o build novamente. Em shell Linux, use `SITE_BASE=/TioPatinhas/ SITE_URL=https://delta369369.github.io/TioPatinhas pnpm build`.

## GitHub e publicação

Repositório solicitado: `https://github.com/Delta369369/TioPatinhas`. O código-fonte fica na branch `main`; `dist` e `node_modules` não são versionados. `.github/workflows/ci.yml` verifica instalação, testes, build e links a cada push/PR. A publicação em `.github/workflows/pages.yml` é **manual**, via `workflow_dispatch`.

**Limitação de hospedagem:** a documentação do GitHub Pages restringe o uso como hospedagem gratuita de negócios online, ecommerce e sites voltados principalmente a facilitar transações comerciais. Esta vitrine tem intenção comercial mesmo com contratação externa. O workflow é uma preparação técnica, não uma confirmação de que o uso atende às regras. Antes de ativá-lo, avalie a adequação ao Pages; para operação comercial, escolha uma hospedagem estática que permita esse uso, mantendo o código no GitHub. Fonte: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

Se o uso pretendido for adequado às regras do Pages:

1. No repositório, abra **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Abra **Actions → Publicar manualmente no GitHub Pages → Run workflow**, na branch `main`. Após sucesso, consulte o endereço retornado pelo job. O endereço esperado é `https://delta369369.github.io/TioPatinhas/`; só considere publicado após o deployment concluir.

Para outra hospedagem estática compatível, use comando de build `pnpm build`, pasta de saída `dist`, `SITE_BASE=/` e `SITE_URL` com a URL pública real. O site não depende de serviços específicos do GitHub.

## Validação e limites

Os testes verificam dados, WhatsApp e renderização React. Após build, `pnpm test:output` verifica destinos de links locais e recursos, páginas exclusivas e metadados. A matriz deve ser executada com base `/` e `/TioPatinhas/`. A inspeção visual e os testes interativos no navegador ainda devem ser concluídos: a automação de navegador desta sessão foi bloqueada pela política de URLs do Firefox. Não foram feitos testes reais de pagamento ou envio de WhatsApp, pois não há checkout nem número configurado.

## Antes de abrir para clientes

Defina o nome definitivo, WhatsApp, preços, prazos, condições e identificação comercial; substitua demonstrações pelo portfólio autorizado desejado; escolha hospedagem compatível e configure a URL real. Não há custos de APIs obrigatórias. Domínio próprio, contratação de terceiros e serviços de hospedagem dependem das suas escolhas e não foram adquiridos.

Próximos caminhos: revisar a identidade visual; cadastrar WhatsApp e condições comerciais; concluir hospedagem e domínio.
