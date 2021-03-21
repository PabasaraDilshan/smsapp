import React,{useContext,useState,useEffect} from "react"
import firebase from '../firebase';
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);
    /*
    
    function details(){
    
        return firebase.firestore().collection("users").doc(currentUser.email).get().then((doc)=>{
                if(doc.exists){
                    return {...doc.data(),...currentUser.email};
                }
            });
    
        
    
    }*/
    

    function login(email,password){
        
        return firebase.auth().signInWithEmailAndPassword(email,password);

    }
    function logout(){
        return firebase.auth().signOut();
    }


    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
            setCurrentUser(user); 
    
            setLoading(false);

        })
        return unsubscribe;
    },[]);

    const value = {

        currentUser,
        login,
        logout
    };

    return (<AuthContext.Provider value = {value}>
        {!loading && children}
    </AuthContext.Provider>);
}