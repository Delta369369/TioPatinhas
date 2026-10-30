Add-Type -AssemblyName System.Drawing
$out=Join-Path $PWD 'artifacts/instagram'
New-Item -ItemType Directory -Force $out | Out-Null
function Brush($hex){return [Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml($hex))}
function Text($g,$text,$size,$x,$y,$width,$height,$color='#FFFFFF',$bold=$true){
 $style=if($bold){[Drawing.FontStyle]::Bold}else{[Drawing.FontStyle]::Regular}
 $font=[Drawing.Font]::new('Arial',$size,$style,[Drawing.GraphicsUnit]::Pixel)
 $brush=Brush $color
 $g.DrawString($text,$font,$brush,[Drawing.RectangleF]::new($x,$y,$width,$height));$font.Dispose();$brush.Dispose()
}
function Center($g,$text,$size,$y,$height,$color='#FFFFFF'){$font=[Drawing.Font]::new('Arial',$size,[Drawing.FontStyle]::Bold,[Drawing.GraphicsUnit]::Pixel);$brush=Brush $color;$fmt=[Drawing.StringFormat]::new();$fmt.Alignment=[Drawing.StringAlignment]::Center;$g.DrawString($text,$font,$brush,[Drawing.RectangleF]::new(0,$y,1080,$height),$fmt);$fmt.Dispose();$brush.Dispose();$font.Dispose()}
function Canvas($height){$b=[Drawing.Bitmap]::new(1080,$height);$g=[Drawing.Graphics]::FromImage($b);$g.SmoothingMode='AntiAlias';$g.TextRenderingHint='AntiAliasGridFit';$g.Clear([Drawing.ColorTranslator]::FromHtml('#0D0D18'));return @($b,$g)}
function Finish($b,$g,$name){$b.Save((Join-Path $out $name),[Drawing.Imaging.ImageFormat]::Png);$g.Dispose();$b.Dispose()}
$posts=@(
 @('01-lancamento','SEU NEGÓCIO MERECE CHAMAR ATENÇÃO.','Artes, fotos, sites e presença digital para pequenos negócios.','Peça seu orçamento no Direct.',''),
 @('02-como-pedir','UMA BOA CAMPANHA COMEÇA COM SUA IDEIA.','1. Envie fotos e sua oferta.`n2. Aprove escopo, valor e prazo.`n3. Confira a criação e os ajustes.','Conte o que seu negócio precisa.',''),
 @('03-artes','SUA OFERTA. COM MAIS PRESENÇA.','Uma campanha profissional, adaptada para feed e Stories.','Envie 1 ou 2 fotos. Avaliamos seu material.','campanha-barbearia.jpg'),
 @('04-fotos','DÊ DESTAQUE AO QUE VOCÊ VENDE.','Fotos comerciais para produtos, alimentos e catálogos.','Seu produto inspira a criação.','pizza-comercial.jpg'),
 @('05-sites','UM ENDEREÇO À ALTURA DO SEU NEGÓCIO.','Sites, cardápios e catálogos que funcionam no celular.','Apresente. Informe. Facilite o contato.',''),
 @('06-presenca','SEU NEGÓCIO ESTÁ FÁCIL DE ENCONTRAR?','Diagnóstico e melhorias para Google e buscas com IA.','Sem garantia de posição ou inclusão.',''),
 @('07-videos','SUA PROMOÇÃO EM MOVIMENTO.','Vídeos curtos comerciais para Reels e Stories.','EM PREPARAÇÃO • consulte disponibilidade.','')
)
foreach($p in $posts){
 $c=Canvas 1350;$b=$c[0];$g=$c[1]
 $accent=Brush '#A78BFA';$g.FillRectangle($accent,72,65,100,9);$accent.Dispose()
 Text $g 'IA FÁCIL / ESTÚDIO CRIATIVO' 25 72 105 940 55 '#B9A4ED'
 Text $g $p[1] 79 68 195 945 360
 Text $g ($p[2].Replace('`n',"`n")) 33 75 570 920 185 '#D5D2E2' $false
 if($p[4]){$img=[Drawing.Image]::FromFile((Join-Path $PWD ('public/assets/'+$p[4])));$src=if($p[4] -like '*barbearia*'){[Drawing.Rectangle]::new(0,450,$img.Width,650)}else{[Drawing.Rectangle]::new(0,0,$img.Width,$img.Height)};$ratio=930.0/325.0; $sw=$src.Width; $sh=$sw/$ratio; if($sh -gt $src.Height){$sh=$src.Height;$sw=$sh*$ratio}; $src=[Drawing.Rectangle]::new([int](($img.Width-$sw)/2),[int]($src.Y+($src.Height-$sh)/2),[int]$sw,[int]$sh);$g.DrawImage($img,[Drawing.Rectangle]::new(75,770,930,325),$src,[Drawing.GraphicsUnit]::Pixel);$img.Dispose()}
 else{$violet=Brush '#25223E';$g.FillRectangle($violet,75,790,930,280);$violet.Dispose();Text $g 'CRIATIVIDADE COM DIREÇÃO.' 53 115 845 850 150 '#B9A4ED';Text $g 'Seu objetivo guia cada projeto.' 28 115 1000 830 60 '#D5D2E2' $false}
 Text $g $p[3] 26 75 1135 930 90 '#B9A4ED'
 Text $g '@isabela_guardian • Orçamentos no Direct' 25 75 1240 930 48
 Text $g 'CONCEITO DEMONSTRATIVO • ISA É PERSONAGEM VIRTUAL' 17 75 1300 940 35 '#9390A6' $false
 Finish $b $g ($p[0]+'.png')
}
$highlights=@(@('servicos','SERVIÇOS','✦'),@('portfolio','PORTFÓLIO','01'),@('como-pedir','COMO PEDIR','02'),@('duvidas','DÚVIDAS','?'),@('sobre-a-isa','SOBRE A ISA','IA'))
foreach($h in $highlights){$c=Canvas 1080;$b=$c[0];$g=$c[1];$pen=[Drawing.Pen]::new([Drawing.ColorTranslator]::FromHtml('#A78BFA'),8);$g.DrawEllipse($pen,210,210,660,660);$pen.Dispose();Center $g $h[2] 190 325 260 '#B9A4ED';Center $g $h[1] 40 625 80;Center $g 'IA FÁCIL' 27 748 50 '#9390A6';Finish $b $g ('destaque-'+$h[0]+'.png')}
$stories=@(@('servicos','CINCO FORMAS DE VALORIZAR SEU NEGÓCIO.','Artes e kits de divulgação`nFotos comerciais`nSites e cardápios`nPresença digital`nVídeos em preparação'),@('portfolio','IMAGINE SUA MARCA AQUI.','Explore nossos conceitos de barbearia e gastronomia. Exemplos fictícios, criados com IA.'),@('como-pedir','DO PRIMEIRO OI À SUA CAMPANHA.','Envie fotos e objetivo.`nAlinhamos escopo, valor e prazo.`nVocê confere e solicita os ajustes previstos.'),@('duvidas','O QUE VOCÊ PRECISA SABER.','Projetos sob orçamento.`nPrazo combinado antes de começar.`nMateriais com autorização de uso.`nUma rodada de ajustes no escopo inicial.'),@('sobre-a-isa','PRAZER, ISA GUARDIÃ.','Sou a personagem virtual da IA Fácil, criada com inteligência artificial. O atendimento e a execução são feitos pela equipe responsável.'))
foreach($p in $stories){$c=Canvas 1920;$b=$c[0];$g=$c[1];Text $g ('IA FÁCIL / '+$p[0].ToUpper()) 27 85 200 920 80 '#B9A4ED';Text $g $p[1] 86 80 390 920 490;Text $g ($p[2].Replace('`n',"`n")) 39 85 985 910 520 '#D5D2E2' $false;Text $g 'FALE COM A GENTE NO DIRECT' 31 85 1600 920 70 '#B9A4ED';Text $g '@isabela_guardian' 34 85 1690 920 70;Finish $b $g ('story-'+$p[0]+'.png')}
