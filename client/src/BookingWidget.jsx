import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookThisPlace() {
    const response = await axios.post("/booking", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/booking/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl mt-4">
      <div className="text-xl text-center">
        Prix: {place.price}€ / par nuits
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex max-[768px]:justify-between max-[590px]:flex-col max-[590px]:items-center">
          <div className="py-3 px-3">
            <label>Arrivé:</label>
            <input
              type="date"
              className=""
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label>Départ:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Nombre de personne:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Nom complet:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />

            <label>Numéro de téléphone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        <div>
          Réserver ce logement
        </div>
        <div>
          {numberOfNights > 0 && (
            <span>{"pour" + ' ' + numberOfNights * place.price + '€'}</span>
          )}
        </div>
      </button>
    </div>
  );
};
