import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'

export default function Navbar(props) {
  async function logout(e) {
    e.preventDefault()
    await firebase.logout();
    props.history.push("/");
  }

  return (
    <nav className="navbar" role="navigation" ariel-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h1>RecommendIt!</h1>       
        </Link>  

        {/* <a 
          role="button" 
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a> */}
      </div> 

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            {!firebase.getCurrentUsername() ? (
              <div className="buttons">
                <Link className="button is-primary" to="/register">
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-light" to="login">
                  Log in
                </Link>
              </div>
            ):(
              <div className="buttons">
                <Link className="button is-primary" to="/dashboard">
                  Dashboard
                </Link>
                <a className="button is-light" href="/logout" onClick={logout}>
                  Log out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>          
    </nav>
  )
}




