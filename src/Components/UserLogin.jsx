import { useState,useEffect } from 'react';
import './SignIn.module.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {Signin,auth,createCollectionUsers} from '../Utility/Firebase/Firebase.utils';
import {useAuthState} from 'react-firebase-hooks/auth';
  
function UserLogin() {

  const SignUpHandle = () => {
    document.getElementById('signUp').style.backgroundColor = '#3bb536';
    document.getElementById('signIn').style.backgroundColor = '';
  }

  const SignInHandle = () => {
    document.getElementById('signIn').style.backgroundColor = '#3bb536';
    document.getElementById('signUp').style.backgroundColor = '';
  }

  const[Active,setActive] = useState(true);
  const[user] = useAuthState(auth);
  const signinFun = async () => {
    const res = await Signin();
    createCollectionUsers(res.user);
  }

  useEffect(() => {
  if (Active) {
    SignUpHandle();
  } else {
    SignInHandle();
  }
}, [Active]);

  return (
    <div className='flex items-center justify-center flex-col mt-4'>
      <div className='flex gap-20'>
        <div><input checked={ Active} onClick={SignUpHandle} onChange={() => setActive(true) } type='radio' name='sign' className='cursor-pointer ml-5 w-15 mt-2 opacity-0 absolute'/><span id='signUp' className='rounded-lg py-1 px-5'>Sign Up</span></div>
        <div><input checked={!Active} onClick={SignInHandle} onChange={() => setActive(false)} type='radio' name='sign' className='cursor-pointer ml-5 w-15 mt-2 opacity-0 absolute'/><span id='signIn' className='rounded-lg py-1 px-5'>Sign In</span></div>
      </div>
      <div>
        {Active ? <SignUp/> : <SignIn signIn={signinFun}/> }
      </div>
    </div>
  );
}

export default UserLogin;
