
import React,{useState} from 'react'
import StudentRequests from './StudentRequests'   
export default function Student(){
    const [home, setHome] = useState(true);


    return (<><h2>Student</h2>
        <button onClick={()=>{
            setHome(!home);
        }} disabled = {home}>Make a Request</button>
        <button onClick={()=>{
            setHome(!home);
        }} disabled = {!home}>Requests</button>
        {!home&&<StudentRequests/>}</>);
}