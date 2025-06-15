import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Chatsty from './ChatBody.module.css'
import DefaultPrompt from './DefaultPrompt';
import { FaArrowCircleUp } from "react-icons/fa"
import { MdOutlineLogin } from "react-icons/md";
import {Signout,getUserDetails} from '../Utility/Firebase/Firebase.utils';
import { getAuth } from 'firebase/auth';

function ChatBody({ImageURL}) {
  const [ourMsg,setourMsg] = useState("");
  const [final,setfinal] = useState("");
  const [ResponseMsg,setResponseMsg] = useState("");
  const [userData,setUserData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const data = await getUserDetails(user.uid);
        setUserData(data);
      }
    };
    fetchDetails();
  },[])
  
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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_APP_API_KEY}`,
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

  return (
    <div className={Chatsty.frame}>
      <button onClick={Signout} className='cursor-pointer hover:scale-120 active:scale-90 transition-all duration-100 left-[15px] w-[30px] absolute top-[15px]'><MdOutlineLogin className='text-[25px]' style={{color: '#81c784'}}/></button>
      <div className={Chatsty.body}>

        <div id='welcomeText' className={Chatsty.Welcome}>
          <p className={Chatsty.welc}>Hello {userData?.displayName || '...'}!</p>
          <p className={Chatsty.welcQues}>How can I help you?</p>
          <div className={Chatsty.defatutprom}>
            <DefaultPrompt />
          </div>
          &nbsp;
          <p className='text-red text-sm text-red-400' id='errormsg'></p>
        </div>

        <div className="rounded-xl overflow-y-auto">
          {final && (
            <div className={Chatsty.sender}>
              <ReactMarkdown className="text-md max-w-160 text-end text-emerald bg-white mt-3 px-4 p-1.5 mr-5 ml-auto rounded-lg whitespace-pre-wrap break-words">{final}</ReactMarkdown>
            </div>
          )}
          {ResponseMsg && (
            <div className={Chatsty.ai}>
              <ReactMarkdown className="text-lg min-w-auto max-w-250 text-start text-emerald bg-sky px-3 border-l-4 border-indigo rounded-lg break-words whitespace-pre-wrap ml-4 p-1.5 mt-3">{ResponseMsg}</ReactMarkdown> 
            </div>
          )}
        </div>

        <div className={Chatsty.inputcont}>
          <textarea
            onKeyDown={handleKeyDown}
            value={ourMsg}
            placeholder='Ask anything'
            onChange={(e)=>setourMsg(e.target.value)}
            className="bg-stone-700 mt-2 mb-2 pl-4 resize-none border-emerald placeholder-stone text-emerald text-lg rounded-full block w-170 h-13 p-2.5 focus:ring-none focus:ring-offset-0 bg-teal outline-none" 
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