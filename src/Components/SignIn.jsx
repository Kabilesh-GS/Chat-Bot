import GoogleIcon from '../assets/google.svg';
import InputForm from './InputForm';
import { signinWithEmailPass } from '../Utility/Firebase/Firebase.utils'
import { useState } from 'react';

const defaultForm = {
  displayName:'',
  email: '',
  password: '',
  confirmPassword: ''
};

function SignIn({signIn}) {

  const[Form,setForm] = useState(defaultForm);
  const {email, password } = Form;

    const resetForm = () => {
      setForm(defaultForm);
    }
    
    const handleChange = (e) => {
      const {name,value} = e.target;
  
      setForm({...Form,[name]: value});
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try{
        const response = await signinWithEmailPass(email,password);
        resetForm();
      }
      catch(error){
        console.log('user creation encountered an arror', error);
      }
    }

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
      <p className='mt-5'>SignIn with your account</p>
      <form onSubmit={handleSubmit} className='flex flex-col mt-0 w-70'>
        <InputForm label="Email" 
          inputOptions={{
            type: 'email',
            required : true,
            onChange: handleChange,
            placeHolder : 'Email',
            name: 'email',
            value : email
          }}
        />
        <InputForm label="Password" 
          inputOptions={{
            type: 'password',
            required : true,
            onChange: handleChange,
            placeHolder : 'Password',
            name: 'password',
            value : password
          }}
        />

        <button className='cursor-pointer bg-black mt-8 text-white p-3 rounded-xl' type='submit'>SignIn</button>
      </form>
    </div>
  )
}

export default SignIn