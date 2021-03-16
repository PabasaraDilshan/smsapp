import {useAuth} from '../contexts/AuthContext';
import firebase from '../firebase' ;
import {useEffect, useState} from 'react';
import Replies from './Replies'
import './StudentRequests.css'
export default function StudentRequests(props){
    const {currentUser} = useAuth();
    const [requests,setReq] = useState();
    const [click,setClick] = useState(false);
    const [view,setView] = useState();
    var arr=[];
    useEffect(()=>{
        const query = firebase.firestore().collection("requests").where('id','==',currentUser.email.split("@")[0]).orderBy('type','asc');
    query.get().then((x)=>{
        setReq(x.docs);
    })
    },[currentUser])

    
    function handleClick(e){
        setClick(s=>!s);
        var i = e.target.id;
        arr = requests[i].data();
        //console.log(requests[i])
        setView({...arr,reqid:requests[i].id});
        
    }

    if(requests){
        return(<><h2>Request List of {currentUser.email}</h2>
    
            {!click&&<ul>{requests.map((r,i)=>{
                
               return <li className="reqlist" id={i} onClick={handleClick} key = {i}>{r.data().subject}</li>
            })}</ul>}
            {click&&<><button onClick={()=>setClick(s=>!s)}>Back</button>
                <table>
                <tbody><tr><td>Subject:</td><td>{view.subject}</td></tr>
                <tr><td>Type:</td><td>{view.type}</td></tr>
                <tr><td>Body:</td><td>{view.body}</td></tr>
                </tbody></table>
                <Replies view={view}/>
              </>
              }
            
            </>);
    }else{
        return(<h1>Loading..</h1>);
    }
    
}