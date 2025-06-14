import './App.css'
import ChatBody from './Components/ChatBody'
import Header from './Components/Header'
import {Signin,auth,createCollectionUsers} from './Utility/Firebase/Firebase.utils';
import {useAuthState} from 'react-firebase-hooks/auth';
import UserLogin from './Components/UserLogin';

function App() {
  const[user] = useAuthState(auth);
  const signinFun = async () => {
    const {user} = await Signin();
    createCollectionUsers(user);
    console.log(user);
  }
  return (
    <div className='loginPageDiv'>
      <Header />
      {user ? <ChatBody Username={user.displayName} ImageURL={user.photoURL}/> : <UserLogin signIn={signinFun}/>}
    </div>
  )
}

export default App
