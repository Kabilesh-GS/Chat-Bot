import React from 'react'
import Chatsty from './ChatBody.module.css'

function ChatBody() {
  return (
    <div className={Chatsty.frame}>
      <div className={Chatsty.body}>
        <div className={Chatsty.out}>hi</div>
        <div className={Chatsty.in}>
          <input className="bg-stone-700 border border-white text-white text-lg rounded-xl block w-170 p-2.5 focus:ring-0 focus:ring-offset-0 outline-none" />
        </div>
      </div>
    </div>
  )
}

export default ChatBody