import React, { useState } from 'react'
import Chatsty from './ChatBody.module.css'
import { FaArrowCircleUp } from "react-icons/fa"

function ChatBody() {

  const [ourMsg,setourMsg] = useState("");
  const [final,setfinal] = useState("");
  
  const handleGenerate = () => {
    if (ourMsg.trim() === "") {
      window.alert("Please enter a message");
    } 
    else{
      setfinal(ourMsg);
      setourMsg("");
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
            <p className="text-right text-md text-emerald bg-white mt-3 pr-4 p-1.5 mr-4 ml-120 rounded-lg">{final}</p>
          }
          <p className="text-left text-emerald text-lg border-l-4 border-indigo rounded-lg bg-sky mr-100 ml-4 p-1.5 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nulla atque voluptatibus accusantium est repellat consequuntur repellendus aperiam dolorem. Iusto in ad autem temporibus a molestiae porro facilis libero mollitia.</p>
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