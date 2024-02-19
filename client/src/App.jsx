import axios from "axios";
import {Route, Routes} from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./Layout";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UserContextProvider } from "./UserContext";
import { PlacesPage } from "./pages/PlacesPage";
import { PlacesFormPage } from "./pages/PlacesFormPage";
import { PlacePage } from "./pages/PlacePage"
import { BookingPage } from "./pages/BookingPage"
import { BookingsPage } from "./pages/BookingsPage"


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage/>} />
        <Route path="/account/places" element={<PlacesPage/>} />
        <Route path="/account/places/:id" element={<PlacesFormPage/>} />
        <Route path="/account/booking/:id" element={<BookingPage/>} />
        <Route path="/account/bookings" element={<BookingsPage/>} />
        <Route path="/place/:id" element={<PlacePage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
