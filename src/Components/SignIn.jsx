import './SignIn.module.css';
import GoogleIcon from '../assets/google.svg';

function SignIn({ signIn }) {
  return (
    <div style={{ padding: '2rem', borderRadius: '8px' }}>
      <h3 className='text-center text-[30px]'>Sign In to continue</h3>
      <button
        onClick={signIn}
        className='cursor-pointer flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-lg mt-4 hover:bg-blue-100 transition'
      >
        <img src={GoogleIcon} alt="Google" className='w-6 h-6' />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default SignIn;
