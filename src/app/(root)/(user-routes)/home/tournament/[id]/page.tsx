"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import moment from "moment";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaTicketAlt,
  FaUsers,
  FaFootballBall,
} from "react-icons/fa";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";

interface Team {
  name: string;
  sport: string;
  teamManager: {
    username: string;
    email: string;
  };
}

interface TournamentDetail {
  _id: string;
  title: string;
  sport: string;
  description: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  entryFee: number;
  prizePool: number;
  joinedTeams: Team[];
  status: string;
  image: string;
}

export default function TournamentDetailPage() {
  const params = useParams();
  const id = params?.id?.toString();

  const [tournament, setTournament] = useState<TournamentDetail | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axiosInstance.get(`/tournamentById/${id}`);
        setTournament(res.data.data);
      } catch (error) {
        console.error("Failed to fetch tournament", error);
      }
    };

    if (id) fetchTournament();
  }, [id]);

  if (!tournament)
    return <div className="p-10 text-center text-xl">Loading...</div>;

  return (
    // <div className="px-8 py-16 max-w-6xl mx-auto mt-16 ">
    //   <div className="flex flex-col md:flex-row gap-10 items-start">
    //     {/* Left Side - Image */}
    //     <img
    //       src={tournament.image}
    //       alt={tournament.title}
    //       className="w-full md:w-1/2 h-96 object-cover rounded-2xl shadow-lg"
    //     />

    //     {/* Right Side - Details including teams */}
    //     <div className="flex-1 space-y-4">
    //       <h1 className="text-4xl font-bold text-gray-800">{tournament.title}</h1>
    //       <p className="text-gray-700">{tournament.description}</p>

    //       <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
    //         <div><FaMapMarkerAlt className="inline mr-2 text-green-500" />{tournament.location}</div>
    //         <div><FaCalendarAlt className="inline mr-2 text-blue-500" />{moment(tournament.dateFrom).format("MMM D")} - {moment(tournament.dateTo).format("MMM D, YYYY")}</div>
    //         <div><FaUsers className="inline mr-2 text-purple-500" />{tournament.joinedTeams.length} Teams Joined</div>
    //         <div><FaTicketAlt className="inline mr-2 text-yellow-500" />Entry Fee: ₹{tournament.entryFee}</div>
    //         <div><FaTrophy className="inline mr-2 text-red-500" />Prize Pool: ₹{tournament.prizePool}</div>
    //         <div>Status: <span className="font-semibold text-indigo-600">{tournament.status}</span></div>
    //       </div>

    //       {/* Joined Teams Inline */}
    //       <div className="mt-6">
    //         <h2 className="text-lg font-semibold text-gray-800 mb-2">Joined Teams</h2>
    //         {tournament.joinedTeams.length === 0 ? (
    //           <p className="text-gray-500 text-sm">No teams have joined yet.</p>
    //         ) : (
    //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2">
    //             {tournament.joinedTeams.map((team, index) => (
    //               <div
    //                 key={index}
    //                 className="p-3 border rounded-lg bg-gray-50 hover:shadow-sm transition"
    //               >
    //                 <h3 className="text-base font-semibold text-blue-700">{team.name}</h3>
    //                 <p className="text-sm text-gray-600">Sport: {team.sport}</p>
    //                 <p className="text-sm text-gray-600">Manager: {team.teamManager?.name} ({team.teamManager?.email})</p>
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="px-6 py-10 max-w-6xl mx-auto mt-16">
      {/* Main content: Image and details side by side */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left Side - Image */}
        <Image
          src={tournament.image}
          alt={tournament.title}
          height={20}
          width={20}
          className="w-full md:w-1/2 h-96 object-cover rounded-2xl shadow-lg"
        />

        {/* Right Side - Tournament Details */}
        <div className="flex-1 space-y-4 mt-18">
          <h1 className="text-4xl font-bold text-gray-800">
            {tournament.title}
          </h1>
          <p className="text-gray-700">{tournament.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <FaMapMarkerAlt className="inline mr-2 text-green-500" />
              {tournament.location}
            </div>
            <div>
              <FaFootballBall className="inline mr-2 text-orange-500" />
              Sport: {tournament.sport}
            </div>{" "}
            {/* NEW LINE */}
            <div>
              <FaCalendarAlt className="inline mr-2 text-blue-500" />
              {moment(tournament.dateFrom).format("MMM D")} -{" "}
              {moment(tournament.dateTo).format("MMM D, YYYY")}
            </div>
            <div>
              <FaUsers className="inline mr-2 text-purple-500" />
              {tournament.joinedTeams.length} Teams Joined
            </div>
            <div>
              <FaTicketAlt className="inline mr-2 text-yellow-500" />
              Entry Fee: ₹{tournament.entryFee}
            </div>
            <div>
              <FaTrophy className="inline mr-2 text-red-500" />
              Prize Pool: ₹{tournament.prizePool}
            </div>
            <div>
              Status:{" "}
              <span className="font-semibold text-indigo-600">
                {tournament.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Joined Teams - Compact Version */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Joined Teams
        </h2>
        {tournament.joinedTeams.length === 0 ? (
          <p className="text-gray-500 text-sm">No teams have joined yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-24 overflow-y-auto pr-1">
            {tournament.joinedTeams.map((team, index) => (
              <div
                key={index}
                className="p-2  sm:w-[300px] border rounded-md bg-gray-50 hover:shadow transition text-xs"
              >
                <h3 className="font-semibold text-blue-700">{team.name}</h3>
                <p>Sport: {team.sport}</p>
                <p>Manager: {team.teamManager?.username}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
