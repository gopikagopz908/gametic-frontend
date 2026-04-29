import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Trophy,
  User,
  Users,
} from "lucide-react";

interface UserRef {
  _id: string;
  username: string;
}
interface TurfRef {
  _id: string;
  name: string;
  city: string;
  area: string;
  location: string;
}
interface JoinHeaderProp {
  title: string;
  turf: TurfRef;
  userId: UserRef;
  sports: string;
  date: string;
  maxPlayers: number;
  startTime: string;
  endTime: string;
}
const JoinHeader = ({title,turf,userId,sports,date,maxPlayers,startTime,endTime}:JoinHeaderProp) => {
  return (
    <div className=" rounded-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#00423D" }}>
            {title}
          </h1>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1"
              style={{ color: "#415C41" }}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{turf.location},{turf.city},{turf.area}</span>
            </div>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ color: "#415C41" }}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Match Details */}
      <div className="flex justify-between px-4 gap-6 mt-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#98916D" }}
          >
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium" style={{ color: "#00423D" }}>
              Host
            </p>
            <p className="text-sm" style={{ color: "#998869" }}>
              {userId.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#415C41" }}
          >
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium" style={{ color: "#00423D" }}>
              Sport Type
            </p>
            <p className="text-sm" style={{ color: "#998869" }}>
              {sports}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#00423D" }}
          >
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium" style={{ color: "#00423D" }}>
              Match Date
            </p>
            <p className="text-sm" style={{ color: "#998869" }}>
              {date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#98916D" }}
          >
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium" style={{ color: "#00423D" }}>
              Team Size
            </p>
            <p className="text-sm" style={{ color: "#998869" }}>
              {maxPlayers/2} vs {maxPlayers/2}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#415C41" }}
          >
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium" style={{ color: "#00423D" }}>
              Match Time
            </p>
            <p className="text-sm" style={{ color: "#998869" }}>
             {startTime} - {endTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinHeader;
