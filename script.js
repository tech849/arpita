const NAME="Arpita"; /* ← change to her name */
const P=["images/photo0.jpg","images/photo1.jpg","images/photo2.jpg","images/photo3.jpg"];
document.querySelectorAll("[data-p]").forEach(e=>e.src=P[e.dataset.p]);
document.querySelector("[data-bg]").style.backgroundImage=`url(${P[1]})`;
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
/* title */
const t=document.getElementById("ttl");let n=0;
const word=(w,c)=>{const s=document.createElement("span");s.style.display="inline-block";s.className=c||"";
[...w].forEach(ch=>{const l=document.createElement("span");l.className="l";l.style.setProperty("--i",n++);l.textContent=ch;s.append(l)});return s};
t.append(word("Happy "),word("Birthday"));
const nm=document.createElement("span");nm.className="nm";nm.append(word(NAME+" ✦"));t.append(nm);
/* fx canvas */
const cv=document.getElementById("fx"),cx=cv.getContext("2d");let W,H,parts=[],pet=[];
const rs=()=>{W=cv.width=innerWidth*devicePixelRatio;H=cv.height=innerHeight*devicePixelRatio};rs();addEventListener("resize",rs);
const COL=["#ff4d7d","#ffd27a","#86d1c6","#f4dcc0","#ffffff"],D=devicePixelRatio;
function burst(x,y,k=120){for(let i=0;i<k;i++){const a=Math.random()*6.28,v=(4+Math.random()*10)*D;
parts.push({x:x*D,y:y*D,vx:Math.cos(a)*v,vy:Math.sin(a)*v-6*D,r:(3+Math.random()*5)*D,c:COL[i%5],life:1,rot:Math.random()*6,vr:Math.random()*.4-.2,sq:Math.random()>.5})}}
function rain(){for(let i=0;i<160;i++)setTimeout(()=>parts.push({x:Math.random()*W,y:-20*D,vx:(Math.random()-.5)*3*D,vy:(2+Math.random()*4)*D,r:(3+Math.random()*5)*D,c:COL[i%5],life:1,rot:0,vr:.2,sq:true,g:0}),i*18)}
for(let i=0;i<(RM?0:26);i++)pet.push({x:Math.random()*W,y:Math.random()*H,s:(6+Math.random()*10)*D,v:(.4+Math.random()*.8)*D,ph:Math.random()*6});
function loop(){cx.clearRect(0,0,W,H);
pet.forEach(p=>{p.y+=p.v;p.ph+=.02;p.x+=Math.sin(p.ph)*.8*D;if(p.y>H+20){p.y=-20;p.x=Math.random()*W}
cx.save();cx.translate(p.x,p.y);cx.rotate(p.ph);cx.globalAlpha=.55;cx.fillStyle="#ff4d7d";cx.beginPath();cx.ellipse(0,0,p.s*.35,p.s*.7,0,0,6.3);cx.fill();cx.restore()});
parts=parts.filter(p=>p.life>0&&p.y<H+40);
parts.forEach(p=>{p.vy+=(p.g??.28)*D;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.life-=.007;cx.save();cx.globalAlpha=Math.max(p.life,0);cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle=p.c;
p.sq?cx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2):(cx.beginPath(),cx.arc(0,0,p.r/2,0,6.3),cx.fill());cx.restore()});
requestAnimationFrame(loop)}loop();
/* intro */
const intro=document.getElementById("intro");
document.getElementById("go").onclick=()=>{intro.classList.add("open");document.body.classList.remove("lock");document.body.classList.add("live");
burst(innerWidth/2,innerHeight/2,160);setTimeout(()=>burst(innerWidth*.2,innerHeight*.4,80),400);setTimeout(()=>burst(innerWidth*.8,innerHeight*.4,80),700);
setTimeout(()=>intro.classList.add("gone"),1500)};
/* reveal */
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach((e,i)=>{e.style.transitionDelay=(i%3)*.12+"s";io.observe(e)});
/* countdown */
function tick(){const now=new Date();let y=now.getFullYear(),tg=new Date(y,0,13);
if(now.getMonth()==0&&now.getDate()==13){document.getElementById("cth").textContent="It’s today! Happy Birthday 🎉";["d","h","m","s"].forEach(i=>document.getElementById(i).textContent="🎈");return}
if(now>tg)tg=new Date(y+1,0,13);const ms=tg-now;
const v={d:Math.floor(ms/864e5),h:Math.floor(ms/36e5)%24,m:Math.floor(ms/6e4)%60,s:Math.floor(ms/1e3)%60};
for(const k in v)document.getElementById(k).textContent=String(v[k]).padStart(2,"0");setTimeout(tick,1000)}tick();
/* gallery tilt + lightbox */
const lb=document.getElementById("lb");
document.querySelectorAll(".card").forEach(c=>{
c.addEventListener("pointermove",e=>{if(RM||e.pointerType=="touch")return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.02)`});
c.addEventListener("pointerleave",()=>c.style.transform="");
const open=()=>{lb.querySelector("img").src=P[c.dataset.i];lb.classList.add("on")};
c.onclick=open;c.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();open()}}});
lb.onclick=()=>lb.classList.remove("on");addEventListener("keydown",e=>{if(e.key=="Escape")lb.classList.remove("on")});
/* wishes */
document.querySelectorAll(".fl").forEach(f=>f.onclick=()=>{f.classList.toggle("on");if(f.classList.contains("on")){const r=f.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,40)}});
/* cake */
const ck=document.getElementById("ck"),msg=document.getElementById("msg"),bl=document.getElementById("blow");let out=false;
bl.onclick=()=>{if(!out){out=true;ck.classList.add("out");burst(innerWidth/2,innerHeight*.6,150);rain();msg.textContent="Wish made. May every bit of it come true. ✨";bl.textContent="Light them again"}
else{out=false;ck.classList.remove("out");msg.textContent="";bl.textContent="Blow the candles"}};
