import { ArrowDown, ArrowUpRight, Sparkles, CheckCircle2, SlidersHorizontal, WandSparkles, Camera, Play, ArrowRight, Instagram } from 'lucide-react';
import { services } from '../data/services';
import { store } from '../config/store';
import { Artwork, Contact, FAQ, ServiceCard, Steps, asset } from '../components/UI';
import { Link } from 'react-router-dom';

export default function Home() {
 return <>
  <section className="container hero hero-isa">
   <div className="hero-copy">
    <span className="eyebrow"><span className="status-dot"/> ESTÚDIO CRIATIVO · POR ISA GUARDIÃ</span>
    <h1>Sua ideia.<br/>Uma nova<br/><span>versão de impacto.</span></h1>
    <p>Fotos que valorizam. Vídeos que apresentam. Documentos que simplificam. Serviços criativos com IA para sua marca, sua carreira e seu dia a dia.</p>
    <div className="hero-actions"><a className="button" href="#servicos">Explore os serviços <ArrowUpRight size={19}/></a><a className="text-button" href="#portfolio">Veja as possibilidades <ArrowRight size={16}/></a></div>
    <div className="hero-notes"><span><CheckCircle2 size={15}/> Projetos sob medida</span><span><CheckCircle2 size={15}/> Preços em reais</span></div>
   </div>
   <div className="isa-composition">
    <div className="isa-orbit" aria-hidden="true"/>
    <span className="studio-word" aria-hidden="true">CRIAR.</span>
    <div className="isa-portrait"><img src={asset('isa-perfil.webp')} alt="Isa Guardiã, personagem virtual criada com inteligência artificial" width="1000" height="1000" fetchPriority="high"/></div>
    <div className="floating-service floating-photo"><span><Camera size={19}/></span><div><small>UM NOVO OLHAR</small><strong>Fotos profissionais</strong></div><ArrowUpRight size={15}/></div>
    <div className="floating-service floating-video"><span><Play size={18}/></span><div><small>DA IDEIA AO FEED</small><strong>Conteúdo com presença</strong></div></div>
    <div className="isa-signature"><span>Isa Guardiã</span><small>PERSONAGEM VIRTUAL · CRIADA COM IA</small></div>
   </div>
  </section>
  <div className="container disciplines"><span>CRIE PARA O SEU PRÓXIMO PASSO</span><b>Sua marca</b><i>✦</i><b>Sua carreira</b><i>✦</i><b>Seu conteúdo</b><a href="#servicos" aria-label="Ir para serviços"><ArrowDown size={19}/></a></div>
  <section id="servicos" className="container section">
   <div className="section-heading"><div><span className="eyebrow">CRIATIVIDADE QUE RESOLVE</span><h2>Um serviço.<br/>Muitas possibilidades.</h2></div><p>Escolha o que você precisa.<br/>A gente ajuda a dar forma.</p></div>
   <div className="services-grid">{services.map(s=><ServiceCard key={s.slug} service={s}/>)}<div className="custom-card"><span className="custom-icon"><WandSparkles size={27}/></span><small>DO SEU JEITO</small><h3>Boas ideias não<br/>cabem numa caixa.</h3><p>Tem um projeto diferente? Conte o que você imaginou e vamos avaliar as possibilidades.</p><Contact label="Conversar sobre minha ideia" className="text-button"/></div></div>
   {store.provisionalPrices&&<p className="pricing-note">Valores iniciais e prazos provisórios, sujeitos à confirmação do escopo. Demonstrações identificadas; sem resultados garantidos.</p>}
  </section>
  <section id="portfolio" className="portfolio-section"><div className="container section">
   <div className="section-heading"><div><span className="eyebrow">O VISUAL FAZ PARTE DA HISTÓRIA</span><h2>Da presença profissional<br/>ao universo da sua marca.</h2></div><p>Explore direções visuais.<br/>Imagine a sua próxima.</p></div>
   <div className="editorial-grid">
    <Link to="/servicos/fotos-profissionais/" className="editorial-item editorial-persona"><img src={asset('isa-perfil.webp')} alt="Retrato de Isa Guardiã, personagem virtual" width="1000" height="1000" loading="lazy"/><div><span>01 / PRESENÇA PROFISSIONAL</span><h3>Um perfil com personalidade.</h3><ArrowUpRight/></div></Link>
    <Link to="/servicos/fotos-comerciais/" className="editorial-item editorial-product"><Artwork service={services[0]}/><div><span>02 / FOTOGRAFIA DE PRODUTO</span><h3>Seu produto, em cena.</h3><ArrowUpRight/></div></Link>
    <Link to="/servicos/fotos-profissionais/" className="editorial-item editorial-lifestyle"><img src={asset('isa-lifestyle.webp')} alt="Cena social demonstrativa de Isa Guardiã, personagem virtual, com outras personagens" width="900" height="1600" loading="lazy"/><div><span>03 / NARRATIVAS VISUAIS</span><h3>Mais de um jeito de se apresentar.</h3><ArrowUpRight/></div></Link>
   </div>
   <p className="pricing-note">Isa Guardiã é uma personagem virtual criada com IA. Imagens demonstrativas fornecidas para a marca; não são clientes, depoimentos ou provas de resultados.</p>
  </div></section>
  <section className="process-section" id="como-funciona"><div className="container section"><span className="eyebrow">IDEIA BOA, PROCESSO SIMPLES</span><h2>Da sua mensagem<br/>à próxima versão.</h2><Steps/></div></section>
  <section className="container section benefits"><div><span className="eyebrow">TECNOLOGIA COM INTENÇÃO</span><h2>As ferramentas evoluem.<br/>O seu objetivo guia a criação.</h2><p>Você traz a ideia. Nós alinhamos a direção, o formato e os detalhes. A IA entra no processo como ferramenta, com revisão do conteúdo antes da entrega.</p><a href={store.instagram} target="_blank" rel="noopener noreferrer" className="text-button"><Instagram size={17}/> Acompanhe {store.instagramHandle} <ArrowUpRight size={16}/></a></div><div>{[[Sparkles,'Visual pensado para você','Uma direção criativa alinhada à sua marca e ao seu contexto.'],[SlidersHorizontal,'Clareza em cada etapa','Escopo, prazo e revisões combinados antes de começar.'],[CheckCircle2,'Uma conversa de verdade','Isa apresenta a marca. O atendimento e a execução são conduzidos pela equipe responsável.']].map(([Icon,title,description])=>{const I=Icon as typeof Sparkles;return <article key={String(title)}><I size={23}/><div><h3>{String(title)}</h3><p>{String(description)}</p></div></article>})}</div></section>
  <section className="container section faq-section"><div><span className="eyebrow">SEM DÚVIDAS NO CAMINHO</span><h2>Antes do primeiro oi.</h2><p>Entenda como podemos criar juntos.</p></div><FAQ items={[["Como faço para contratar?","Escolha um serviço e um pacote. Envie uma mensagem ao perfil @isabela_guardian no Instagram com seu pedido. Alinhamos escopo, materiais, valor e prazo antes de começar."],["Quem é Isa Guardiã?","Isa é a personagem virtual da IA Fácil, criada com inteligência artificial. Ela representa a identidade visual da marca; não é uma pessoa real nem um depoimento de cliente."],["O site cria os arquivos automaticamente?","Não. Esta é uma vitrine de serviços realizados externamente. As ferramentas de IA apoiam a criação e a revisão do trabalho."],["Como funcionam as revisões?","Cada pacote indica a quantidade de revisões. Mudanças de escopo ou materiais adicionais podem exigir um novo orçamento."],["Os exemplos são resultados garantidos?","Não. As imagens são demonstrações criativas. O resultado depende dos materiais fornecidos e da viabilidade de cada projeto."]]} /></section>
 </>;
}
