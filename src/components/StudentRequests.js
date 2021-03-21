import {useAuth} from '../contexts/AuthContext';
import firebase from '../firebase' ;
import { useEffect, useState} from 'react';
import StudentReplies from './StudentReplies'
import './StudentRequests.css'
import {RiDownloadFill} from 'react-icons/ri'


export default function StudentRequests(props){
    const {currentUser} = useAuth();
    const [click,setClick] = useState(false);
    const [view,setView] = useState();
    const [requests,setReq] = useState();
    useEffect(()=>{
        const query = firebase.firestore().collection("requests").where('id','==',currentUser.email.split("@")[0]).orderBy('type','asc');
    const unsub = query.onSnapshot((x)=>{
        var arr = x.docs.map((d)=>{
            return {...d.data(),reqid:d.id}
        })
        setReq(arr);

    })
    return unsub;
    
    },[currentUser.email]);
   
    useEffect(()=>{
        if(click){
            setView((v)=>{
                var arr = requests[v.index];
                return {...arr,index:v.index};
            })
        }}
    ,[requests,click])

    function handleClick(e){
       
        console.log(e)
        var i = e.target.id;
        if(requests[i]){
            var arr = requests[i];
        
            setView({...arr,index:i});
            setClick(s=>!s);
        }
        
        
        
    }
    if(requests){
        return(<><div className="viewReqh2"><h2>Request List</h2></div>
    
            {!click&&<ul className="reqcontainer">{requests.map((r,i)=>{
                
               return <li className="reqlist" id={i} onClick={handleClick} key = {i}><b id={i}>{r.subject}</b><div id={i}>{r.body&&(r.body.length>50?r.body.slice(0,50)+"...":r.body)}</div></li>
            })}</ul>}
            {click&&<><button className="backBtnStudent" onClick={()=>setClick(s=>!s)}>Back</button>
                <div className="requestStudent">
                <table className="requesttableStudent">
                <tbody><tr><td><b>Subject:</b></td><td>{view.subject}</td></tr>
                <tr><td><b>Type:</b></td><td>{view.type}</td></tr>
                <tr><td><b>Body:</b></td><td>{view.body}</td></tr><br/>
                {view.filelink?<tr><td><b>File Link:</b></td><td><a href = {view.filelink}><RiDownloadFill/></a></td></tr>:null}
                </tbody></table>
                <h2><strong>{view.status}</strong></h2>
                <hr/>
               
                <StudentReplies isadmin={false} view={view}/>
                </div>
              </>
              }
            
            </>);
    }else{
        return(<h1>Loading..</h1>);
    }
    
}