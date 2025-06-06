import { useState } from 'react';
import './SignIn.module.css';
import GoogleIcon from '../assets/google.svg';
import SignUp from './SignUp';
import SignIn from './SignIn';

function UserLogin({ signIn }) {

  const[Active,setActive] = useState(true);

  return (
    <div style={{ padding: '2rem', borderRadius: '8px' }}>
      <h3 className='text-center text-[30px]'>Sign In to continue</h3>
      <div className='flex items-center justify-center'>
        <button
          onClick={signIn}
          className='cursor-pointer w-[200px] active:scale-90 flex gap-2 justify-center p-3 border border-gray-300 transition-all duration-100 rounded-lg mt-4 hover:bg-blue-100 hover:rounded-[20px] transition'
        >
          <img src={GoogleIcon} alt="Google" className='w-6 h-6' />
          <span>Google</span>
        </button>
      </div>
      <div className='flex items-center justify-center flex-col'>
        <span>OR</span>
        <div className='flex'>
          <input checked={Active} onChange={() => setActive(true)} type='radio' name='sign' className='cursor-pointer bg-grey'/>Sign Up
          <input name='sign' checked={!Active} type='radio' onChange={() => setActive(false)} className='cursor-pointer'/>Sign In
        </div>
        <div>
          {Active ? <SignUp/> : <SignIn/> }
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
