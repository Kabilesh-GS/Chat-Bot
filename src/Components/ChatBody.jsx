import React, { useState } from 'react'
import Chatsty from './ChatBody.module.css'
import { FaArrowCircleUp } from "react-icons/fa"
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

function ChatBody() {

  const [ourMsg,setourMsg] = useState("");
  const [final,setfinal] = useState("");
  const [ResponseMsg,setResponseMsg] = useState("");
  
  const handleGenerate = async () => {
    setResponseMsg("Typing...");
    if (ourMsg.trim() === "") {
      alert("Please enter a message");
      return;
    } 

    setfinal(ourMsg);
    setourMsg("");

    try{
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_APP_API_KEY}`,
        method: "post",
        data : {
          "contents": [{ "parts":[{"text": ourMsg}]}],
        }
      });
      setResponseMsg(response.data.candidates[0].content.parts[0].text || 'No response received');
    }
    catch(error){
      console.error('Error : ', error);
      setResponseMsg('Failed to get a response.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };


  return (
    <div className={Chatsty.frame}>
      <div className={Chatsty.body}>
        <div className="h-full rounded-xl overflow-y-auto">
          {final &&
            <p className="text-right text-md text-emerald bg-white mt-3 pr-4 p-1.5 mr-4 ml-120 rounded-lg break-words">{final}</p>
          }
          {ResponseMsg &&
            <ReactMarkdown className="text-left text-emerald text-lg border-l-4 border-indigo rounded-lg bg-sky break-words whitespace-pre-wrap mr-100 ml-4 p-1.5 mt-3">{ResponseMsg}</ReactMarkdown> 
          }
        </div>
        <div style={{display: "flex",justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
          <input 
          onKeyDown={handleKeyDown}
            value={ourMsg}
            placeholder='Ask anything'
            onChange={(e)=>setourMsg(e.target.value)}
            className="bg-stone-700 mt-3 mb-4 border-emerald placeholder-stone text-emerald text-lg rounded-xl block w-170 p-2.5 focus:ring-none focus:ring-offset-0 bg-teal outline-none" 
          />
          <button 
            type="button" 
            className="flex justify-center bg-cyan text-white hover:bg-cyan-50 rounded-lg p-3 h-12 text-2xl w-15 ml-7" 
            onClick={handleGenerate}>
          <FaArrowCircleUp /></button>
        </div>
      </div>
    </div>
  )
}

export default ChatBody