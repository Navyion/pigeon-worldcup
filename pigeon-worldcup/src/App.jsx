import { useState, useEffect, useCallback, useRef } from "react";

// Unsplash CDN에서 가져온 실제 비둘기 사진 32장 (무료, 출처 표시 포함)
const PIGEONS = [
  { id:1, name:"도심의 왕자", desc:"빌딩숲의 지배자", img:"https://images.unsplash.com/photo-1534695941753-73cf13435eb4?w=400&h=400&fit=crop&crop=faces" },
  { id:2, name:"지붕 위의 철학자", desc:"세상을 내려다보는 사색가", img:"https://images.unsplash.com/photo-1539664030485-a936c7d29c6e?w=400&h=400&fit=crop&crop=faces" },
  { id:3, name:"공원의 아이돌", desc:"빵 부스러기 수집 전문", img:"https://images.unsplash.com/photo-1507126882445-434b04530d1a?w=400&h=400&fit=crop&crop=center" },
  { id:4, name:"빵조각 사냥꾼", desc:"빵집 앞 단골 손님", img:"https://images.unsplash.com/photo-1518157770830-df40b281672e?w=400&h=400&fit=crop&crop=faces" },
  { id:5, name:"뒤뚱이 패셔니스타", desc:"런웨이는 인도 위", img:"https://images.unsplash.com/photo-1523115191856-c203e76215a5?w=400&h=400&fit=crop&crop=center" },
  { id:6, name:"하늘의 택배기사", desc:"시속 80km 배달왕", img:"https://images.unsplash.com/photo-1618260517110-e7a2a524f6a3?w=400&h=400&fit=crop&crop=center" },
  { id:7, name:"광장의 보스", desc:"광장 비둘기 서열 1위", img:"https://images.unsplash.com/photo-1584991934159-00e3771243c3?w=400&h=400&fit=crop&crop=faces" },
  { id:8, name:"깃털 귀공자", desc:"매일 깃털 손질 2시간", img:"https://images.unsplash.com/photo-1697989120456-5fb3b24749fb?w=400&h=400&fit=crop&crop=faces" },
  { id:9, name:"전설의 구구", desc:"동네 전설이 된 비둘기", img:"https://images.unsplash.com/photo-1693938968495-15c8275c993f?w=400&h=400&fit=crop&crop=center" },
  { id:10, name:"벤치 위의 명상가", desc:"공원 벤치가 내 무대", img:"https://images.unsplash.com/photo-1641144355850-e7991d050bdc?w=400&h=400&fit=crop&crop=faces" },
  { id:11, name:"비둘기계의 BTS", desc:"팬클럽 보유 비둘기", img:"https://images.unsplash.com/photo-1555169062-013468b47731?w=400&h=400&fit=crop&crop=faces" },
  { id:12, name:"새벽 산책러", desc:"이른 아침의 지배자", img:"https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400&h=400&fit=crop&crop=faces" },
  { id:13, name:"잠실 비둘기", desc:"야구장에서 간식 줍기", img:"https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop&crop=faces" },
  { id:14, name:"종로 터줏대감", desc:"종각역 10년 거주", img:"https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop&crop=faces" },
  { id:15, name:"한강 낭만파", desc:"치맥 옆 대기 전문", img:"https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=400&h=400&fit=crop&crop=faces" },
  { id:16, name:"지하철 탐험가", desc:"2호선 정기권 보유", img:"https://images.unsplash.com/photo-1589720855396-1e1bb8259bd9?w=400&h=400&fit=crop&crop=faces" },
  { id:17, name:"카페 앞 신사", desc:"테라스석 아래가 내 집", img:"https://images.unsplash.com/photo-1563281577-a3c3d4555fa2?w=400&h=400&fit=crop&crop=faces" },
  { id:18, name:"비 오는 날의 시인", desc:"처마 밑에서 감성 충전", img:"https://images.unsplash.com/photo-1621091045659-ea7862817b26?w=400&h=400&fit=crop&crop=faces" },
  { id:19, name:"포토제닉 비둘기", desc:"사진 찍히면 포즈 자동", img:"https://images.unsplash.com/photo-1612024782955-49fae79e42bb?w=400&h=400&fit=crop&crop=faces" },
  { id:20, name:"야행성 비둘기", desc:"네온사인 아래 활동파", img:"https://images.unsplash.com/photo-1576074443981-aef79e1e01f3?w=400&h=400&fit=crop&crop=faces" },
  { id:21, name:"학교 급식 도둑", desc:"운동장이 내 식당", img:"https://images.unsplash.com/photo-1617804581081-be19dc4cd47c?w=400&h=400&fit=crop&crop=faces" },
  { id:22, name:"목욕탕 비둘기", desc:"분수대가 내 욕조", img:"https://images.unsplash.com/photo-1590257025412-42f551c8c1c4?w=400&h=400&fit=crop&crop=faces" },
  { id:23, name:"근육질 비둘기", desc:"하루 비행 100km 훈련", img:"https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=400&h=400&fit=crop&crop=faces" },
  { id:24, name:"할머니의 친구", desc:"매일 모이 받는 단골", img:"https://images.unsplash.com/photo-1596633605700-1f50dba9c129?w=400&h=400&fit=crop&crop=faces" },
  { id:25, name:"외교관 비둘기", desc:"평화의 상징 담당", img:"https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop&crop=faces" },
  { id:26, name:"DJ 비둘기", desc:"구구 비트 드랍", img:"https://images.unsplash.com/photo-1573439771835-97e5be3bae58?w=400&h=400&fit=crop&crop=faces" },
  { id:27, name:"서울역 떠돌이", desc:"전국 투어 중", img:"https://images.unsplash.com/photo-1559564523-4b243f5e0dfc?w=400&h=400&fit=crop&crop=faces" },
  { id:28, name:"미식가 비둘기", desc:"떡볶이 국물 감별사", img:"https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?w=400&h=400&fit=crop&crop=faces" },
  { id:29, name:"인스타 스타", desc:"팔로워 3000 돌파", img:"https://images.unsplash.com/photo-1611689102192-1f6e0e52df0a?w=400&h=400&fit=crop&crop=faces" },
  { id:30, name:"경비원 비둘기", desc:"아파트 입구 24시 근무", img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop&crop=faces" },
  { id:31, name:"바리스타 비둘기", desc:"커피향에 이끌린 미식가", img:"https://images.unsplash.com/photo-1557401622-09cfb0573854?w=400&h=400&fit=crop&crop=faces" },
  { id:32, name:"최종 보스", desc:"전설 속의 비둘기", img:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop&crop=faces" },
];

const ROUND_NAMES = { 32:"32강", 16:"16강", 8:"8강", 4:"준결승", 2:"결승" };

function shuffle(a) {
  const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b;
}
function useIsMobile() {
  const [m,setM]=useState(window.innerWidth<640);
  useEffect(()=>{const h=()=>setM(window.innerWidth<640);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  return m;
}
function loadStats(){try{return JSON.parse(localStorage.getItem("pigeon-stats"))||{};}catch{return {};}}
function saveStats(s){try{localStorage.setItem("pigeon-stats",JSON.stringify(s));}catch{}}

const CSS=`
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes float{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-14px) rotate(3deg)}}
@keyframes popIn{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@keyframes shine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
.pcard{-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none;cursor:pointer}
.btn{-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none;cursor:pointer;border:none;outline:none;font-family:'Black Han Sans',sans-serif;transition:transform .15s,box-shadow .15s}
.btn:active{transform:scale(.95)!important}
@media(max-width:639px){
  .arena{flex-direction:column!important;gap:8px!important}
  .arena .pcard{max-width:100%!important;flex:none!important;width:100%!important}
  .vs{font-size:1.2rem!important;padding:0!important}
  .wcard{max-width:280px!important}
}
`;

function Card({p,onClick,sel,mob}){
  const[ld,setLd]=useState(false);
  const won=sel===p.id,lost=sel&&sel!==p.id;
  return(
    <div className="pcard" onClick={()=>!sel&&onClick(p)} style={{
      flex:mob?"none":"1 1 260px",width:mob?"100%":undefined,maxWidth:mob?"100%":380,
      background:"#fff",borderRadius:mob?16:22,overflow:"hidden",
      cursor:sel?"default":"pointer",
      border:won?"3px solid #4a7c59":lost?"3px solid #ccc":"3px solid transparent",
      boxShadow:won?"0 0 28px rgba(74,124,89,.3)":"0 4px 20px rgba(44,36,22,.07)",
      transform:won?"scale(1.02)":lost?"scale(.96)":"scale(1)",
      opacity:lost?.38:1,transition:"all .45s cubic-bezier(.34,1.56,.64,1)",
      position:"relative",animation:"slideUp .3s ease-out",
    }}>
      {won&&<div style={{position:"absolute",top:mob?8:12,right:mob?8:12,background:"#4a7c59",color:"#fff",borderRadius:50,width:mob?28:36,height:mob?28:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?14:18,fontWeight:900,zIndex:10,boxShadow:"0 2px 8px rgba(74,124,89,.4)"}}>✓</div>}
      <div style={{width:"100%",aspectRatio:mob?"16/10":"1",background:"#e8e0d0",position:"relative",overflow:"hidden"}}>
        {!ld&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?36:48,animation:"pulse 1.5s infinite"}}>🐦</div>}
        <img src={p.img} alt={p.name} loading="eager"
          onLoad={()=>setLd(true)}
          onError={(e)=>{e.target.src=`https://placehold.co/400x400/e8e0d0/4a7c59?text=${encodeURIComponent(p.name)}`;setLd(true);}}
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:ld?1:0,transition:"opacity .4s,transform .4s",transform:won?"scale(1.05)":"scale(1)"}}
        />
      </div>
      <div style={{padding:mob?"10px 14px 12px":"14px 18px 18px",textAlign:"center"}}>
        <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?"1rem":"clamp(1rem,2.2vw,1.35rem)",color:"#2c2416",marginBottom:1,lineHeight:1.2}}>{p.name}</div>
        <div style={{fontSize:mob?11:13,color:"#8b7d6b",fontWeight:600}}>{p.desc}</div>
      </div>
    </div>
  );
}

function Bar({cur,tot,mob}){
  const pct=tot>0?((tot-cur)/tot)*100:0;
  return(<div style={{maxWidth:mob?"88%":480,margin:"0 auto",background:"#ddd5c4",borderRadius:50,height:mob?6:9,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#4a7c59,#e8a838)",borderRadius:50,transition:"width .6s cubic-bezier(.34,1.56,.64,1)"}}/>
  </div>);
}

function Stats({stats,onHome,onStart,mob}){
  const list=PIGEONS.map(p=>({...p,wins:stats[p.id]?.wins||0,picks:stats[p.id]?.picks||0})).sort((a,b)=>b.wins-a.wins||b.picks-a.picks);
  const mx=Math.max(1,...list.map(e=>e.wins));
  const any=list.some(e=>e.wins>0);
  return(
    <div style={{padding:mob?"16px 10px 28px":"2rem 1rem",maxWidth:650,margin:"0 auto",position:"relative",zIndex:1}}>
      <div style={{textAlign:"center",marginBottom:mob?16:24}}>
        <div style={{fontSize:mob?32:44,marginBottom:4}}>📊</div>
        <h2 style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?"1.2rem":"clamp(1.4rem,3.5vw,2rem)",color:"#2c2416",marginBottom:3}}>역대 비둘기 인기 순위</h2>
        <p style={{color:"#8b7d6b",fontSize:mob?12:14,fontWeight:600}}>{any?"모든 플레이의 선택 기반 집계":"아직 데이터가 없어요! 게임을 플레이해보세요!"}</p>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:mob?16:24,flexWrap:"wrap"}}>
        <button className="btn" onClick={onStart} style={{fontSize:mob?".9rem":"1rem",background:"#4a7c59",color:"#fff",borderRadius:50,padding:mob?"9px 22px":"11px 28px",boxShadow:"0 3px 12px rgba(74,124,89,.3)"}}>🏆 월드컵 시작</button>
        <button className="btn" onClick={onHome} style={{fontSize:mob?".9rem":"1rem",background:"transparent",color:"#8b7d6b",border:"2px solid #ddd5c4",borderRadius:50,padding:mob?"9px 22px":"11px 28px"}}>🏠 홈으로</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:mob?6:8}}>
        {list.map((p,i)=>(
          <div key={p.id} style={{display:"flex",alignItems:"center",gap:mob?8:12,background:i===0?"linear-gradient(135deg,#fff9e6,#fff)":"#fff",border:i===0?"2px solid #e8a838":i<3?"2px solid #ddd5c4":"1px solid #eee6d8",borderRadius:mob?12:14,padding:mob?"8px 10px":"10px 16px"}}>
            <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:i<3?(mob?20:24):(mob?13:16),color:i===0?"#e8a838":i<3?"#4a7c59":"#8b7d6b",minWidth:mob?26:34,textAlign:"center"}}>{i===0?"👑":i===1?"🥈":i===2?"🥉":`${i+1}`}</div>
            <img src={p.img} alt={p.name} onError={(e)=>{e.target.src=`https://placehold.co/48x48/e8e0d0/4a7c59?text=${encodeURIComponent(p.name[0])}`;}} style={{width:i<3?(mob?44:52):(mob?36:42),height:i<3?(mob?44:52):(mob?36:42),borderRadius:10,objectFit:"cover",flexShrink:0,border:"2px solid #eee6d8"}}/>
            <div style={{flex:1,minWidth:0,overflow:"hidden"}}>
              <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:i<3?(mob?13:15):(mob?12:13),color:"#2c2416",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
              {!mob&&<div style={{fontSize:10,color:"#8b7d6b"}}>{p.desc}</div>}
              <div style={{marginTop:3,height:mob?5:6,background:"#f0ebe2",borderRadius:50,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${(p.wins/mx)*100}%`,background:i===0?"linear-gradient(90deg,#e8a838,#d45f2e)":"linear-gradient(90deg,#4a7c59,#7db88e)",borderRadius:50,transition:"width 1s ease"}}/>
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:i<3?(mob?14:18):(mob?12:14),color:"#4a7c59"}}>🏆{p.wins}</div>
              <div style={{fontSize:mob?9:10,color:"#8b7d6b",marginTop:1}}>선택 {p.picks}회</div>
            </div>
          </div>
        ))}
      </div>
      <p style={{textAlign:"center",marginTop:16,fontSize:10,color:"#b0a590"}}>Photos by Unsplash · 비둘기 이상형 월드컵</p>
    </div>
  );
}

export default function App(){
  const mob=useIsMobile();
  const[screen,setScreen]=useState("intro");
  const[pigeons,setPigeons]=useState([]);
  const[round,setRound]=useState(32);
  const[mi,setMi]=useState(0);
  const[wins,setWins]=useState([]);
  const[sel,setSel]=useState(null);
  const[champ,setChamp]=useState(null);
  const[stats,setStats]=useState(loadStats);
  const[confDone,setConfDone]=useState(false);
  const timer=useRef(null);

  const totM=16+8+4+2+1;
  const doneM=(()=>{let d=0;if(round<=16)d+=16;if(round<=8)d+=8;if(round<=4)d+=4;if(round<=2)d+=2;return d+mi;})();

  const start=()=>{setPigeons(shuffle(PIGEONS));setRound(32);setMi(0);setWins([]);setSel(null);setChamp(null);setConfDone(false);setScreen("game");};

  const pick=useCallback((p)=>{
    if(sel)return; setSel(p.id);
    const ns={...stats};
    if(!ns[p.id])ns[p.id]={wins:0,picks:0};
    ns[p.id].picks=(ns[p.id].picks||0)+1;
    const nw=[...wins,p],mr=round/2;
    if(mi+1>=mr){
      if(round===2){ns[p.id].wins=(ns[p.id].wins||0)+1;setStats(ns);saveStats(ns);timer.current=setTimeout(()=>{setChamp(p);setScreen("winner");},700);}
      else{setStats(ns);saveStats(ns);timer.current=setTimeout(()=>{setPigeons(shuffle(nw));setRound(round/2);setMi(0);setWins([]);setSel(null);},700);}
    }else{setStats(ns);saveStats(ns);timer.current=setTimeout(()=>{setWins(nw);setMi(mi+1);setSel(null);},700);}
  },[sel,round,mi,wins,stats]);

  useEffect(()=>{
    if(screen==="winner"&&!confDone&&typeof window.confetti==="function"){
      setConfDone(true);const end=Date.now()+2500;
      const iv=setInterval(()=>{
        window.confetti({particleCount:4,angle:60,spread:55,origin:{x:0},colors:["#4a7c59","#e8a838","#d45f2e","#fff"]});
        window.confetti({particleCount:4,angle:120,spread:55,origin:{x:1},colors:["#4a7c59","#e8a838","#d45f2e","#fff"]});
        if(Date.now()>end)clearInterval(iv);
      },50);
    }
  },[screen,confDone]);
  useEffect(()=>()=>clearTimeout(timer.current),[]);

  const a=pigeons[mi*2],b=pigeons[mi*2+1];
  const fh={minHeight:"100vh"};

  return(
    <div style={{fontFamily:"'Nanum Gothic',sans-serif",...fh,background:"#f5f0e8",position:"relative",overflowX:"hidden"}}>
      <style>{CSS}</style>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(circle at 20% 20%,rgba(74,124,89,.06) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(232,168,56,.08) 0%,transparent 50%)"}}/>

      {/* INTRO */}
      {screen==="intro"&&(
        <div style={{...fh,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:mob?"20px 14px":"2rem",position:"relative",zIndex:1}}>
          <div style={{fontSize:mob?56:76,lineHeight:1,animation:"float 3s ease-in-out infinite",filter:"drop-shadow(0 5px 10px rgba(0,0,0,.1))"}}>🐦</div>
          <h1 style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?"1.65rem":"clamp(2rem,6vw,3.4rem)",color:"#2c2416",margin:"10px 0 5px",letterSpacing:-1,lineHeight:1.15}}>비둘기 <span style={{color:"#4a7c59"}}>이상형</span> 월드컵</h1>
          <p style={{color:"#8b7d6b",fontSize:mob?".85rem":"1rem",fontWeight:700,marginBottom:mob?20:28}}>32마리 비둘기 중 당신의 최애를 골라주세요!</p>
          <div style={{background:"#fff",border:"2px solid #ddd5c4",borderRadius:mob?14:18,padding:mob?"14px 16px":"18px 22px",maxWidth:400,width:"100%",marginBottom:mob?20:28,textAlign:"left"}}>
            <h3 style={{fontFamily:"'Black Han Sans',sans-serif",color:"#4a7c59",fontSize:mob?".95rem":"1.05rem",marginBottom:8}}>🎮 게임 방법</h3>
            {["32마리의 비둘기가 토너먼트 대결!","두 비둘기 중 마음에 드는 한 마리를 터치","32강→16강→8강→준결승→결승","최종 우승 비둘기가 통계에 기록됩니다"].map((t,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:6,padding:"2px 0",fontSize:mob?12:13,color:"#2c2416"}}><span>🐦</span><span>{t}</span></div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
            <button className="btn" onClick={start} style={{fontSize:mob?"1.05rem":"1.2rem",letterSpacing:1,background:"#4a7c59",color:"#fff",borderRadius:50,padding:mob?"11px 28px":"13px 36px",boxShadow:"0 5px 20px rgba(74,124,89,.35)"}}>🏆 시작하기</button>
            <button className="btn" onClick={()=>setScreen("stats")} style={{fontSize:mob?".9rem":"1.05rem",background:"transparent",color:"#4a7c59",border:"3px solid #4a7c59",borderRadius:50,padding:mob?"9px 22px":"11px 28px"}}>📊 인기 순위</button>
          </div>
        </div>
      )}

      {/* GAME */}
      {screen==="game"&&a&&b&&(
        <div style={{...fh,display:"flex",flexDirection:"column",justifyContent:mob?"flex-start":"center",padding:mob?"12px 8px 20px":"20px 14px 28px",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:mob?8:14}}>
            <div style={{display:"inline-block",fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?"1.05rem":"clamp(1.1rem,3vw,1.5rem)",color:"#2c2416",background:"#fff",border:"2px solid #ddd5c4",borderRadius:50,padding:mob?"5px 18px":"7px 24px",boxShadow:"0 3px 12px rgba(44,36,22,.06)"}}>
              {ROUND_NAMES[round]}
              <span style={{display:"block",fontFamily:"'Nanum Gothic',sans-serif",fontSize:mob?10:12,color:"#8b7d6b",fontWeight:700,marginTop:-2}}>{mi+1} / {round/2} 경기</span>
            </div>
          </div>
          <Bar cur={totM-doneM} tot={totM} mob={mob}/>
          <div className="arena" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:mob?8:"clamp(12px,2vw,20px)",maxWidth:840,margin:mob?"10px auto":"16px auto",flexDirection:mob?"column":"row",width:"100%",padding:mob?"0 2px":0}}>
            <Card p={a} onClick={pick} sel={sel} mob={mob}/>
            <div className="vs" style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?"1.2rem":"clamp(1.4rem,3.5vw,2rem)",flexShrink:0,padding:mob?"0":"0 4px",background:"linear-gradient(135deg,#d45f2e,#e8a838,#d45f2e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% auto",animation:"shine 3s linear infinite"}}>VS</div>
            <Card p={b} onClick={pick} sel={sel} mob={mob}/>
          </div>
          <p style={{textAlign:"center",color:"#b0a590",fontSize:mob?11:13,fontWeight:600,marginTop:mob?4:8}}>마음에 드는 비둘기를 {mob?"터치":"클릭"}하세요!</p>
        </div>
      )}

      {/* WINNER */}
      {screen==="winner"&&champ&&(
        <div style={{...fh,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:mob?"20px 14px":"2rem",position:"relative",zIndex:1}}>
          <div style={{animation:"popIn .5s ease-out",textAlign:"center",width:"100%"}}>
            <div style={{fontSize:mob?40:56,marginBottom:4}}>👑</div>
            <h2 style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?"1.2rem":"clamp(1.3rem,4vw,2rem)",color:"#2c2416",marginBottom:mob?12:18}}>우승 비둘기!</h2>
            <div className="wcard" style={{background:"#fff",borderRadius:mob?20:26,overflow:"hidden",maxWidth:mob?260:340,width:"100%",margin:"0 auto 20px",border:"3px solid #e8a838",boxShadow:"0 0 40px rgba(232,168,56,.2),0 8px 28px rgba(44,36,22,.1)"}}>
              <div style={{width:"100%",aspectRatio:"1",overflow:"hidden"}}>
                <img src={champ.img} alt={champ.name} onError={(e)=>{e.target.src=`https://placehold.co/400x400/e8e0d0/4a7c59?text=${encodeURIComponent(champ.name)}`;}} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
              <div style={{padding:mob?"12px 16px 16px":"18px 22px 22px",textAlign:"center"}}>
                <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?20:24,color:"#2c2416",marginBottom:2}}>{champ.name}</div>
                <div style={{fontSize:mob?12:14,color:"#8b7d6b",fontWeight:600}}>{champ.desc}</div>
                <div style={{marginTop:8,display:"inline-block",background:"linear-gradient(135deg,#e8a838,#d45f2e)",color:"#fff",fontFamily:"'Black Han Sans',sans-serif",fontSize:mob?11:13,borderRadius:50,padding:mob?"4px 14px":"5px 18px"}}>🏆 역대 우승 {stats[champ.id]?.wins||0}회</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn" onClick={start} style={{fontSize:mob?".9rem":"1.05rem",background:"#4a7c59",color:"#fff",borderRadius:50,padding:mob?"9px 22px":"11px 28px",boxShadow:"0 3px 14px rgba(74,124,89,.3)"}}>🔄 다시하기</button>
              <button className="btn" onClick={()=>setScreen("stats")} style={{fontSize:mob?".9rem":"1.05rem",background:"transparent",color:"#4a7c59",border:"3px solid #4a7c59",borderRadius:50,padding:mob?"7px 18px":"9px 24px"}}>📊 순위</button>
              <button className="btn" onClick={()=>setScreen("intro")} style={{fontSize:mob?".9rem":"1.05rem",background:"transparent",color:"#8b7d6b",border:"2px solid #ddd5c4",borderRadius:50,padding:mob?"7px 18px":"9px 24px"}}>🏠 홈</button>
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      {screen==="stats"&&<Stats stats={stats} onHome={()=>setScreen("intro")} onStart={start} mob={mob}/>}
    </div>
  );
}
