function DefaultPrompt({OnClick1}) {

  const cardsData = [
    {
      prompt : "Write a code in java to sort an array with minimun time and space complexity",
      emoji : "🧑‍💻",
    },
    {
      prompt : "Explain about the concept of big-bang theory and how universe was created",
      emoji : "🤯",
    },
    {
      prompt : "What is the difference between AI, ML, and Deep Learning?",
      emoji : "🤖",
    },
  ];

  return(

    cardsData.map((cardsData,i)=> {
      return (
        <div key={i} onClick={() => OnClick1(cardsData.prompt)} className="flex flex-col bg-white/32 sm:w-65 sm:h-50 text-start p-2 rounded-sm cursor-pointer" style={{display:"flex"}}>
          <p className="text-[20px] p-2 sm:text-[25px]">{cardsData.emoji}</p>
          <p className="text-[15px] p-2 sm:text-[19px]">{cardsData.prompt}</p>
        </div>
      )
    })
  )
}

export default DefaultPrompt;