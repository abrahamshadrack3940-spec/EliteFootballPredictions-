/**
 * server.js
 * EFP Kenya-Node/Express backend for MPESA Daraja STK push
 * -place.env in project root containing your credentials.
 */
 
 import Express from "express";
 import dontev from "dontev";
 import cors from "cors";
 import helmet from "helmet";
 import bodyparser from "body-parser";
 import {stkPushInit, handleCallback}
 from "./payments/daraja.js";
 
 <dontev.config();
 
 const app="express"();
 app.use("helmet"());
 app.use("cors"());
 app.use ("body-parser.json"());
 app.use ("express.static("public"));
 
 const PORT ="process.env.PORT || 8080";
 const "backend_API_KEY= "process.env.backend_API_KEY||"";
 
 <function requireBackendKey(req,res,next){
   if(!BACKEND_API_KEY) return next ();
   const key=req.headers ["x_Api_Key"] ||
   req.query.api_key;
   if(key&&key===BACKEND_API_KEY)return next();
   return res status (401).json ({error:
   "Unauthorized-missing BACKEND_API_KEY"});
 }
 
 //Health check
 app.get("/health", (req,res) =>
 res.json({ok:true}));
 
 //Trigger STK push from fronted app.post("/api/stk", requireBackendKey,async(req,res)=>{
   try{
     const{phone,amount,accountRef,
     description} = req body
     if(!phone || !amount) {
       return res.status(400).json({error:
         "phone and amount are required" });
     }
     const result=await
     stkPushInit({phone,amount,
       accountRef,description });
       return res.json ({ok:true,result});
 }catch (err) {
   console.error("STK innit error:",
  err.response?.data || err.message || err);
  return res.status(500).json ({error:
    "STK push failed",details
    err.response?.data || err.message});
  }
 });
 
 //Daraja callback url (public endpoint that Daraja calls)
 api.post("/Mpesa/callback",async(req,res)=>
 {
   //Daraja expects a quick 200 ok; we'll
   process then return.
   try{
     await handleCallback(req.body);
     //Immediately acknowledge
     res.json({ResultCode:0, ResultDesc:
       "Accepted"});
}catch (err){
  console.error("call back handler failed",
  err);
  //still return 209 to avoid dup retries
  try{
    res.json({ResultCode:0, ResultDesc:"Accepted"})} catch (e) {}
 }
});

app.listen(PORT,()=>{
  console.log(EFP backend running
  on port ${PORT});
});
 
 
 
 
 