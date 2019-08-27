import React , {useEffect, useState} from "react";
import "./App.css"
import firebase from './firebase'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Edit from './components/Edit'
import Register from './components/Register'
import Category from './components/Category'
import Author from './components/Author'


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
                    <Route exact path="/editRecommendation/:id" component={Edit} />
                    <Route exact path="/category/:category" component={Category} />
                    <Route exact path="/author/:author" component={Author} />
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