import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Chatsty from "./ChatBody.module.css";
import DefaultPrompt from "./DefaultPrompt";
import { BsArrowUpSquareFill } from "react-icons/bs";
import {
  getUserDetails,
  sendMessage,
  auth,
  listenMessage,
} from "../Utility/Firebase/Firebase.utils";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatBody({ ImageURL }) {
  const [ourMsg, setourMsg] = useState("");
  const [userData, setUserData] = useState(null);
  const [currentlyLogged] = useAuthState(auth);
  const [messagesFromStore, setMessagesFromStore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentlyLogged?.uid) return;

    const unsubscribe = listenMessage(
      currentlyLogged.uid,
      setMessagesFromStore
    );
    return () => unsubscribe();
  }, [currentlyLogged.uid]);

  if (messagesFromStore.length != 0) {
    document.getElementById("welcomeText").innerHTML = "";
    document.getElementById("welcomeText").style.marginTop = "0px";
  }

  useEffect(() => {
    const fetchDetails = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const data = await getUserDetails(user.uid);
        setUserData(data);
      }
    };
    fetchDetails();
  }, []);

  const handleGenerate = async () => {
    if (ourMsg.trim() === "") {
      const timeoutmsg = document.getElementById("errormsg");
      timeoutmsg.innerHTML = "Please enter a prompt";
      setTimeout(() => {
        timeoutmsg.innerHTML = "";
      }, 5000);
      return;
    }

    setourMsg("");
    setIsLoading(true);
    try {
      document.getElementById("welcomeText").innerHTML = "";
      document.getElementById("welcomeText").style.marginTop = "0px";

      await sendMessage(currentlyLogged.uid, ourMsg, "user");
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_APP_API_KEY
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: ourMsg }] }],
        },
      });
      const resp =
        response.data.candidates[0].content.parts[0].text ||
        "No response received";
      await sendMessage(currentlyLogged.uid, resp, "AI");
    } catch (error) {
      console.error("Error : ", error);
      await sendMessage(
        currentlyLogged.uid,
        "Error, Failed to get response!",
        "AI"
      );
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        handleGenerate();
      }
    }
  };

  const handleClick = (prompt) => {
    setourMsg(prompt);
  };

  return (
    <div className={Chatsty.frame}>
      <h1 id="chatName" className="absolute top-0 text-emerald">
        {userData?.displayName || "..."}'s Chat
      </h1>
      <div className={Chatsty.body}>
        <div id="welcomeText" className={Chatsty.Welcome}>
          <p className={Chatsty.welc}>
            Hello {userData?.displayName || "..."}!
          </p>
          <p className={Chatsty.welcQues}>How can I help you?</p>
          <div className={Chatsty.defatutprom}>
            <DefaultPrompt OnClick1={handleClick} />
          </div>
          &nbsp;
          <p className="text-red text-sm text-red-400" id="errormsg"></p>
        </div>

        <div className="rounded-xl overflow-y-auto">
          {messagesFromStore.map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === "user" ? Chatsty.sender : Chatsty.ai}
            >
              <ReactMarkdown
                className={`${
                  msg.sender === "user"
                    ? "text-md max-w-160 text-end text-emerald bg-white mt-3 px-4 p-1.5 mr-5 ml-auto rounded-sm whitespace-pre-wrap break-words"
                    : "text-lg min-w-auto max-w-230 text-start text-emerald bg-sky px-3 border-l-4 border-indigo rounded-sm break-words whitespace-pre-wrap ml-4 p-1.5 mt-3"
                }`}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className={Chatsty.ai}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 0",
                }}
              >
                <span className={Chatsty.loader} style={{ marginLeft: "15px" }}></span>
                <span style={{ color: "black" }}>AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className={Chatsty.inputcont}>
          <textarea
            onKeyDown={handleKeyDown}
            value={ourMsg}
            placeholder="Ask anything"
            onChange={(e) => setourMsg(e.target.value)}
            className="bg-stone-700 mt-2 mb-2 pl-4 resize-none border-emerald placeholder-stone text-emerald text-lg rounded-sm block w-170 h-13 p-2.5 focus:ring-none focus:ring-offset-0 bg-teal outline-none"
          />
          <button
            type="button"
            className={Chatsty.sendbtn}
            onClick={handleGenerate}
          >
            <BsArrowUpSquareFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBody;
