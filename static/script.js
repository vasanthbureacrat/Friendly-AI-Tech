const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const canvas=$("#space"), ctx=canvas?.getContext("2d"); let W=innerWidth,H=innerHeight,stars=[];
function resize(){W=innerWidth;H=innerHeight;if(!canvas)return;let d=Math.min(devicePixelRatio||1,2);canvas.width=W*d;canvas.height=H*d;ctx.setTransform(d,0,0,d,0,0);stars=Array.from({length:Math.min(240,Math.floor(W*H/5000))},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.15,a:Math.random()*.7+.1,v:Math.random()*.13+.025}))}
function starLoop(){if(!ctx)return;ctx.clearRect(0,0,W,H);stars.forEach(s=>{s.y+=s.v;if(s.y>H){s.y=0;s.x=Math.random()*W}ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fillStyle=`rgba(185,215,255,${s.a})`;ctx.fill()});requestAnimationFrame(starLoop)} resize();starLoop();addEventListener("resize",resize);
const light=$(".cursor-light"); addEventListener("pointermove",e=>{if(light){light.style.left=e.clientX+"px";light.style.top=e.clientY+"px"}});
$$(".parallax-stage").forEach(el=>{if(matchMedia("(pointer:fine)").matches)el.addEventListener("pointermove",e=>{let r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;let target=el.matches(".core-stage")?$("#neuralCore",el):el;target.style.transform=`${el.matches(".core-stage")?"translate(-50%,-50%) ":""}rotateY(${x*15}deg) rotateX(${-y*12}deg)`})});
const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.1});$$(".reveal").forEach(e=>ob.observe(e));
const hamb=$(".hamb"),nav=$("nav");if(hamb&&nav){hamb.onclick=()=>nav.classList.toggle("open");$$("a",nav).forEach(a=>a.onclick=()=>nav.classList.remove("open"))}
if($("#year"))$("#year").textContent=new Date().getFullYear();

const bot=$("#companion"),eyes=$$(".bot-eyes i"),msg=$(".bot-msg");
if(bot){
 let lastSide="right", talkTimer;
 addEventListener("pointermove",e=>{eyes.forEach((eye,i)=>{let r=eye.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),m=Math.hypot(dx,dy)||1;eye.style.transform=`translate(${dx/m*2.2}px,${dy/m*1.7}px)`})});
 const sceneMessages={core:"I'm exploring with you ✦",solutions:"These are our AI solutions!",process:"Idea to launch — step by step.",student:"Student world is this way →",contact:"Have an idea? Let's build it!",studenthome:"Welcome to Student Hub ✦",worlds:"Choose your technology world!",internship:"15 or 30 day internship ✦",projects:"Let's build your project!",enquiry:"Ready? Connect with us!",domain:"I'll learn this with you!",learning:"One step at a time ✦",build:"Now let's build something real!"};
 const sceneOb=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting&&en.intersectionRatio>.35){let key=en.target.dataset.scene||"";let idx=$$(".scene").indexOf(en.target);let left=idx%2===1;bot.classList.toggle("left",left);if(msg)msg.textContent=sceneMessages[key]||"Let's explore ✦";bot.classList.add("talk");clearTimeout(talkTimer);talkTimer=setTimeout(()=>bot.classList.remove("talk"),2400)}}),{threshold:[.35,.55]});$$(".scene").forEach(s=>sceneOb.observe(s));
}

const domains={
ai:{world:"WORLD 01 / INTELLIGENCE",title:"AI &<br><em>Machine Learning</em>",desc:"Enter the world of intelligent systems. Learn how data becomes predictions, decisions and useful AI applications.",core:"AI",accent:"#8c6cff",steps:[["FOUNDATION","Python, data and AI fundamentals."],["MACHINE LEARNING","Preprocessing, training, testing and evaluation."],["DEEP LEARNING","Neural networks and intelligent systems."],["PROJECT","Build an end-to-end AI application."]]},
data:{world:"WORLD 02 / DATA",title:"Data<br><em>Science</em>",desc:"Explore a world of data where raw information becomes analysis, visual stories and useful decisions.",core:"DATA",accent:"#32c9ff",steps:[["DATA","Collect, clean and understand datasets."],["ANALYSE","Use Pandas, NumPy and statistics."],["VISUALIZE","Create charts, reports and dashboards."],["PROJECT","Build a practical analytics solution."]]},
web:{world:"WORLD 03 / WEB",title:"Web<br><em>Development</em>",desc:"Enter a digital interface world and learn how modern frontend, backend and web applications work together.",core:"WEB",accent:"#35f0c0",steps:[["STRUCTURE","HTML and semantic page structure."],["DESIGN","CSS, responsive layouts and UI."],["LOGIC","JavaScript and application interaction."],["PROJECT","Build a complete web application."]]},
cyber:{world:"WORLD 04 / SECURITY",title:"IT &<br><em>Cyber Security</em>",desc:"Explore systems, networks and defensive security concepts inside a connected digital environment.",core:"SEC",accent:"#ff5b91",steps:[["SYSTEMS","Computer and operating-system foundations."],["NETWORKS","Connected systems and protocols."],["SECURITY","Defensive security fundamentals."],["PRACTICE","Guided technical security exercises."]]},
cloud:{world:"WORLD 05 / CLOUD",title:"Cloud<br><em>Computing</em>",desc:"Explore how applications, infrastructure and services can be deployed and managed through cloud environments.",core:"CLOUD",accent:"#58a8ff",steps:[["FOUNDATION","Cloud concepts and service models."],["SERVICES","Compute, storage and cloud resources."],["DEPLOY","Application deployment concepts."],["PROJECT","Complete a guided cloud project."]]},
cse:{world:"WORLD 06 / SOFTWARE",title:"CSE &<br><em>Software Development</em>",desc:"Strengthen programming and software engineering skills by transforming requirements into working applications.",core:"CODE",accent:"#ff9e4d",steps:[["PROGRAM","Programming logic and problem solving."],["DESIGN","Plan software architecture and workflow."],["DEVELOP","Implement, test and debug."],["PROJECT","Complete a software application."]]}
};
if($("#domainTitle")){
 let key=new URLSearchParams(location.search).get("d")||"ai",d=domains[key]||domains.ai;
 document.body.dataset.world=key;document.documentElement.style.setProperty("--accent",d.accent);
 $("#worldLabel").textContent=d.world;$("#domainTitle").innerHTML=d.title;$("#domainDesc").textContent=d.desc;$("#domainCore").textContent=d.core;$("#buildWord").textContent=d.core;
 $("#learningPath").innerHTML=d.steps.map((s,i)=>`<div class="path-step reveal show"><b>0${i+1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("");
 const dc=$("#domainCanvas"),cx=dc.getContext("2d");let pts=[];
 function dsize(){let q=Math.min(devicePixelRatio||1,2);dc.width=innerWidth*q;dc.height=innerHeight*q;cx.setTransform(q,0,0,q,0,0);pts=Array.from({length:42},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}dsize();
 function net(){cx.clearRect(0,0,innerWidth,innerHeight);pts.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;for(let j=i+1;j<pts.length;j++){let q=pts[j],dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<130){cx.globalAlpha=(1-dist/130)*.18;cx.strokeStyle=d.accent;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}cx.globalAlpha=.5;cx.fillStyle=d.accent;cx.beginPath();cx.arc(p.x,p.y,1.5,0,7);cx.fill()});cx.globalAlpha=1;requestAnimationFrame(net)}net();addEventListener("resize",dsize);
}
// V5 premium home interaction: planet parallax + cursor wave
if(document.body.dataset.world==="business"){
  const wave=document.createElement("div"),dot=document.createElement("div");wave.className="cursor-wave";dot.className="cursor-dot";document.body.append(wave,dot);
  let mx=innerWidth/2,my=innerHeight/2,wx=mx,wy=my;
  addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
  (function follow(){wx+=(mx-wx)*.18;wy+=(my-wy)*.18;wave.style.left=wx+"px";wave.style.top=wy+"px";requestAnimationFrame(follow)})();
  const ps=document.getElementById("planetSystem"),stage=document.querySelector(".planet-stage");
  if(ps&&stage&&matchMedia("(pointer:fine)").matches){stage.addEventListener("pointermove",e=>{let r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ps.style.transform=`translate(-50%,-50%) rotateY(${x*20}deg) rotateX(${-y*15}deg) translateZ(8px)`});stage.addEventListener("pointerleave",()=>ps.style.transform="translate(-50%,-50%)")}
}
