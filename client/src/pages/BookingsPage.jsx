import { useEffect, useState } from "react";
import { AccountNav } from "../AccountNav";
import { PlaceImg } from "../PlaceImg";
import { Link } from "react-router-dom";
import { Bookingdates } from "../Bookingdates";
import axios from "axios";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="flex flex-col gap-4">
        {bookings?.length > 0 &&
          bookings.map((booking, index) => (
            <Link to={`/account/booking/${booking._id}`} key={index} className="flex gap-4 bg-gray-200 h-[200px] rounded-2xl overflow-hidden">
              <div className="w-48">
                <PlaceImg place={booking.place} className={'h-full w-full object-cover'}/>
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <Bookingdates booking={booking} className="mb-2 mt-4 text-gray-500"/>
                <div className="flex flex-col gap-2 text-xl ">
                
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
