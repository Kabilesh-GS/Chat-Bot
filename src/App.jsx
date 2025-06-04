import './App.css'
import ChatBody from './Components/ChatBody'
import Header from './Components/Header'
import {Signin,auth,createCollectionUsers} from './Utility/Firebase/Firebase.utils';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from './Components/SignIn';

function App() {
  const[user] = useAuthState(auth);
  const signinFun = async () => {
    const res = await Signin();
    createCollectionUsers(res.user);
  }
  return (
    <div>
      <Header />
      {user ? <ChatBody Username={user.displayName} ImageURL={user.photoURL}/> : <SignIn signIn={signinFun}/>}
    </div>
  )
}

export default App
