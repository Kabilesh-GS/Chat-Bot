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
    <div className='flex flex-col items-center'>
      <p>Don't have an account</p>
      <p>Register with your E-mail !</p>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' required onChange={handleChange} value={displayName} name="displayName"/>

        <label>E-mail</label>
        <input type='email' required onChange={handleChange} value={email} name="email"/>

        <label>Password</label>
        <input type='password' required onChange={handleChange} value={password} name="password"/>

        <label>Confirm Password</label>
        <input type='password' required onChange={handleChange} value={confirmPassword} name="confirmPassword"/>

        <button type='submit' className='cursor-pointer'>Register</button>
      </form>
    </div>
  )
}

export default SignUp