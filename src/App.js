import './App.css';
import SignIn from "./components/SignIn";
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import EditNote from "./components/EditNoteModal";
import AdminPage from "./components/AdminPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path='/' component={SignIn} exact/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/edit' component={EditNote}/>
                <Route path='/admin' component={AdminPage}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    );
}

export default App;
