function DefaultPrompt({emoji,prompt,onclick}) {
  return(
    prompt && <div onClick={onclick} className="bg-white/32 sm:w-65 sm:h-50 text-start p-2 rounded-xl cursor-pointer" style={{display:"flex"}}>
      <p className="text-[20px] p-2 sm:text-[25px]">{emoji}</p>
      <p className="text-[15px] p-2 sm:text-[19px]">{prompt}</p>
    </div>
  )
}

export default DefaultPrompt;