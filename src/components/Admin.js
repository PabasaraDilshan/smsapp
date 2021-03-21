import {useEffect, useState} from 'react';
import firebase from '../firebase';
import './Admin.css';
import StudentReplies from './StudentReplies'
import {useAuth} from '../contexts/AuthContext';
import {GrUserAdmin} from 'react-icons/gr'
//import AdminReplies from './AdminReplies'
export default function Admin(){
    const [filter,setFilter] = useState("");
    const [requests,setReq] = useState();
    const [click,setClick] = useState(false);
    const [view,setView] = useState();
    const [search,setSearch] = useState("")
    const {logout} = useAuth();
    useEffect(()=>{
        var unsub = firebase.firestore().collection("requests").onSnapshot((doc)=>{
            var arr = doc.docs.map((d)=>{
                return {...d.data(),reqid:d.id}
            })
            setReq(arr);
        })
        return unsub;
    },[]);

    useEffect(()=>{
        if(click){
            setView((v)=>{
                var arr = requests[v.index];
                return {...arr,index:v.index};
            })
        }

    },[requests,click]);


    function handleClick(e){
        
        var i = e.target.id;
        var arr = requests[i];
        //console.log(requests[i])
        setView({...arr,index:i}); 
        setClick(s=>!s);
    }
    function changeStatus(s){
        view.status = s;
        setView({...view});
        firebase.firestore().collection("requests").doc(view.reqid).set({
            status:s
        }, { merge: true });

    }

    if(requests){


    return (<>
    <button className="logoutAdmin" onClick={()=>{logout()}}>Logout</button>

    <div className="AdminHead">
        <h1><GrUserAdmin/><br/>Admin</h1>
    </div>


    {!click&&<>
    <div className="selectAdmin">
                <select  value={filter}  onChange={(e)=>{setFilter(e.target.value);}}  id = "filter">
                        <option value="">Filter</option>
                        <option value="id">By Id</option>
                        <option value="name">By Name</option>
                        <option value="type">By Type</option>
                        <option value="status">By Approval Status</option>
                </select>
        <input value={search} onChange={(e)=>{setSearch(e.target.value);}} type="text"></input>
                <br/>
        <span className="labelapp">Approved</span>
        <span className="labeldec">Declined</span>
        <span className="labelmissing">Missing</span>
    </div>
    
    <div className="requestscontainer">
        {requests&&requests.map((r,i)=>{
        var s = true;
        if(search!==""&&filter!==""){
            if(r[filter]){
                s = r[filter].toLowerCase().includes(search.toLowerCase());
            }else{
                s = false;
            }
        }

        if(s){
        
            return(<div className={"allrequests "+r.status} id = {i} onClick={handleClick}   key={i}><b id = {i} >{r.subject}</b><span>{r.id.toUpperCase()+" - "+r.name}</span></div>);
        }else{
            return null;
        }
        })}
        </div>
        </>}


    <div className="adminBody">
     {click&&<><button className="backBtn" onClick={()=>setClick(s=>!s)}>Back</button>
                <table>
                <tbody><tr><td><b>Name : </b></td><td className="details">{view.name}</td></tr>
                <tr><td><b>ID : </b></td><td className="details">{view.id}</td></tr>
                <tr><td><b>Subject : </b></td><td className="details">{view.subject}</td></tr>
                <tr><td><b>Type : </b></td><td className="details">{view.type}</td></tr>
                <tr><td><b>Body : </b></td><td className="details">{view.body}</td></tr>
                </tbody></table>
                <h2><strong>{view.status}</strong></h2>
                <button className="approveBtn" onClick={()=>{
                    changeStatus("Approved");

                }}>Approve</button>
                <button className="declineBtn" onClick={()=>{
                    changeStatus("Declined");
                }}>Decline</button>
                <hr/>
                <StudentReplies isadmin={true} view={view}/>
              </>}
    </div></>)
    
    }else{
        return(<h1>Loading...</h1>);
    }
    
}

