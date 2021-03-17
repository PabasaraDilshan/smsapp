import {  useEffect, useState } from "react";
import firebase from '../firebase';
export default function Replies(props){
    const [rep,setRep] = useState();
    const [text,setText] = useState("");


    
    useEffect(()=>{
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

    if(rep){  

    return(<><div className="replies">{rep.map((r,i)=>{
        return (<div className={r.name+"rep"} key = {i}><b>--{r.name==="student"?props.view.name:"Admin"}--</b><p>{r.reply}</p></div>);
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
}