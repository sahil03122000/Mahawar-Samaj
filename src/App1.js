import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Tiro+Devanagari+Hindi&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&display=swap');

*,*::before,*::after{
box-sizing:border-box;
margin:0;
padding:0;
}

:root{
--sf:#FF6B00;
--gd:#D4A017;
--gd2:#FFD700;
--gd3:#C8860A;
--mr:#8B0000;
--dp:#4A0000;
--pa:#F5E6C8;
--wh:#FFFDF8;
}

html,body{
height:100vh;
overflow:hidden;
}

body{
font-family:'Crimson Pro',serif;
background:#1a0000;
}

/* BG */

.bg{
position:fixed;
inset:0;
z-index:0;
background:
radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.18) 0%, transparent 55%),
radial-gradient(ellipse at 0% 80%,rgba(139,0,0,.4) 0%, transparent 45%),
radial-gradient(ellipse at 100% 60%,rgba(212,160,23,.12) 0%, transparent 50%),
linear-gradient(160deg,#1a0000 0%,#3A0000 40%,#2C0A00 70%,#1a0000 100%);
}

/* Mandala rings */

.mw{
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
pointer-events:none;
z-index:1;
}

.ml{
position:absolute;
border-radius:50%;
top:50%;
left:50%;
transform:translate(-50%,-50%);
}

.ml1{width:900px;height:900px;border:1px solid rgba(212,160,23,.06);animation:spin 140s linear infinite;}
.ml2{width:720px;height:720px;border:1px solid rgba(255,107,0,.05);animation:spin 100s linear infinite reverse;border-width:2px;}
.ml3{width:540px;height:540px;border:1px solid rgba(212,160,23,.09);animation:spin 70s linear infinite;}
.ml4{width:360px;height:360px;border:1px solid rgba(255,215,0,.12);animation:spin 45s linear infinite reverse;}
.ml5{width:180px;height:180px;border:1px solid rgba(255,107,0,.18);animation:spin 22s linear infinite;}

@keyframes spin{
from{transform:translate(-50%,-50%) rotate(0)}
to{transform:translate(-50%,-50%) rotate(360deg)}
}

/* particles */

.ptcl{
position:fixed;
inset:0;
pointer-events:none;
z-index:1;
}

.p{
position:absolute;
border-radius:50%;
background:var(--gd);
animation:fup linear infinite;
}

@keyframes fup{
0%{transform:translateY(100vh) scale(0);opacity:0}
8%{opacity:.9}
88%{opacity:.4}
100%{transform:translateY(-5vh) scale(1);opacity:0}
}

/* wrapper */

.wrap{
position:relative;
z-index:10;
height:100vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:1rem;
text-align:center;
gap:10px;
transform:scale(.88);
transform-origin:center;
}

/* responsive scaling */

@media (max-height:900px){
.wrap{transform:scale(.85);}
}

@media (max-height:800px){
.wrap{transform:scale(.8);}
}

@media (max-height:700px){
.wrap{transform:scale(.75);}
}

/* OM logo */

.om-ring{
position:relative;
width:120px;
height:120px;
margin-bottom:1rem;
}

.om-ring-circle{
position:absolute;
inset:0;
border-radius:50%;
border:2px solid rgba(212,160,23,.3);
animation:pulse-ring 2.5s ease-in-out infinite;
}

.om-ring-circle2{
position:absolute;
inset:-10px;
border-radius:50%;
border:1px solid rgba(255,107,0,.15);
animation:pulse-ring 2.5s .5s ease-in-out infinite;
}

@keyframes pulse-ring{
0%,100%{transform:scale(1);opacity:.6}
50%{transform:scale(1.08);opacity:1}
}

.om-glyph{
width:100%;
height:100%;
border-radius:50%;
background:linear-gradient(135deg,var(--dp),var(--mr));
border:2px solid rgba(212,160,23,.4);
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;
box-shadow:0 8px 40px rgba(0,0,0,.5);
}

.om-glyph img{
width:100%;
height:100%;
object-fit:cover;
border-radius:50%;
}

/* brand */

.logo-hi{
font-family:'Yatra One';
font-size:2rem;
color:var(--gd);
letter-spacing:3px;
}

.logo-en{
font-size:.7rem;
color:var(--pa);
letter-spacing:6px;
opacity:.7;
}

/* ornament */

.orn{
display:flex;
align-items:center;
gap:12px;
justify-content:center;
margin:1rem 0;
}

.ol{
height:1px;
width:80px;
background:linear-gradient(90deg,transparent,var(--gd));
}

.ol.r{
background:linear-gradient(90deg,var(--gd),transparent);
}

/* heading */

.cs-tag{
font-size:.85rem;
letter-spacing:4px;
color:var(--sf);
}

.cs-h1{
font-family:'Yatra One';
font-size:4rem;
color:var(--wh);
}

.cs-h1 em{
color:var(--gd2);
}

.cs-deva{
font-family:'Tiro Devanagari Hindi';
font-size:1.3rem;
color:var(--pa);
}

.cs-sub{
font-size:1rem;
max-width:520px;
color:var(--pa);
opacity:.8;
}

/* countdown */

.countdown{
display:flex;
gap:1.2rem;
flex-wrap:wrap;
justify-content:center;
}

.cbox{
background:rgba(74,0,0,.6);
border:1px solid rgba(212,160,23,.25);
border-radius:12px;
padding:1rem 1.2rem;
min-width:80px;
}

.cnum{
font-family:'Yatra One';
font-size:2.6rem;
color:var(--gd2);
}

.clbl{
font-size:.65rem;
letter-spacing:3px;
color:var(--pa);
opacity:.7;
}

.cdot{
font-size:2.5rem;
color:rgba(212,160,23,.35);
}

/* progress */

.prog-wrap{
max-width:420px;
margin:1rem auto;
}

.prog-track{
height:6px;
background:rgba(255,255,255,.08);
border-radius:10px;
overflow:hidden;
}

.prog-fill{
height:100%;
background:linear-gradient(90deg,var(--sf),var(--gd),var(--gd2));
}

/* diyas */

.diya{
position:fixed;
font-size:1.8rem;
animation:diyadance 3s ease-in-out infinite;
pointer-events:none;
z-index:2;
}

.diya-tl{top:2rem;left:2rem;}
.diya-tr{top:2rem;right:2rem;}
.diya-bl{bottom:2rem;left:2rem;}
.diya-br{bottom:2rem;right:2rem;}

@keyframes diyadance{
0%,100%{transform:scale(1) rotate(-5deg)}
50%{transform:scale(1.15) rotate(5deg)}
}

.foot{
font-size:.72rem;
color:var(--pa);
opacity:.4;
}
`;

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
id: i,
size: Math.random()*3+10,
left: Math.random()*100,
delay: -(Math.random()*20),
dur: Math.random()*10+14
}));

const LAUNCH = new Date("2026-03-15T00:00:00");

function useCountdown(target){
const calc=()=>{
const diff=target-Date.now();
if(diff<=0)return{d:0,h:0,m:0,s:0};
return{
d:Math.floor(diff/86400000),
h:Math.floor((diff%86400000)/3600000),
m:Math.floor((diff%3600000)/60000),
s:Math.floor((diff%60000)/1000)
};
};
const[t,setT]=useState(calc);
useEffect(()=>{
const id=setInterval(()=>setT(calc()),1000);
return()=>clearInterval(id);
},[]);
return t;
}

export default function ComingSoon(){

const {d,h,m,s}=useCountdown(LAUNCH);

const totalDays=Math.ceil((LAUNCH-new Date("2026-01-01"))/86400000);
const elapsed=Math.ceil((Date.now()-new Date("2026-01-01"))/86400000);
const progress=Math.min(100,Math.max(5,Math.round((elapsed/totalDays)*100)));

return(
<div style={{minHeight:"100vh",position:"relative"}}>

<style>{CSS}</style>

<div className="bg"/>

<div className="mw">
<div className="ml ml1"/>
<div className="ml ml2"/>
<div className="ml ml3"/>
<div className="ml ml4"/>
<div className="ml ml5"/>
</div>

<div className="ptcl">
{PARTICLES.map(p=>(
<div key={p.id} className="p"
style={{
width:p.size,
height:p.size,
left:p.left+"%",
animationDelay:p.delay+"s",
animationDuration:p.dur+"s"
}}/>
))}
</div>

<div className="diya diya-tl">🪔</div>
<div className="diya diya-tr">🪔</div>
<div className="diya diya-bl">🪔</div>
<div className="diya diya-br">🪔</div>

<div className="wrap">

<div className="om-ring">
<div className="om-ring-circle"/>
<div className="om-ring-circle2"/>
<div className="om-glyph">
<img src={process.env.PUBLIC_URL+"/images/logo.png"} alt="logo"/>
</div>
</div>

<div className="logo-hi">महावर समाज अटेली मंडी</div>
<div className="logo-en">MAHAWAR SAMAJ ATELI MANDI</div>

<div className="orn">
<div className="ol"/>
<span>🪔</span>
<div className="ol r"/>
</div>

<span className="cs-tag">— नया अध्याय शुरू होने वाला है —</span>

<h1 className="cs-h1">Coming <em>Soon</em></h1>

<p className="cs-deva">कुछ खास तैयार हो रहा है आपके लिए</p>

<p className="cs-sub">
We are working hard to bring you an even better experience.
Our new website launches very soon — stay tuned!
</p>

<div className="countdown">
<div className="cbox"><span className="cnum">{String(d).padStart(2,"0")}</span><span className="clbl">Days</span></div>
<div className="cdot">:</div>
<div className="cbox"><span className="cnum">{String(h).padStart(2,"0")}</span><span className="clbl">Hours</span></div>
<div className="cdot">:</div>
<div className="cbox"><span className="cnum">{String(m).padStart(2,"0")}</span><span className="clbl">Minutes</span></div>
<div className="cdot">:</div>
<div className="cbox"><span className="cnum">{String(s).padStart(2,"0")}</span><span className="clbl">Seconds</span></div>
</div>

<div className="prog-wrap">
<div className="prog-track">
<div className="prog-fill" style={{width:progress+"%"}}/>
</div>
</div>

<p className="foot">© 2025 Mahawar Samaj • Ateli Mandi, Haryana</p>

</div>

</div>
);
}