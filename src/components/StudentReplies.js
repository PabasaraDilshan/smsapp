import {  useEffect, useState } from "react";
import firebase from '../firebase';
import './StudentReplies.css';

export default function Replies(props){
    const [rep,setRep] = useState();
    const [text,setText] = useState("");
    const [loading,setLoading] = useState(true);


    
    useEffect(()=>{
        if(props.view){
            setLoading(false)
        }else{
            setLoading(true)
        }
        if(props.view.msg){
        setRep([...props.view.msg]);}
    },[props])

    function handleReply(){
            if(rep){var arr = rep;}else{
                arr = [];
            }
            
            if(props.isadmin){
                var name = "admin";
            }else{
                name ="student";
            }
            arr.push({name:name,reply:text}) ;
            setRep([...arr]);
            firebase.firestore().collection("requests").doc(props.view.reqid).set({
                msg: arr
            }, { merge: true });
        }

    if(!loading){
    if(rep){  

    return(<><div className="replies">{rep.map((r,i)=>{
        return (<div id="replyStudent" className={r.name+"rep"} key = {i}><b>--{r.name==="student"?props.view.name:"Admin"}--</b><p>{r.reply}</p></div>);
    })}</div>
    <div className="replybox">
            <textarea onChange={(e)=>{setText(e.target.value)}} value={text}></textarea>
            <button onClick={handleReply}>Reply</button>
        </div></>);}
        else{
            return <div className="replybox">
            <textarea onChange={(e)=>{setText(e.target.value)}} value={text}></textarea>
            <button onClick={handleReply}>Reply</button>
        </div>
        }
    }else{
        return <><h1>Loading...</h1></>
    }
}