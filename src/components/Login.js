import {useState} from 'react';
import { useHistory } from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';
import './Login.css';
import logo from '../User.png'
function Login() {
  const [email,setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const [inpw,setInpw] = useState(false);
  const [loading,setLoading] = useState(false);
//const [error,setError] = useState("");
  const history = useHistory();
  
  function changeEmail(e){
    
    setEmail(e.target.value);
  }
  function changePassword(e){
    setPassword(e.target.value);
  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
      //setError("");
      setLoading(true);
      await login(email,password);
      history.push("/");
    }catch(e){
      console.log("Error",e);
      setInpw(true);
      //setError("Failed to log in")
    }
    setLoading(false);
  }
  
  return (
  <div className="LoginBack">
  <div className="Loginbox">
		<img src={logo} className="User" alt = "Logo"/>
		<h1>Login Here</h1>
		<form onSubmit={handleSubmit}>
			<p>UserName</p>
			<input type="text" onChange={changeEmail} value={email} name="" placeholder="Enter UserName Here"/>
			<p>Password</p>
			<input type="password" onChange={changePassword} value={password} name="" placeholder="Enter Password Here"/>
			<input disabled={loading}  type="submit" name="" value="Login" />
      {inpw&&<span className="incorrectpw">*Username or Password is incorrect</span>}
		</form>
	</div></div>
    
    );
  
}

export default Login;
