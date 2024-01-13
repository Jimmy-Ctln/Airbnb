import { Link} from "react-router-dom";
import { AccountNav } from "../AccountNav";
import { useEffect, useState } from "react";
import { PlaceImg } from "../PlaceImg";
import axios from "axios";

export const PlacesPage = () => {

  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data)
    })
  }, [])

  return (
    <div>
      <AccountNav/>
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Ajouter un nouveau logement
          </Link>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {places.length > 0 && places.map((place, index) => (
              <Link to={'/account/places/'+place._id} key={index} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                <div className="flex w-full gap-8 max-md:flex-col">
                  <div className="flex w-40 h-36 rounded-2xl bg-gray-300 max-md:w-full max-md:min-h-[200px]">
                    <PlaceImg place={place} className={' min-w-40 h-full object-cover object-center rounded-2xl max-md:min-w-full max-md:min-h-[200px]'}/>
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
    </div>
  );
};
