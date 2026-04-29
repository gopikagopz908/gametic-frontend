// // components/AddTeamModal.tsx

// import axiosInstance from "@/utils/axiosInstance";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// interface Props {
//   onClose: () => void;
// }

// interface TeamFormData {
//   name: string;
//   sport:
//     | "football"
//     | "cricket"
//     | "multi-sport"
//     | "swimming"
//     | "basketball"
//     | "badminton"
//     | "tennis"
//     | "volleyball"
//     | "hockey";
//   memberEmails : string[]; // user IDs
// }

// const AddTeamModal: React.FC<Props> = ({ onClose }) => {
//   const[team,setTeam]=useState()
//   const [formData, setFormData] = useState<TeamFormData>({
//     name: "",
//     sport: "football",
//     memberEmails : [],
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = Array.from(e.target.selectedOptions).map((option) => option.value);
//     setFormData((prev) => ({ ...prev, memberEmails : selected }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const value = await axiosInstance.post('/team', formData);
//     console.log(value);
//     toast.success('Team created successfully!');
//     onClose(); // close modal on successful submit
//   } catch (error) {
//     console.error(error);
//     toast.error('Failed to create team. Please try again.');
//   }
// };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
//         >
//           ×
//         </button>
//         <h2 className="text-xl font-bold mb-4">Create Team</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Team Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Sport</label>
//             <select
//               name="sport"
//               value={formData.sport}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             >
//               <option value="football">Football</option>
//               <option value="cricket">Cricket</option>
//               <option value="multi-sport">Multi-Sport</option>
//               <option value="swimming">Swimming</option>
//               <option value="basketball">Basketball</option>
//               <option value="badminton">Badminton</option>
//               <option value="tennis">Tennis</option>
//               <option value="volleyball">Volleyball</option>
//               <option value="hockey">Hockey</option>
//             </select>
//           </div>

//           <div>
//   <label className="block mb-1 font-medium">Team Members (emails)</label>
//   <textarea
//     name="memberEmails "
//     value={formData.memberEmails .join('\n')} // show emails one per line
//     onChange={(e) => {
//       const emails = e.target.value
//         .split('\n')           // split by new line
//         .map(email => email.trim())
//         .filter(email => email.length > 0);
//       setFormData((prev) => ({ ...prev, memberEmails : emails }));
//     }}
//     className="w-full border p-2 rounded h-32 resize-none"
//     placeholder="Enter one email per line"
//     required
//   />
// </div>

//           <button
//             type="submit"
//             className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
//           >
//             Create Team
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTeamModal;
"use client";

import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  tournamentId: string;
  onTeamJoined: () => void;
}

interface TeamFormData {
  name: string;
  sport:
    | "football"
    | "cricket"
    | "multi-sport"
    | "swimming"
    | "basketball"
    | "badminton"
    | "tennis"
    | "volleyball"
    | "hockey";
  memberEmails: string[];
}


const AddTeamModal: React.FC<Props> = ({ onClose, tournamentId, onTeamJoined }) => {
  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    sport: "football",
    memberEmails: [],
  });

  const [teamCreated, setTeamCreated] = useState(false);
  const [createdTeamId, setCreatedTeamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "memberEmails") {
      const emails = value
        .split("\n")
        .map((email) => email.trim())
        .filter((email) => email.length > 0);
      setFormData((prev) => ({ ...prev, memberEmails: emails }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post<{ team: { _id: string } }>("/team", formData);
      const teamId = response.data.team._id;
      setCreatedTeamId(teamId);
      setTeamCreated(true);
      toast.success("Team created successfully!");
    } catch (error) {
      // const msg = error?.response?.data?.message || "Failed to join tournament";
      toast.error(axiosErrorManager(error||"Failed to join tournament"));
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTournament = async () => {
    if (!createdTeamId) {
      toast.error("Team ID not found");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.patch(
        `/tournament/${tournamentId}/join-team`,
        { teamId: createdTeamId }
      );
      console.log(response)
      onTeamJoined(); // ✅ use it here
    onClose();


      // Manually check for expected success condition
      // if (response.status === 200 || response.status === 201) {
      //   toast.success("Team added to tournament!");
      //   onTeamJoined();
      //   onClose();
      // } else {
      //   toast.error("Unexpected response from server.");
      // }
    } catch (error) {
      // const msg = error?.response?.data?.message || "Failed to join tournament";
      toast.error(axiosErrorManager(error||"Failed to join tournament"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">
          {teamCreated ? "Team Created" : "Create Team"}
        </h2>

        {!teamCreated && (
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Team Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Sport</label>
              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
                <option value="multi-sport">Multi-Sport</option>
                <option value="swimming">Swimming</option>
                <option value="basketball">Basketball</option>
                <option value="badminton">Badminton</option>
                <option value="tennis">Tennis</option>
                <option value="volleyball">Volleyball</option>
                <option value="hockey">Hockey</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Team Members (Emails)</label>
              <textarea
                name="memberEmails"
                value={formData.memberEmails.join("\n")}
                onChange={handleChange}
                className="w-full border p-2 rounded h-32 resize-none"
                placeholder="Enter one email per line"
                required
              />
            </div>

            <button
              type="submit"
              className={`bg-green-800 text-white w-full py-2 rounded hover:bg-green-700 ${loading ? "opacity-60" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Team"}
            </button>
          </form>
        )}

        {teamCreated && (
          <button
            type="button"
            onClick={handleJoinTournament}
            className={`mt-4 bg-green-800 text-white w-full py-2 rounded hover:bg-green-900 ${loading ? "opacity-60" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Tournament"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddTeamModal;