import InputForm from './InputForm';
import { useState } from 'react';
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

  const resetForm = () => {
    setForm(defaultForm);
  }
  
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
      await createCollectionUsers(users, {displayName});
      resetForm();
    }
    catch(error){
      console.log('user creation encountered an arror', error);
    }
  }

  return (
    <div className='flex flex-col items-center mt-5'>
      <p>Don't have an account,</p>
      <p>Register with your E-mail!</p>
      <form className='flex flex-col mt-0 w-70' onSubmit={handleSubmit}>
        <InputForm label="Name" 
          inputOptions={{
            type: 'text',
            required : true,
            onChange : handleChange ,
            value : displayName,
            name: 'displayName',
            placeholder : 'Display Name'
          }}
        />
        <InputForm label="E-mail" 
          inputOptions={{
            type: 'email',
            required : true,
            onChange : handleChange ,
            value : email,
            name: 'email',
            placeholder : 'E-mail'
          }}
        />
        <InputForm label="Password" 
          inputOptions={{
            type: 'password',
            required : true,
            onChange : handleChange ,
            value : password,
            name: 'password',
            placeholder : 'Password'
          }}
        />
        <InputForm label="Confirm Password" 
          inputOptions={{
            type: 'password',
            required : true,
            onChange : handleChange ,
            value : confirmPassword,
            name: 'confirmPassword',
            placeholder : 'Confirm Password'
          }}
        />

        <button type='submit' className='cursor-pointer bg-black mt-8 text-white p-3 rounded-xl'>Register</button>
      </form>
    </div>
  )
}

export default SignUp