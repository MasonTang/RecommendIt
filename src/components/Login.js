import React, {useState} from 'react'
import Navbar from './Navbar'
import firebase from '../firebase'

const Login = (props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function login(){
    try{
      await firebase.login(email,password);
      props.history.replace("/dashboard")
    } 
    catch(error){
      alert(error.message)
    }
  }


  return (
   <main>
     <Navbar {...props} />
     <div className="container">
      <h2>Login</h2>
      <form onSubmit={e => e.preventDefault() && false }>
        <div className="field">
          <div className="control">

            <input 
            placeholder="email"
            type="email"
            value={email}
            className="validate"
            aria-label="email"
            onChange={e => setEmail(e.target.value)}
            />

            <input 
            placeholder="password"
            type="password"
            value={password}
            className="validate"
            aria-label="password"
            onChange={e => setPassword(e.target.value)}
            />

          </div>
        </div>

        <button type="submit" className="btn-large"  onClick={login}>
          Sign In
        </button>
      </form>
     </div>
   </main>
  )
}

export default Login
