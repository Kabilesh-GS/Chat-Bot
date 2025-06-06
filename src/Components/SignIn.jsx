import GoogleIcon from '../assets/google.svg';

function SignIn({signIn}) {

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mt-5'>
        <p>SignIn with Google</p>
        <button onClick={signIn} className='cursor-pointer w-[200px] active:scale-90 flex gap-2 justify-center px-3 py-2 border border-gray-300 transition-all duration-100 rounded-[15px] hover:scale-103 mt-2 hover:bg-blue-100 transition' >
          <img src={GoogleIcon} alt="Google" className='w-6 h-6' />
          <span>Google</span>
        </button>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <div className='bg-black h-[2px] w-[110px] opacity-25 mr-3'></div><span>OR</span><div className='bg-black h-[2px] w-[110px] opacity-25 ml-3'></div>
      </div>
      <form onSubmit={() => {}} className='flex flex-col mt-5 w-70'>
        <lable className="text-[18px]">E-mail</lable>
        <input type='email' className="bg-white mb-2.5 p-1 rounded-lg" placeholder='E-mail'/>
        <lable className="text-[18px]">Password</lable>
        <input type='password' className="bg-white mb-2.5 p-1 rounded-lg" placeholder='Password'/>

        <button className='cursor-pointer bg-black text-white p-3 rounded-xl' type='submit'>SignIn</button>
      </form>
    </div>
  )
}

export default SignIn