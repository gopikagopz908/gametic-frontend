import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface TournamentFormData {
  title: string;
  description: string;
  sport: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  maxTeams: number;
  entryFee: number;
  prizePool: number;
  status: "upcoming" | "ongoing" | "completed";
  image: File | null;
}

interface Props {
  onClose: () => void;
}

const AddTournament: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const [data, setData] = useState<TournamentFormData>({
    title: "",
    description: "",
    sport: "",
    location: "",
    dateFrom: "",
    dateTo: "",
    maxTeams: 0,
    entryFee: 0,
    prizePool: 0,
    status: "upcoming",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setData((prev) => ({
      ...prev,
      [name]:
        name === "maxTeams" || name === "entryFee" || name === "prizePool"
          ? Number(value)
          : name === "image"
          ? files?.[0] || null
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("sport", data.sport);
      formData.append("location", data.location);
      formData.append("dateFrom", data.dateFrom);
      formData.append("dateTo", data.dateTo);
      formData.append("maxTeams", data.maxTeams.toString());
      formData.append("entryFee", data.entryFee.toString());
      formData.append("prizePool", data.prizePool.toString());
      formData.append("status", data.status);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await axiosInstance.post("/createTournament", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Submitted Tournament Data:", res.data);

      toast.success("Tournament created successfully");
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to create tournament. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Tournament</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label>Sport:</label>
                <select
                  name="sport"
                  value={data.sport}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="" disabled>
                    Select a sport
                  </option>
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={data.location}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label>From Date:</label>
                <input
                  type="date"
                  name="dateFrom"
                  value={data.dateFrom}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label>To Date:</label>
                <input
                  type="date"
                  name="dateTo"
                  value={data.dateTo}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div>
                <label>Max Teams:</label>
                <input
                  type="text"
                  name="maxTeams"
                  value={data.maxTeams}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label>Entry Fee (₹):</label>
                <input
                  type="text"
                  name="entryFee"
                  value={data.entryFee}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label>Prize Pool (₹):</label>
                <input
                  type="text"
                  name="prizePool"
                  value={data.prizePool}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label>Status:</label>
                <select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label>Upload Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTournament;
