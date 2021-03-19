import {useAuth} from '../contexts/AuthContext';
import firebase from '../firebase' ;
import { useEffect, useState} from 'react';
import StudentReplies from './StudentReplies'
import './StudentRequests.css'
import {BsDownload} from 'react-icons/bs'


export default function StudentRequests(props){
    const {currentUser} = useAuth();
    const [click,setClick] = useState(false);
    const [view,setView] = useState();
    const [requests,setReq] = useState();
    useEffect(()=>{
        const query = firebase.firestore().collection("requests").where('id','==',currentUser.email.split("@")[0]).orderBy('type','asc');
    query.onSnapshot((x)=>{
        
        setReq(x.docs);

    })
    
    },[currentUser.email]);
   
    useEffect(()=>{
        if(click){
            setView((v)=>{
                var arr = requests[v.index].data();
                return {...arr,reqid:v.reqid,index:v.index};
            })
            
        }
       

    },[requests,click])
    

    function handleClick(e){
        setClick(s=>!s);
        var i = e.target.id;
        console.log(i)
        if(requests[i]){
            var arr = requests[i].data();
        
            setView({...arr,reqid:requests[i].id,index:i});
        }
        
        
    }
    if(requests){
        return(<><div className="viewReqh2"><h2>Request List</h2></div>
    
            {!click&&<ul className="reqcontainer">{requests.map((r,i)=>{
                
               return <li className="reqlist" id={i} onClick={handleClick} key = {i}><b>{r.data().subject}</b><div>{r.data().body&&(r.data().body.length>50?r.data().body.slice(0,50)+"...":r.data().body)}</div></li>
            })}</ul>}
            {click&&view&&<><button onClick={()=>setClick(s=>!s)}>Back</button>
                <table>
                <tbody><tr><td>Subject:</td><td>{view.subject}</td></tr>
                <tr><td>Type:</td><td>{view.type}</td></tr>
                <tr><td>Body:</td><td>{view.body}</td></tr>
                {view.filelink?<tr><td>File Link:</td><td><a href = {view.filelink}><BsDownload/></a></td></tr>:null}
                </tbody></table>
                <h2><strong>{view.status}</strong></h2>
                <hr/>
                <StudentReplies isadmin={false} view={view}/>
              </>
              }
            
            </>);
    }else{
        return(<h1>Loading..</h1>);
    }
    
}