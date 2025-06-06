import { useState } from 'react';
import './SignIn.module.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {Signin,auth,createCollectionUsers} from '../Utility/Firebase/Firebase.utils';
import {useAuthState} from 'react-firebase-hooks/auth';
  
function UserLogin() {

  const[Active,setActive] = useState(true);
  const[user] = useAuthState(auth);
  const signinFun = async () => {
    const res = await Signin();
    createCollectionUsers(res.user);
  }

  return (
    <div className='flex items-center justify-center flex-col mt-4'>
      <div className='flex gap-30'>
        <div><input checked={ Active} onChange={() => setActive(true) } type='radio' name='sign' className='cursor-pointer w-15 mt-2 opacity-0 absolute'/><span>Sign Up</span></div>
        <div><input checked={!Active} onChange={() => setActive(false)} type='radio' name='sign' className='cursor-pointer w-15 mt-2 opacity-0 absolute'/><span>Sign In</span></div>
      </div>
      <div>
        {Active ? <SignUp/> : <SignIn signIn={signinFun}/> }
      </div>
    </div>
  );
}

export default UserLogin;
