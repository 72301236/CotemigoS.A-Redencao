// Conteúdo dos três eixos do LRO: cada aba troca iniciativas e indicadores.
const lroData = {
  consciencia: {
    title: "Focalizar Consciências", description: "Desenvolver uma cultura em que todos reconheçam seu papel na proteção das informações e dos serviços.", label: "CULTURA E COMPORTAMENTO",
    periods: [
      {n:"01",title:"Curto prazo",time:"0 a 3 meses",items:["Lançar campanha interna sobre segurança da informação.","Orientar equipes sobre phishing, senhas fortes e comunicação de suspeitas.","Divulgar políticas e canais para notificação de incidentes."]},
      {n:"02",title:"Médio prazo",time:"3 a 12 meses",items:["Realizar treinamentos periódicos por área.","Executar simulações de phishing e exercícios de conscientização.","Avaliar o conhecimento e reforçar os temas com maior dificuldade."]},
      {n:"03",title:"Longo prazo",time:"1 a 3 anos",items:["Incluir segurança no processo de integração de novos colaboradores.","Manter calendário permanente de campanhas e reciclagens.","Incorporar atitudes seguras às rotinas e à cultura organizacional."]}
    ], metrics:[["Colaboradores treinados","Percentual de pessoas que concluíram os treinamentos."],["Taxa de clique em phishing","Percentual de usuários que interagem com simulações fraudulentas."],["Notificações de suspeitas","Volume e qualidade dos relatos feitos pelos colaboradores."],["Incidentes por erro humano","Acompanhar a redução de ocorrências ligadas a falhas humanas."]]
  },
  talentos: {
    title: "Reforçar Talentos", description: "Desenvolver competências técnicas e de liderança para prevenir, identificar e responder às ameaças.", label: "PESSOAS E COMPETÊNCIAS",
    periods: [
      {n:"01",title:"Curto prazo",time:"0 a 3 meses",items:["Mapear competências e necessidades da equipe de TI e segurança.","Definir responsáveis, papéis e escalonamento em incidentes.","Identificar lacunas de conhecimento em gestão de riscos e resposta."]},
      {n:"02",title:"Médio prazo",time:"3 a 12 meses",items:["Oferecer cursos e treinamentos técnicos direcionados.","Realizar exercícios de mesa e simulações de incidentes.","Desenvolver liderança e integração entre TI, jurídico e comunicação."]},
      {n:"03",title:"Longo prazo",time:"1 a 3 anos",items:["Manter trilhas de capacitação e atualização profissional.","Incentivar certificações e especializações relevantes.","Fortalecer parcerias e plano de sucessão para funções críticas."]}
    ], metrics:[["Equipe capacitada","Percentual da equipe técnica que concluiu a trilha definida."],["Treinamentos realizados","Quantidade de capacitações e exercícios concluídos."],["Tempo para identificar","Tempo médio entre início do incidente e sua identificação."],["Tempo para responder","Tempo médio até contenção e início do tratamento."]]
  },
  operacoes: {
    title: "Salvaguardar Operações", description: "Proteger os ativos críticos e garantir prevenção, resposta e recuperação dos serviços essenciais.", label: "TECNOLOGIA E CONTINUIDADE",
    periods: [
      {n:"01",title:"Curto prazo",time:"0 a 3 meses",items:["Inventariar ativos críticos e classificar informações.","Revisar acessos e privilégios; habilitar MFA nos sistemas prioritários.","Verificar backups existentes e corrigir vulnerabilidades críticas."]},
      {n:"02",title:"Médio prazo",time:"3 a 12 meses",items:["Implantar monitoramento contínuo e centralização de alertas.","Formalizar e testar o plano de resposta a incidentes.","Executar testes de restauração, auditorias e avaliações de segurança."]},
      {n:"03",title:"Longo prazo",time:"1 a 3 anos",items:["Automatizar processos de detecção e resposta quando viável.","Realizar exercícios recorrentes de continuidade e recuperação de desastres.","Revisar controles, arquitetura e riscos de fornecedores continuamente."]}
    ], metrics:[["Vulnerabilidades críticas","Quantidade de vulnerabilidades críticas pendentes de correção."],["Cobertura de MFA","Percentual de contas e sistemas críticos protegidos por MFA."],["Sucesso dos backups","Percentual de rotinas concluídas e restaurações testadas."],["Disponibilidade e MTTR","Disponibilidade dos serviços e tempo médio de recuperação."]]
  }
};
const content=document.getElementById("lroContent"), metricGrid=document.getElementById("metricGrid"), tabs=[...document.querySelectorAll(".lro-tab")];
function renderLro(key){
  const data=lroData[key]; content.classList.add("switching"); metricGrid.classList.add("switching");
  window.setTimeout(()=>{
    content.innerHTML=`<div class="lro-intro"><div><h3>${data.title}</h3><p>${data.description}</p></div><span class="lro-label">${data.label}</span></div><div class="timeline">${data.periods.map(p=>`<article class="time-card"><div class="time-head"><span>${p.n}</span><div><b>${p.title}</b><small>${p.time}</small></div></div><div class="time-body"><ul>${p.items.map(i=>`<li>${i}</li>`).join("")}</ul></div></article>`).join("")}</div>`;
    metricGrid.innerHTML=data.metrics.map(([t,d])=>`<article class="metric"><strong>${t}</strong><p>${d}</p></article>`).join("");
    tabs.forEach(tab=>{const active=tab.dataset.tab===key;tab.classList.toggle("active",active);tab.setAttribute("aria-selected",String(active));});
    content.classList.remove("switching");metricGrid.classList.remove("switching");
  },100);
}
tabs.forEach(tab=>tab.addEventListener("click",()=>renderLro(tab.dataset.tab)));
renderLro("consciencia");

// QMC: conteúdo sempre visível, sem exigir clique para expandir.
document.querySelectorAll(".q-card").forEach(card=>{
  card.classList.remove("expanded");
  const head=card.querySelector(".q-head");
  if(head){head.removeAttribute("role");head.removeAttribute("tabindex");head.removeAttribute("aria-expanded");}
  card.querySelector(".q-expand-hint")?.remove();
});

// Jornada: quatro fases com narrativa, aprendizados e conexão com o plano.
const phases=[
 {name:"ILUSÕES",title:"A falsa sensação de segurança",color:"#63a8c6",text:"A Cotemigo não reconhecia adequadamente os riscos. A ausência de uma visão integrada de ameaças e ativos críticos criou uma falsa sensação de controle.",actions:["Mapear ativos e riscos","Identificar vulnerabilidades","Estabelecer governança"]},
 {name:"PERDAS",title:"As fragilidades começam a cobrar seu preço",color:"#e9b15f",text:"Falhas de prevenção, comunicação e preparação ampliaram os impactos. A organização passou a lidar com perdas operacionais, financeiras e de confiança.",actions:["Revisar controles de acesso","Testar backups","Treinar equipes"]},
 {name:"CRISE",title:"A resposta precisa ser coordenada",color:"#d87575",text:"O incidente expôs a necessidade de decisões rápidas, responsabilidades claras e comunicação estruturada. Recuperar sistemas sem preservar evidências ou avaliar impactos pode agravar o problema.",actions:["Ativar resposta a incidentes","Conter e investigar","Comunicar partes interessadas"]},
 {name:"REDENÇÃO",title:"Transformar o aprendizado em resiliência",color:"#62b99a",text:"A Cotemigo passa a tratar segurança como parte da estratégia. O QMC orienta prioridades e o LRO transforma essas prioridades em iniciativas, prazos e indicadores.",actions:["Executar o LRO","Acompanhar indicadores","Melhorar continuamente"]}
];
const phaseDetail=document.getElementById("phaseDetail");
function showPhase(index){const p=phases[index];document.querySelectorAll(".story-step").forEach((b,i)=>{b.classList.toggle("selected",i===index);b.setAttribute("aria-pressed",String(i===index));});phaseDetail.style.borderLeftColor=p.color;phaseDetail.innerHTML=`<span>FASE ${index+1} / ${p.name}</span><h3>${p.title}</h3><p>${p.text}</p><div class="phase-actions">${p.actions.map(a=>`<span>${a}</span>`).join("")}</div>`;}
document.querySelectorAll(".story-step").forEach((button,index)=>button.addEventListener("click",()=>showPhase(index)));
showPhase(0);

// Cyber Runner: jogo endless-runner de cibersegurança, integrado à landing page.
(()=>{
 const canvas=document.getElementById('runnerCanvas'); if(!canvas)return;
 const ctx=canvas.getContext('2d');
 const W=960,H=360,ground=294;
 const $=id=>document.getElementById(id);
 const overlay=$('runnerOverlay'),startBtn=$('runnerStart'),scoreEl=$('runnerScore'),shieldEl=$('runnerShield'),bestEl=$('runnerBest'),stageEl=$('runnerStage');
 let state='ready',score=0,best=0,shields=0,speed=5,frame=0,last=0,spawn=0,itemsSpawn=0,obstacles=[],items=[],particles=[],flash=0;
 try{best=Number(localStorage.getItem('cotemigoRunnerBest')||0)}catch(e){}
 bestEl.textContent=String(best).padStart(4,'0');
 const player={x:112,y:ground-48,w:38,h:48,vy:0,jumping:false,duck:false,invuln:0};
 const phases=[['ILUSÕES',0],['PERDAS',300],['CRISE',650],['REDENÇÃO',1000]];
 function phase(){let p=phases[0];for(const x of phases)if(score>=x[1])p=x;stageEl.textContent=`FASE 0${phases.indexOf(p)+1} · ${p[0]}`;}
 function reset(){score=0;shields=0;speed=5;frame=0;spawn=70;itemsSpawn=145;obstacles=[];items=[];particles=[];flash=0;player.y=ground-player.h;player.vy=0;player.jumping=false;player.duck=false;player.invuln=0;scoreEl.textContent='0000';shieldEl.textContent='0';phase();}
 function start(){reset();state='running';overlay.classList.add('is-hidden');last=performance.now();requestAnimationFrame(loop);}
 function end(){state='over';if(score>best){best=score;try{localStorage.setItem('cotemigoRunnerBest',String(best))}catch(e){}bestEl.textContent=String(best).padStart(4,'0')};$('runnerOverlayTitle').textContent=score>=1200?'MISSÃO CONCLUÍDA!':'SISTEMA COMPROMETIDO!';$('runnerOverlayText').textContent=score>=1200?'A Cotemigo superou as ameaças. Você ajudou a fortalecer a infraestrutura digital!':'A missão terminou, mas a recuperação continua. Reforce os controles e tente novamente.';$('runnerStart').innerHTML='JOGAR NOVAMENTE <span>↻</span>';overlay.classList.remove('is-hidden');}
 function jump(){if(state==='ready'){start();return}if(state!=='running')return;if(!player.jumping){player.vy=-13.2;player.jumping=true;player.duck=false;}}
 function duck(on){if(state==='running')player.duck=on&&!player.jumping;}
 startBtn.addEventListener('click',start);$('runnerJump').addEventListener('pointerdown',e=>{e.preventDefault();jump()});$('runnerDuck').addEventListener('pointerdown',e=>{e.preventDefault();duck(true)});['pointerup','pointerleave','pointercancel'].forEach(ev=>$('runnerDuck').addEventListener(ev,()=>duck(false)));
 window.addEventListener('keydown',e=>{if(['Space','ArrowUp','ArrowDown'].includes(e.code)&&document.getElementById('simulacao').getBoundingClientRect().top<innerHeight&&document.getElementById('simulacao').getBoundingClientRect().bottom>0){e.preventDefault();if(e.code==='ArrowDown')duck(true);else jump();}});
 window.addEventListener('keyup',e=>{if(e.code==='ArrowDown')duck(false)});
 function rectHit(a,b){return a.x<b.x+b.w-7&&a.x+a.w-7>b.x&&a.y<b.y+b.h-5&&a.y+a.h-4>b.y}
 function spawnObstacle(){
  // DDoS retorna como ameaça aérea: é necessário abaixar para passar sob a onda.
  const pool=['malware','phishing','ransomware','malware','phishing','ddos'];
  let type=pool[Math.floor(Math.random()*pool.length)];
  if(type==='ddos') obstacles.push({type,x:W+25,y:ground-48,w:76,h:18});
  else {let h=type==='ransomware'?57:type==='phishing'?40:44;obstacles.push({type,x:W+25,y:ground-h,w:type==='ransomware'?45:42,h});}
}
 function spawnItem(){let type=['shield','mfa','backup'][Math.floor(Math.random()*3)];items.push({type,x:W+20,y:ground-95-Math.random()*65,w:28,h:28,spin:0});}
 function particle(x,y,color){for(let i=0;i<7;i++)particles.push({x,y,vx:(Math.random()-.5)*4,vy:(Math.random()-.8)*4,life:28,color});}
 function update(){frame++;score+=.12;speed=Math.min(8.2,4.6+score/520);if(frame>spawn){spawnObstacle();spawn=frame+Math.max(76,142-Math.random()*28-score*.012)}if(frame>itemsSpawn){spawnItem();itemsSpawn=frame+180+Math.random()*100}player.vy+=.62;player.y+=player.vy;if(player.y>=ground-player.h){player.y=ground-player.h;player.vy=0;player.jumping=false}if(player.invuln>0)player.invuln--;let ph=player.duck?27:player.h,py=player.duck?ground-27:player.y;const pr={x:player.x,y:py,w:player.w,h:ph};
 obstacles.forEach(o=>o.x-=speed);items.forEach(o=>{o.x-=speed;o.spin+=.08});obstacles=obstacles.filter(o=>o.x>-70);items=items.filter(o=>o.x>-50);
 for(let i=obstacles.length-1;i>=0;i--){if(rectHit(pr,obstacles[i])){if(shields>0){shields--;shieldEl.textContent=shields;particle(obstacles[i].x,obstacles[i].y,'#63e6ce');obstacles.splice(i,1);player.invuln=50}else{particle(player.x+15,player.y+20,'#ff777e');end();return}}}
 for(let i=items.length-1;i>=0;i--){if(rectHit(pr,items[i])){shields=Math.min(3,shields+1);shieldEl.textContent=shields;particle(items[i].x,items[i].y,'#70e9d1');items.splice(i,1)}}
 particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.life--});particles=particles.filter(p=>p.life>0);scoreEl.textContent=String(Math.floor(score)).padStart(4,'0');phase();if(score>=1200){end();$('runnerOverlayTitle').textContent='MISSÃO CONCLUÍDA!';$('runnerOverlayText').textContent='Você atravessou todas as fases e ajudou a Cotemigo a alcançar a Redenção Digital.';}}
 function pixel(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
 function draw(){ctx.clearRect(0,0,W,H);let grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'#071b31');grad.addColorStop(1,'#0b3042');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
 // skyline and digital grid
 for(let i=0;i<14;i++){let x=i*78-(frame*0.35%78),bh=65+(i*37%95);pixel(x,ground-bh,48,bh,'#102f46');for(let yy=ground-bh+12;yy<ground-8;yy+=17)for(let xx=x+9;xx<x+42;xx+=15)pixel(xx,yy,5,6,'rgba(70,190,196,.25)')}
 ctx.strokeStyle='rgba(71,190,196,.12)';ctx.lineWidth=1;for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,ground);ctx.lineTo(x+35,H);ctx.stroke()}pixel(0,ground,W,3,'#57c9bd');for(let x=-(frame*speed%60);x<W;x+=60)pixel(x,ground+19,28,3,'#1d5667');
 // floating data points
 for(let i=0;i<22;i++){let x=(i*53-frame*.7%(W+50)+W+50)%(W+50),y=35+(i*47%175);pixel(x,y,2,2,'rgba(92,220,218,.45)')}
 // obstacles
 obstacles.forEach(o=>{if(o.type==='ddos'){
   // Onda horizontal de tráfego: exige que o jogador se abaixe.
   ctx.save();ctx.shadowColor='#ff7c86';ctx.shadowBlur=14;ctx.fillStyle='#f06b78';
   ctx.fillRect(o.x,o.y,o.w,o.h);ctx.shadowBlur=0;
   ctx.strokeStyle='#ffd0d2';ctx.lineWidth=2;ctx.beginPath();
   for(let k=0;k<4;k++){let xx=o.x+8+k*18;ctx.moveTo(xx,o.y+2);ctx.lineTo(xx+7,o.y+9);ctx.lineTo(xx,o.y+16);}
   ctx.stroke();ctx.restore();
  }else if(o.type==='malware'){ctx.fillStyle='#f06b78';ctx.beginPath();ctx.arc(o.x+21,o.y+23,17,0,Math.PI*2);ctx.fill();for(let a=0;a<8;a++){let an=a*Math.PI/4;pixel(o.x+21+Math.cos(an)*18-3,o.y+23+Math.sin(an)*18-3,6,6,'#f06b78')}pixel(o.x+14,o.y+18,5,5,'#301e3a');pixel(o.x+25,o.y+18,5,5,'#301e3a');pixel(o.x+18,o.y+29,9,3,'#301e3a')}else if(o.type==='phishing'){pixel(o.x,o.y+5,42,30,'#e6a957');pixel(o.x+4,o.y+9,34,22,'#fff0cf');ctx.strokeStyle='#a96b42';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(o.x+4,o.y+10);ctx.lineTo(o.x+21,o.y+23);ctx.lineTo(o.x+38,o.y+10);ctx.stroke();pixel(o.x+17,o.y-3,9,8,'#f06b78')}else{pixel(o.x+5,o.y,35,55,'#9a4e75');pixel(o.x+10,o.y+6,25,14,'#f7c2d4');pixel(o.x+13,o.y+27,19,4,'#f7c2d4');pixel(o.x+13,o.y+36,19,4,'#f7c2d4');pixel(o.x+17,o.y+44,11,5,'#f7c2d4')}});
 // collectible icons
 items.forEach(o=>{ctx.save();ctx.translate(o.x+14,o.y+14);ctx.rotate(Math.sin(o.spin)*.12);ctx.fillStyle=o.type==='shield'?'#3ec9b0':o.type==='mfa'?'#63b8ed':'#e8b65e';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=13;ctx.beginPath();ctx.arc(0,0,13,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#082238';ctx.font='bold 15px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.type==='shield'?'◆':o.type==='mfa'?'✓':'▣',0,1);ctx.restore()});
 // robot character
 let py=player.duck?ground-29:player.y;let blink=player.invuln>0&&Math.floor(frame/5)%2===0;if(!blink){pixel(player.x+8,py+5,25,25,'#62d6d0');pixel(player.x+12,py,17,9,'#b5f8ec');pixel(player.x+13,py+12,15,9,'#09283c');pixel(player.x+16,py+14,4,4,'#8fffea');pixel(player.x+25,py+14,4,4,'#8fffea');pixel(player.x+3,py+13,6,14,'#3b9eaa');pixel(player.x+32,py+13,6,14,'#3b9eaa');pixel(player.x+10,py+29,8,12,'#d2f5ec');pixel(player.x+24,py+29,8,12,'#d2f5ec');pixel(player.x+8,py+39,11,6,'#4ba9b0');pixel(player.x+23,py+39,11,6,'#4ba9b0');pixel(player.x+17,py-7,7,7,'#e8b65e');}if(shields>0){ctx.strokeStyle='rgba(96,231,206,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(player.x+22,py+23,34+Math.sin(frame*.12)*2,0,Math.PI*2);ctx.stroke()}
 particles.forEach(p=>{ctx.globalAlpha=p.life/28;pixel(p.x,p.y,4,4,p.color);ctx.globalAlpha=1});
 if(state==='running'&&score<100)ctx.fillStyle='rgba(130,220,221,.7)';ctx.font='bold 11px Arial';ctx.fillText('PROTEJA OS ATIVOS CRÍTICOS',W-235,28);
 }
 function loop(t){if(state!=='running')return;let dt=Math.min(2,(t-last)/16.67||1);last=t;for(let i=0;i<dt;i++)update();draw();if(state==='running')requestAnimationFrame(loop);else draw();}
 draw();
})();

// Rede animada do hero, desativada automaticamente para quem prefere movimento reduzido.
const canvas=document.getElementById("networkCanvas"),ctx=canvas&&canvas.getContext("2d");
if(canvas&&ctx&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){let points=[],raf;function resize(){const r=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=r.width*dpr;canvas.height=r.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);points=Array.from({length:42},()=>({x:Math.random()*r.width,y:Math.random()*r.height,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28}));}function draw(){const w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);points.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fillStyle="rgba(69,164,174,.75)";ctx.fill();for(let j=i+1;j<points.length;j++){const q=points[j],dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<105){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(69,164,174,${(1-dist/105)*.22})`;ctx.lineWidth=1;ctx.stroke();}}});raf=requestAnimationFrame(draw);}resize();draw();window.addEventListener("resize",()=>{cancelAnimationFrame(raf);resize();draw();});}

document.getElementById("printBtn").addEventListener("click",()=>window.print());
