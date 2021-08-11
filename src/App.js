import './App.css';
import SignIn from "./pages/SignIn";
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path='/' component={SignIn} exact/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/mainpage' component={MainPage}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
