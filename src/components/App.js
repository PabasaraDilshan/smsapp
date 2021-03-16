import React from 'react';
import Login from './Login';
import {AuthProvider} from "../contexts/AuthContext"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard'


export default function App(){



    return(<Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component = {Dashboard}/>
            
            <Route path = "/login" component = {Login}/>

          </Switch>

        </AuthProvider>
      </Router>);
}