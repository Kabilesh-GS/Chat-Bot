import { useState } from "react";
import { createUserWithEmail,createCollectionUsers } from '../Utility/Firebase/Firebase.utils'

const defaultForm = {
  displayName:'',
  email: '',
  password: '',
  confirmPassword: ''
};

function SignUp() {

  const[Form,setForm] = useState(defaultForm);
  const {displayName, email, password, confirmPassword } = Form;
  
  const handleChange = (e) => {
    const {name,value} = e.target;

    setForm({...Form,[name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert('Password do not match');
      return;
    }

    try{
      const u = await createUserWithEmail(email,password);
      const users = u.user;

      await createCollectionUsers(users, {displayName})
    }
    catch(error){
      console.log('user creation encountered an arror', error);
    }
  }

  return (
    <div className='flex flex-col items-center mt-5'>
      <p>Don't have an account</p>
      <p>Register with your E-mail !</p>
      <form className='flex flex-col mt-5 w-70' onSubmit={handleSubmit}>
        <label className="text-[18px]">Name</label>
        <input type='text' required className="bg-white p-1 mb-2.5 rounded-lg" onChange={handleChange} placeholder="Display Name" value={displayName} name="displayName"/>

        <label className="text-[18px]">E-mail</label>
        <input type='email' required className="bg-white mb-2.5 p-1 rounded-lg" onChange={handleChange} placeholder="E-mail" value={email} name="email"/>

        <label className="text-[18px]">Password</label>
        <input type='password' required className="bg-white mb-2.5 p-1 rounded-lg" onChange={handleChange} placeholder="Password" value={password} name="password"/>

        <label className="text-[18px]">Confirm Password</label>
        <input type='password' required className="bg-white mb-4 p-1 rounded-lg" onChange={handleChange} placeholder="Confirm Password" value={confirmPassword} name="confirmPassword"/>

        <button type='submit' className='cursor-pointer bg-black text-white p-3 rounded-xl'>Register</button>
      </form>
    </div>
  )
}

export default SignUp