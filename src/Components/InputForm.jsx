function InputForm({label,inputOptions}) {
  return (
    <div className="flex flex-col justify-center items-center">
      { label && (
        <label className="opacity-0">{label}</label>
      )}
      <input className="focus:outline-none bg-green-200 py-3.5 p-2.5 w-100 focus:border-b-2 border-black" {...inputOptions}/>
    </div>
  )
}

export default InputForm