import './App.css'
import ChatBody from './Components/ChatBody'
import Header from './Components/Header'
import {Signin,auth} from './Utility/Firebase/Firebase.utils';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from './Components/SignIn';

function App() {
  const[user] = useAuthState(auth);
  const signinFun = async () => {
    const res = await Signin();
    console.log(res.user);
  }
  console.log(user);
  return (
    <div>
      <Header />
      {user ? <ChatBody Username={user.displayName}/> : <SignIn signIn={signinFun}/>}
    </div>
  )
}

export default App
