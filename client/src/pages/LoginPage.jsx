import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext)

  async function handleLoginSubmit(event) {
    event.preventDefault()
    try {
      const {data} = await axios.post('login', {email, password})
    setUser(data)
    setRedirect(true)
    alert('Login successful')
    } catch(error) {
      alert('Login failed. Please try again later')
    }
  }

  if(redirect) {
    return <Navigate to={"/"}/>
  }
  
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Connexion</h1>
        <form className="max-w-lg mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email" placeholder="JohnDoe@gmail.com" value={email} onChange={ev => setEmail(ev.target.value)}/>
          <input type="password" placeholder="Mot de passe" value={password} onChange={ev => setPassword(ev.target.value)}/>
          <button className="primary">Connexion</button>
          <div className="text-center py-2 text-gray-500">
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link className="underline text-black" to="/register">
            S&apos;incrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
