import {  useState } from "react";
import firebase from '../firebase';
export default function Replies(props){
    const [rep,setRep] = useState(props.view.msg);
    const [text,setText] = useState("");
    function handleReply(){
            var arr = rep;
            arr.push({name:"student",reply:text}) ;
            setRep([...arr]);
            firebase.firestore().collection("requests").doc(props.view.reqid).set({
                msg: arr
            }, { merge: true });
        }



    return(<><div className="replies">{rep.map((r,i)=>{

        return (<div className={r.name+"rep"} key = {i}><b>--{r.name==="student"?props.view.name:"Admin"}--</b><p>{r.reply}</p></div>);
    })}</div>
    <div className="replybox">
            <textarea onChange={(e)=>{setText(e.target.value)}} value={text}></textarea>
            <button onClick={handleReply}>Reply</button>
        </div></>);
}