import {useEffect, useState} from 'react';
import firebase from '../firebase';
import './Admin.css';
import StudentReplies from './StudentReplies'
//import AdminReplies from './AdminReplies'
export default function Admin(){
    const [filter,setFilter] = useState("all");
    const [requests,setReq] = useState();
    const [click,setClick] = useState(false);
    const [view,setView] = useState();
    const [search,setSearch] = useState("")
    useEffect(()=>{
        firebase.firestore().collection("requests").onSnapshot((doc)=>{
            setReq(doc.docs);
        })
    },[search])


    function handleClick(e){
        
        var i = e.target.id;
        var arr = requests[i].data();
        //console.log(requests[i])
        setClick(s=>!s);
        setView({...arr,reqid:requests[i].id}); 
    }
    function changeStatus(s){
        view.status = s;
        setView({...view});
        firebase.firestore().collection("requests").doc(view.reqid).set({
            status:s
        }, { merge: true });

    }

    if(requests){
    return (<><h1>Admin</h1>
    {!click&&<>
    <div>
    <select value={filter}  onChange={(e)=>{
        setFilter(e.target.value);
    }}  id = "filter">
        <option value="all">All</option>
        <option value="id">ById</option>
        <option value="type">ByType</option>
    </select>
    <input value={search} onChange={(e)=>{
        setSearch(e.target.value);
    }
    } type="text"></input>
    </div>
    
    <div className="requestscontainer">{requests&&requests.map((r,i)=>{
        var s = true;
        if(search!==""&&filter!=="all"){
            s = r.data()[filter].toLowerCase().includes(search.toLowerCase());
        }
        if(s){
            console.log(i)
            return(<div className="allrequests"   key={i}><b id = {i} onClick={handleClick}>{r.data().subject}</b></div>);
        }else{
            return null;
        }
        
    })}</div></>}
     {click&&<><button onClick={()=>setClick(s=>!s)}>Back</button>
                <table>
                <tbody><tr><td>Name:</td><td>{view.name}</td></tr>
                <tr><td>ID:</td><td>{view.id}</td></tr>
                <tr><td>Subject:</td><td>{view.subject}</td></tr>
                <tr><td>Type:</td><td>{view.type}</td></tr>
                <tr><td>Body:</td><td>{view.body}</td></tr>
                </tbody></table>
                <h2><strong>{view.status}</strong></h2>
                <button onClick={()=>{
                    changeStatus("Approved");

                }}>Approve</button>
                <button onClick={()=>{
                    changeStatus("Declined");
                }}>Decline</button>
                <hr/>
                <StudentReplies isadmin={true} view={view}/>
              </>
              }
    
    </>);}else{
        return(<h1>Loading...</h1>);
    }
}