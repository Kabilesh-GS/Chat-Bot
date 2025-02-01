import React from 'react'
import Chatsty from './ChatBody.module.css'

function ChatBody() {
  return (
    <div className={Chatsty.frame}>
      <div className={Chatsty.body}>
        <div className={Chatsty.out}>hi</div>
        <div className={Chatsty.in}>
          <input />
        </div>
      </div>
    </div>
  )
}

export default ChatBody