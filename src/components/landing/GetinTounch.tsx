import { Plus, Users, Trophy} from "lucide-react";
import Image from "next/image";

interface Users {
  id: number;
  name: string;
  avatar: string;
}

const GetInTouch = () => {
  const users: Users[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar:
        "https://plus.unsplash.com/premium_photo-1669704098858-8cd103f4ac2e?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },

  ];

  return (
    <div className="px-4 sm:px-8 lg:px-20 w-full min-h-screen py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 max-w-8xl">
        <div className="w-full lg:w-2/6">
          <div className="relative w-full aspect-[4/5] lg:h-[600px] rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image
              src="https://plus.unsplash.com/premium_photo-1666913667023-4bfd0f6cff0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxzcG9ydHN8ZW58MHx8MHx8fDA%3D"
              fill
              alt="Sports community"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full lg:w-4/6 flex flex-col gap-4 lg:gap-5 h-full lg:h-auto">
          {/* Community Section */}
          <div className=" bg-[#98916d]/30 rounded-3xl lg:rounded-[2.5rem] p-4 lg:py-8 lg:px-6 lg:h-3/5">
            <div className="space-y-3 lg:space-y-4 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-4">
              

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Join our elite <br className="hidden sm:block" />
                  community of{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-white px-2 py-1 font-black">
                      Athletes
                    </span>
                    <div className="absolute inset-0 bg-emerald-600 transform rotate-2 rounded-lg"></div>
                  </span>
                </h1>
              </div>

              {/* User Avatars */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {users.map((user, index) => (
                    <div
                      key={user.id}
                      className={`relative ${index > 0 ? "-ml-3" : ""} w-8 h-8 lg:w-14 lg:h-14`}
                    >
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className=" rounded-full border-3 border-white shadow-lg object-cover hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                  ))}

                  <div className="w-8 h-8 lg:w-14 lg:h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg -ml-3 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Plus className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                </div>

                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    Join 300+ active members
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="text-xl lg:text-2xl font-bold text-gray-900">
                      300+
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Active Athletes</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-xl lg:text-2xl font-bold text-gray-900">
                      50+
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Sports Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-[#00423d] rounded-3xl lg:rounded-[2.5rem] lg:h-2/5 p-4 lg:p-6 ">
            <div className="space-y-4 h-full flex flex-col">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Ready to start?
                </h2>
                <p className="text-emerald-100 text-sm lg:text-base">
                  Join thousands of athletes and unlock your potential
                </p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    className="w-full bg-white/95 backdrop-blur-sm h-12 lg:h-14 rounded-2xl px-6 text-base placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-200"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>

                
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
