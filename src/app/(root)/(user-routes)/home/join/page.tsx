"use client"
import JoinFilter from "@/components/user/joinFilter";
import ActivityCard from "@/components/user/userCard";
import { useAppSelector } from "@/redux/hook";
import Link from "next/link";



export default function Home() {
  const { matches } = useAppSelector((state) => state.host);

  return (
    <div className="min-h-screen bg-gray-100  mt-16">
      <JoinFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {matches.map((card, index) => (
          <Link key={index} href={`/home/join/match/${card._id}`}>
            <ActivityCard {...card} />
          </Link>
        ))}
      </div>
    </div>
  );
}
