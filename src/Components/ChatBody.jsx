import React, { useState } from 'react'
import Chatsty from './ChatBody.module.css'

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
          { final &&
            <p className="text-right bg-blue-500 mt-3 pr-4 p-1.5 mr-4 ml-120 rounded-lg">{final}</p>
          }
          <p className="text-left bg-blue-800 mr-100 ml-4 p-1.5 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nulla atque voluptatibus accusantium est repellat consequuntur repellendus aperiam dolorem. Iusto in ad autem temporibus a molestiae porro facilis libero mollitia.</p>
        </div>
        <div className="flex flex-row  items-center">
          <input 
          onKeyDown={handleKeyDown}
            value={ourMsg}
            onChange={(e)=>setourMsg(e.target.value)}
            className="bg-stone-700 mt-3 mb-4 border-2 border-white text-white text-lg rounded-xl block w-170 p-2.5 focus:ring-0 focus:ring-offset-0 outline-none" 
          />
          <button type="button" className="bg-white hover:bg-gray-200 rounded-lg p-3" onClick={handleGenerate}>Generate</button>
        </div>
      </div>
    </div>
  )
}

export default ChatBody