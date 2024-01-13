import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AccountNav } from "../AccountNav.jsx";
import { PlacesPage } from "./PlacesPage.jsx";

export const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Compte de {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">
            Déconnexion
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};
