import React from 'react'
import Chatsty from './ChatBody.module.css'

function ChatBody() {
  return (
    <div className={Chatsty.frame}>
      <div className={Chatsty.body}>
        <div className="h-full bg-red-600 rounded-xl overflow-y-auto">
          <p className="text-right bg-blue-500 mt-3 pr-4 p-1.5 mr-4 ml-120 rounded-lg">hi</p>
          <p className="text-left bg-blue-800 mr-100 ml-4 p-1.5 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nulla atque voluptatibus accusantium est repellat consequuntur repellendus aperiam dolorem. Iusto in ad autem temporibus a molestiae porro facilis libero mollitia.</p>
        </div>
        <div className="flex items-center">
          <input 
            className="bg-stone-700 mt-3 mb-4 border-2 border-white text-white text-lg rounded-xl block w-170 p-2.5 focus:ring-0 focus:ring-offset-0 outline-none" 
          />
        </div>
      </div>
    </div>
  )
}

export default ChatBody