function DefaultPrompt({emoji,prompt,onclick}) {
  return(
    prompt && <div onClick={onclick} className="bg-white/32 w-65 h-55 text-start p-2 rounded-xl cursor-pointer" style={{display:"flex"}}>
      <p className="text-[25px] p-2">{emoji}</p>
      <p className="text-[19px] p-3">{prompt}</p>
    </div>
  )
}

export default DefaultPrompt;