import React, { useState } from 'react'
import Chatsty from './ChatBody.module.css'
import { FaArrowCircleUp } from "react-icons/fa"
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import DefaultPrompt from './DefaultPrompt';
import {Signout} from '../Utility/Firebase/Firebase.utils';
import { MdOutlineLogin } from "react-icons/md";

function ChatBody({Username}) {

  const [ourMsg,setourMsg] = useState("");
  const [final,setfinal] = useState("");
  const [ResponseMsg,setResponseMsg] = useState("");
  
  const handleGenerate = async () => {
    if (ourMsg.trim() === "") {
      const timeoutmsg = document.getElementById('errormsg');
      timeoutmsg.innerHTML = "Please enter a prompt";
      setTimeout(() => {timeoutmsg.innerHTML = ""},5000);
      return;
    } 

    setfinal(ourMsg);
    setourMsg("");

    try{
      document.getElementById('welcomeText').innerHTML = "";
      document.getElementById('welcomeText').style.marginTop = "0px";

      setResponseMsg("Thinking...");
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
      if(e.shiftKey){
        return;
      }
      else{
        handleGenerate();
      }
    }
  };

  const cardsData = [
    {
      prompt : "Write a code in java to sort an array with minimun time and space complexity",
      emoji : "🧑‍💻",
      onclick :  ()=>setourMsg("Write a code in java to sort an array with minimun time and space complexity")
    },
    {
      prompt : "Explain about the concept of big-bang theory and how universe was created",
      emoji : "🤯",
      onclick :  ()=>setourMsg("Explain about the concept of big-bang theory and how universe was created")
    },
    {
      prompt : "What is the difference between AI, ML, and Deep Learning?",
      emoji : "🤖",
      onclick :  ()=>setourMsg("What is the difference between AI, ML, and Deep Learning?")
    },
  ];
  const cardDis = cardsData.map((cardsData,index) => { return <DefaultPrompt key={index} prompt={cardsData.prompt} emoji={cardsData.emoji} onclick={cardsData.onclick}/> })

  return (
    <div className={Chatsty.frame}>
      <div className={Chatsty.body}>
        <button onClick={Signout} className='cursor-pointer mx-5'><MdOutlineLogin className='text-[25px]'/></button>
        <div id='welcomeText' className={Chatsty.Welcome}>
          <p className={Chatsty.welc}>Hello {Username}!</p>
          <p className={Chatsty.welcQues}>How can I help you?</p>
          <div className={Chatsty.defatutprom}>
            {cardDis}
          </div>
          &nbsp;
          <p className='text-red text-sm text-red-400' id='errormsg'></p>
        </div>
        <div className="h-full rounded-xl overflow-y-auto">
          {final && (
            <div className={Chatsty.sender}>
              <ReactMarkdown className="text-md max-w-160 text-end text-emerald bg-white mt-3 px-4 p-1.5 mr-4 ml-auto rounded-lg whitespace-pre-wrap break-words">{final}</ReactMarkdown>
            </div>
          )}
          {ResponseMsg && (
            <div className={Chatsty.ai}>
              <ReactMarkdown className="text-lg max-w-200 text-start text-emerald bg-sky px-3 border-l-4 border-indigo rounded-lg break-words whitespace-pre-wrap ml-4 p-1.5 mt-3">{ResponseMsg}</ReactMarkdown> 
            </div>
          )}
        </div>
        <div className={Chatsty.inputcont}>
          <textarea
            onKeyDown={handleKeyDown}
            value={ourMsg}
            placeholder='Ask anything'
            onChange={(e)=>setourMsg(e.target.value)}
            className="bg-stone-700 mt-3 mb-4 pl-4 resize-none border-emerald placeholder-stone text-emerald text-lg rounded-full block w-170 h-13 p-2.5 focus:ring-none focus:ring-offset-0 bg-teal outline-none" 
          />
          <button 
            type="button" 
            className={Chatsty.sendbtn} 
            onClick={handleGenerate}>
          <FaArrowCircleUp /></button>
        </div>
      </div>
    </div>
  )
}

export default ChatBody