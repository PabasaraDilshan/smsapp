import { useState } from 'react';
import './ReqForm.css';
import firebase from '../firebase'

export default function ReqForm(){
    const [index,setIndex] = useState("");
    const [studentName,setStudentName] = useState(""); 
    const [details,setDetails] = useState("");
    const [typeState,setTypeState] = useState("");
    const [subject,setSubject] = useState("");
    const [filelink,setFileLink] = useState("");
    const [uploading,setUploading] = useState(false);
    
    function handleSubmit(e){
        e.preventDefault();

        const requestRef = firebase.firestore().collection("requests").doc();
        
        requestRef.set({
            id: index,
            name: studentName,
            type: typeState,
            body: details,
            filelink: filelink,
            subject: subject,
            status: "Not approved yet",
            msg: []
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
        setUploading(true);
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        var uploadFile = fileRef.put(file);

        uploadFile.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                uploadFile.snapshot.ref.getDownloadURL().then((url) => {
                    setFileLink(url);
                    setUploading(false);
                    console.log(url);
                });
            }
        );
    }
    
    return(
        <div className="requestFormBody">
            <h1 id="requestHeader" className="requestHeader">Request Form</h1>
            <form className="requestform" onSubmit={handleSubmit} value="formVal">
                <label>Index No.</label><br/>
                <input type="text" className="index" id="index" onChange={changeIndexNo} value={index} required/><br/><br/>
                <label>Name:</label><br/>
                <input type="text" id="name" className="name" onChange={changeName} value={studentName} required/><br/><br/>
                <label>Type of the request</label><br/>
                <select className="optionSelect" onChange={changeType} value={typeState} required>
                    <option value=""></option>
                    <option value="Add/Drop request">Add/Drop request</option>
                    <option value="Extend assignment submission deadline">Extend assignment submission deadline</option>
                    <option value="Repeat exams as first attempt with the next batch">Repeat exams as first attempt with the next batch</option>
                    <option value="Other request">Other request</option>
                </select><br/><br/>
                <label className="subject">Subject of the request</label><br/>
                <input type="text" id="subject" className="subject" onChange={changeSubject} value={subject} required></input><br/><br/>
                <label>Details of the request</label><br/>
                <textarea name="" id="details" className="details" cols="30" rows="6" onChange={changeDetails} value={details} required/><br/><br/>
                <label>Attach any files containing evidence</label><br/>
                <label className="selectFile">Select a file:</label>
                <input type="file" id="myfile" className="myfile" onChange={changeFile} /><br/><br/>
                <input type="submit" value="Submit" className={uploading?"Btnup":"Btn"} id="submitBtn" disabled={uploading}/>
                <input type="submit" value="Clear" className="Btn" id="clearBtn" onClick={clearImmediate}/>
            </form>
        </div>
        
    );
}