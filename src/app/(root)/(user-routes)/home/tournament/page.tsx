
'use client';
import AddTournament from '@/components/user/addTournament';
import TournamentCard from '@/components/user/tournamentCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export interface Tournament {
  _id: string;
  title: string;
  subtitle: string;
  location: string;
  distance: string;
  joinedTeams: number;
  maxPlayers: number;
  dateFrom: string;
  dateTo: string;
  entryFee: number;
  prizePool: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  image: string;
  icon: string;
}

function Page() {
  const [data, setData] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  const[showModal,setShowmodal]=useState(false)

  function openModal(){
    setShowmodal(true)
  }

  function closeModal(){
    setShowmodal(false)
  }

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/getAllTournament');
        setData(res.data.post);
        console.log(res.data.post) 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, []);

  if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;
  // if (!data.length) return <div className="p-10 text-center text-red-600">No tournaments found</div>;
 
 
  return (
    <>
    <div className='flex justify-end mt-16'>
      <button onClick={openModal} style={{ backgroundColor: '#415C41' }} className=' bg- py-2 px-3 rounded-xl font-semibold text-white'>Add Tournament</button>
    </div>
    <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 min-h-screen">
      {data?.map((tournament) => (
        <TournamentCard key={tournament._id} data={tournament} />
      ))}
          {showModal && <AddTournament onClose={closeModal}/> }

    </main>
    </>
  );
}

export default Page;
