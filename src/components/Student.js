
import React,{useState} from 'react'
import ReqForm from './ReqForm';
import StudentRequests from './StudentRequests'   
import './Student.css';
import {useAuth} from '../contexts/AuthContext';
import {FaUserGraduate} from "react-icons/fa";

export default function Student(){
    const [home, setHome] = useState(true);
    const {currentUser, logout} = useAuth();


    return (<div className="studentBody">
        <div className="userlogout">
        <ul>
            <li className="userIndex"><h2><FaUserGraduate/>{currentUser.email.split("@")[0].toUpperCase()}</h2></li>
            <li><button className="ReqBtn" onClick={()=>{
            setHome(!home);
            }} disabled = {home}>Make a Request</button></li>
            <li><button className="ReqBtn" onClick={()=>{
            setHome(!home);
        }} disabled = {!home}>View Requests</button></li>
        <li><button className="logoutBtn" onClick={()=>{
            logout()
        
        }}>Logout</button></li>
        </ul>

        
        
        </div>
        
        
        


        
        {!home&&<StudentRequests/>}
        {home&& <ReqForm/>}
        
        
        </div>);
}