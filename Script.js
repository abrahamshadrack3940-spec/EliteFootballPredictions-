/*
EFP kenya_script.js
-works offline with local
predictions.json & ads.json
-Use real API-KEY to enable l8ve
flashcore & jackpot endpoints 
*/

const API-KEY=
"YOUR_API_KEY_HERE";//<--insert YOUR_API Key if available
const FLASH_SCORE_URL="https://api.sportdb.dev/api/flashcore/"; // sample 
service
const SPORTPESA_ JACKPOT_URL=
"https://api.sportdb.dev/api/sportpesa/jackpot";
const BETIKA_JACKPOT_URL="https://api.sportdb.dev/api/betika/jackpot";

const mpesaNumber=
"+254710372612"

/*UTIL*/
function el(id){return
document.getElementById(id)}
function createEl( tag,cls){const e=
document.createElement(tag);if(cls)
e.className=cls;return e;}
function safeText(s){return Strings(s ??
"");}

/*COPY MPESA NUMBER*/
el("mpesa Number").inner text=
mpesaNumber;
el("copyBtn").addEventListener("click", 
async ()=> {
  try{
    await navigator.clipboard.writeText(mpesaNumber);
    el("copyBtn").innerText="copied";
    setTimeout(()=>
    el(copyBtn).innerText="copy Number",2000);
  }catch (err) {
    alert("copy failed-please copy 
    manually: "+mpesaNumber);
  }
   });
   
   /*RENDER LIVE MATCHES (fallback to
   local if API fails)*/
async function loadLiveMatches(){
  const container=el("live-matches");
  container.innerHTML="";
  try{
    const res=await fetch ($
    {"https://api.sportdb.dev/api/flashcore/"}? api KEY={"https://api.sportdb.dev/api/flashcore/"});
    if(!res.ok) throw new Error("Remote
    API failed");
    const data=await res.json();
    //assume data.matches array
    (data.matches ||
    □).slice(0,12).forEach(m=>{
      const card=createEl("div", "match");
      const teams=createEl("div",:"teams");
      teams.innerHTML= <div>$
      {safeText(m.home)} <Span
      style="opacity:.7">vs</span> $
      {safeText(m.away)}</div><div
      style="font-size:.8rem;color:
      rgba(255,255,255,.6)">$ {safeText(m.league || "")}</div>;
  const score=createEl("div","score");
  score.innertext=m.score || m.status
  || "_";
     card.appendChild(teams);
     card.appendChild(score);
     container.appendChild(card);
    });
if((data.matches || □).length===
0)container.innerHTML="div
class='card'>No live matches right
now.</div>";
}catch (err) {
  //fallback:try local predictions to 
  show something
  try{
    const local=await fetch ("predictions
    .json").then(r=>r.json());
    container.appendChild(())=> {
      const
  f=document.createElement("div");
  f.className="card"; f.innerHTML=
  "<Strong>live fallback (predictions
  file)</Strong>";
     local.slice(0.4).forEach(p=> {
     const row=
  document.createElement("div");
  row.className="match";row.innerHTML
  =<div Class="teams">$
  {p.match}</div>div
  class="score">${p.prediction
  || p.tip || ""}</div>;
      f.appendChild(row);
     });
     return f;
    })());
  }catch(e){
    container.innerHTML="<div
   class='card'>live Matches unavailable.</
   div>";
     }
  }
}

/*LOAD PREDICTIONS (local file)*/
async function loadPredictions()}
const container=el("predictions");
container.innerHTML="";
try{
  const data=await fetch("predictions.json").then(r=>r.json());
  data.slice(0,20).forEach (item=> {
    const c=createEl("div", "prediction
    card");
    c.innerHTML='<div
    class="prediction><div> 
        <div
style="font-weight:700">$
{safeText(item.match)}</div>
     </div>
     <div style="text-aligh:right">
     <div style="font-weight:
 900;color:var(--accent-2)">$
 {safeText(item.confidence || item.odd "")}</div>
            </div></div>';
   container.appendChild(c);
  });
}catch(err) {
  container.innerHTML="<div
  class='card'>Predictions not available.</
  div>";
 }
}

/*LOAD PAYABLE ADS*/
async function loadAds(){
  const container=el("ads");
  container.innerHTML="";
  try{
    const ads=await 
    fetch("ads.json").then(r=>r.json());
    ads.forEach(ad=>{
      const box=createEl("div","ad-pay
  card");
  box.innerHTML='<div.style="flex:1">
       <div
style="font-weight:800">$
{safeText(ad.title || "VIP Ad")}</div>
       <div
style="opacity:.8;font-size:.92rem">$
{safeText(ad.message)}</div>
       </div>
       <div
style="min-width:140px,text-aligh:right">
              <div style="font-weight:900
    :color:var(--gold)">${safeText(ad.price)}KES</div>
           <div
    style="margin-top:8px">
             <a class="btn"
  href="https://wa.me/254710372612
  ?text=${encode URIComponent("Hi,
  i want to buy:'+(ad.title || 'VIP'))}"
  target="_blank">Pay/ Contact</a>
           </div>
           </div>';
   container.appendChild(box);
   });
  if(ads.length=== 0)
  container.innerHTML="<div
  class='card'>No ads at the moment.</
  div>';
  } catch (err) {
    container.innerHTML="<div
    class='card'>Ads Unavailable</div>";
    }
  }
  
  /*LOAD JACKPOTS (Sportpesa &
  Betika)*/
  async function loadJackpots(){
  // Sportpesa
  const sEL= el("sportpesa-jackpot").
  querySelector(".jack-body") ||
  el("sportpesa-jackpot").appendChild(createEl)("div","jack-body"));
    const bEL=el("betika-jackpot").querySelector(".jack-body") || el("betika-jackpot").
    appendChild(createEl("div", "jack-body"));
    sEl.innerHTML="loading...";
    bEl.innerHTML="loading...";
    //Try remote endpoints(requires
    API_KEY)
    try{
      const[sRes,bRes]=await Promise.all([
      fetch($
   {SPORTPESA_JACKPOT_URL="https://api.sportdb.dev/api/sportpesa/jackpot"}?
   api_key=$ {API KEY} ),
   fetch($
   {BETIKA_JACKPOT_URL="https://api.sportdb.dev/api/betika/jackpot"}?
   api_key=$ {API_KEY} )
   ]);
   if(sRes.ok){
     const sData=await sRes.json();
     renderjack(sEl, sData.games || sData
     || □);
   }else {
     sEl.innerHTML="Sportpesa Jackpot
     unavailable (remote).";
   }
   if(b.Res.ok){
     const bData=await bRes.json();
     render jack(bEl, bData.games || bData
     ||□);
     }else {
       bEl.inmerHTML="Betika Jackpot
       unavailable(remote).";
   }
    }catch (e){
      //fallback:show placeholder
      sEl.innerHTML=<div
      class="card">sportpesa data 
      unavailable. Subscribe for VIP.</div>;
      bEl.innerHTML=<div
      class="card">Betika data 
      unavailable. Subscribe for VIP.</div>;
    }
    
    function renderjack (elNode, arr){
      if(!arr || arr.length=== 0){
        elNode.innerHTML=<div
        class='card'>No Jackpot games found.</div>";
        return;
      }
      elNode.innerHTML="";
      arr.slice(0.8).forEach(g=>{
        const row=createEl("div", "match");
        row.innerHTML='<div
        style="font-weight:700">$
        {safeText(g.home)} <span
        style="opacity:.6">vs</span> $
        {safeText(g.away)}</div>
                <div style="text-aligh:right;colorvar(--accent-2)">$ safeText(g.market || g.type || )}</div>';
          elNode.appendChild(row);
      });
    }
   }
   
   /*INITIAL load +auto-refresh*/
   async function start (){
     el("year").innerText=new
     Date().getFullYear();
     awaitPromise.all([loadLiveMatches(),
     load Predictions(), loadAds(),
     loadJackpots()]);
     //refresh live & jackpots every 30s, ads/pred every 2m
     setInterval(loadLiveMatches, 30000);
     setInterval(loadjackpots, 30000);
     setInterval(loadAds, 12000);
     setInterval(loadPredictions, 12000);
   }
   //Fetch Sportpesa Jackpot
   async function loadSportpesaJackpot()
   {
     const container=document.getElement
     Byid("Sportpesa-jackpot");
     try{
       let response=await Fetch("/api/sportpesa");
       let data=await response.json();
       
       container.innerHTML="";
       data.forEach(match=> {
         container.innerHTML+= '
         <div class="jp-item">
         <p><strong>${match.home}</strong> vs <strong>${match.away}</strong></p>
         <p>prediction:$
         {match.prediction}</p>
         </div>
         ';
       });
       
     } catch.(error) {
       container.innerHTML="<p> Error
       fetching Sportpesa Jackpot.</div>"
     }
   }
   
   //Fetch Betika jackpot
   async function loadBetika Jackpot() {
     const container=document.getElement
     Byid("Betika-jackpot");
     
     try{
       let response=await fetch ("api/
       betika");
       let data=await response.json();
       
       container.innerHTML="";
       data.forEach(match=>{
         container.innerHTML+='
         <div class="jp-item">
         <p><strong>${match.home}</strong>vs <strong>${match.away}</strong></p>
         <p>prediction: $
         {match.prediction}</p>
         </div>
         ';
       });
     }catch(error) {
       container.innerHTML="<p>Error 
       fetching Betika jackpot.</p>";
     }
   }
   
   //Auto-load jackpots on page load window.onload=function() {
     loadSportpesa.Jackpot();
     loadBetikaJackpot();
   };
   
   start();
    }
  
  
  
       
    }
    )
  }
}
     
  }
  
}
  
  
    }
  }

    
      
      
    
      }"
      "
    })
  }
}