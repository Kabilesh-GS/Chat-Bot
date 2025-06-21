import Headersty from './Header.module.css'
import {Signout} from '../Utility/Firebase/Firebase.utils.js';
import { MdOutlineLogin } from "react-icons/md";
import { getAuth } from 'firebase/auth';

function Header() {
  const user = getAuth().currentUser;
  return (
    <div className={Headersty.div}>
      <h1>Chat ft.AI</h1>
      {user && (
        <button onClick={Signout} className='cursor-pointer hover:scale-120 active:scale-90 transition-all duration-100 w-[30px]'><MdOutlineLogin className='text-[25px]' style={{color: 'red'}}/></button>
      )}
    </div>
  )
}

export default Header