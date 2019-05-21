import React , {useEffect, useState} from "react";
import firebase from './firebase'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import Login from './components/Login'

import Register from './components/Register'


function App (){
 
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    useEffect(() => {
        firebase.isInitialized()
            .then(val => {
                setFirebaseInitialized(val)
        })
    })

    return firebaseInitialized !== false ? (
        <main>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </main>
    ) : (
        <header>
            <h1>RecommendIt</h1>
            <p>Loading...</p>
        </header>
    )
}

export default App;