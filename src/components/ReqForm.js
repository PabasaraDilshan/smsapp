import { useState } from 'react';
import './ReqForm.css';
import firebase from '../firebase'

export default function ReqForm(){
    const [index,setIndex] = useState("");
    const [studentName,setStudentName] = useState(""); 
    const [details,setDetails] = useState("");
    const [typeState,setTypeState] = useState("");
    const [subject,setSubject] = useState("");
    
    function handleSubmit(e){
        e.preventDefault();
        const requestRef = firebase.firestore().collection("requests").doc();
        
        requestRef.set({
            id: index,
            name: studentName,
            type: typeState,
            detail: details,
            filelink: "",
            subject: subject
        }); 

    }
    function changeIndexNo(e){
        setIndex(e.target.value);
    }
    function changeName(e){
        setStudentName(e.target.value);
    }
    function changeDetails(e){
        setDetails(e.target.value);
    }
    function changeType(e){
        setTypeState(e.target.value);
    }
    function changeSubject(e){
        setSubject(e.target.value);
    }
    function changeFile(e){
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        fileRef.put(file).then(() => {
            console.log("uploaded"); 
        })
         
    }
    return(
        <div className="requestFormBody">
            <h1 id="requestHeader" className="requestHeader">Request Form</h1>
            <form className="requestform" onSubmit={handleSubmit} value="formVal">
                <label>Index No.</label><br/>
                <input type="text" className="index" id="index" onChange={changeIndexNo} value={index}/><br/><br/>
                <label>Name:</label><br/>
                <input type="text" id="name" className="name" onChange={changeName} value={studentName}/><br/><br/>
                <label>Type of the request</label><br/>
                <select className="optionSelect" onChange={changeType} value={typeState}>
                    <option value="0"></option>
                    <option value="Add/Drop request">Add/Drop request</option>
                    <option value="Extend assignment submission deadline">Extend assignment submission deadline</option>
                    <option value="Repeat exams as first attempt with the next batch">Repeat exams as first attempt with the next batch</option>
                    <option value="Other request">Other request</option>
                </select><br/><br/>
                <label>Subject of the request</label><br/>
                <input type="text" id="subject" className="subject" onChange={changeSubject} value={subject}></input><br/><br/>
                <label>Details of the request</label><br/>
                <textarea name="" id="details" className="details" cols="30" rows="6" onChange={changeDetails} value={details}/><br/><br/>
                <label>Attach any files containing evidence</label><br/>
                <label className="selectFile">Select a file:</label>
                <input type="file" id="myfile" className="myfile" onChange={changeFile} /><br/><br/>
                <input type="submit" value="Submit" className="Btn" id="submitBtn"/>
                <input type="submit" value="Clear" className="Btn" id="clearBtn" onClick={clearImmediate}/>
            </form>
        </div>
        
    );
}