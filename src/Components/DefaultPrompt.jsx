function DefaultPrompt() {

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

  return(

    cardsData.map((cardsData,i)=> {
      return (
        <div key={i} onClick={cardsData.onclick} className="flex flex-col bg-white/32 sm:w-65 sm:h-50 text-start p-2 rounded-xl cursor-pointer" style={{display:"flex"}}>
          <p className="text-[20px] p-2 sm:text-[25px]">{cardsData.emoji}</p>
          <p className="text-[15px] p-2 sm:text-[19px]">{cardsData.prompt}</p>
        </div>
      )
    })
  )
}

export default DefaultPrompt;