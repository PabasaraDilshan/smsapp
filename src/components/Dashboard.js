
//import {useEffect, useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import Admin from './Admin'
import Student from './Student'
import Isadmin from '../contexts/Isadmin'
export default function Dashboard(){
    const {currentUser} = useAuth();


        return (<>
        { Isadmin(currentUser)? <Admin/>:<Student/>}
           
            </>
        
        );
}