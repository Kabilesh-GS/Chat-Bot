import { useState,useEffect } from 'react';
import './SignIn.module.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {Signin,auth,createCollectionUsers} from '../Utility/Firebase/Firebase.utils';
import {useAuthState} from 'react-firebase-hooks/auth';
  
function UserLogin() {

  const SignUpHandle = () => {
    document.getElementById('signUp').style.backgroundColor = '#41bd47';
    document.getElementById('signIn').style.backgroundColor = '';
  }

  const SignInHandle = () => {
    document.getElementById('signIn').style.backgroundColor = '#41bd47';
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
      <div className='flex gap-5'>
        <div className='w-80 flex justify-center' id='signUp'><input checked={ Active} onClick={SignUpHandle} onChange={() => setActive(true) } type='radio' name='sign' className='cursor-pointer w-15 mt-4 opacity-0 absolute'/><span className='rounded-lg py-2'>Sign Up</span></div>
        <div className='w-80 flex justify-center' id='signIn'><input checked={!Active} onClick={SignInHandle} onChange={() => setActive(false)} type='radio' name='sign' className='cursor-pointer w-15 mt-4 opacity-0 absolute'/><span className='rounded-lg py-2'>Sign In</span></div>
      </div>
      <div>
        {Active ? <SignUp/> : <SignIn signIn={signinFun}/> }
      </div>
    </div>
  );
}

export default UserLogin;
