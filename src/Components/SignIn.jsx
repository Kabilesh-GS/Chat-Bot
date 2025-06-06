import GoogleIcon from '../assets/google.svg';

function SignIn({signIn}) {

  return (
    <div>
      <p>SignIn with your account</p>
        <div className='flex items-center justify-center'>
        <button onClick={signIn} className='cursor-pointer w-[200px] active:scale-90 flex gap-2 justify-center p-3 border border-gray-300 transition-all duration-100 rounded-lg mt-4 hover:bg-blue-100 hover:rounded-[20px] transition' >
          <img src={GoogleIcon} alt="Google" className='w-6 h-6' />
          <span>Google</span>
        </button>
      </div>
    </div>
  )
}

export default SignIn