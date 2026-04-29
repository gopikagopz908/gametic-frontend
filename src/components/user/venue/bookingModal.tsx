"use client";

import { useAppDispatch } from "@/redux/hook";
import axiosInstance from "@/utils/axiosInstance";
import { X, MapPin, Clock, CreditCard, Loader2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import type {
  RazorpayResponse,
  RazorpayError,
  RazorpayOptions,
} from "@/types/razorpay";
import { bookVenue, fetchVenueById } from "@/redux/actions/user/venueAction";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: {
    _id: string;
    name: string;
    hourlyRate: number;
    city: string;
    area: string;
    turfType: string;
    size: string;
    images: string[];
    availability: {
      startTime: string;
      endTime: string;
      days: string[];
      timeSlots?: string[];
    };
    bookedSlot?: Array<{
      date: string;
      slots: Array<{
        start: string;
        end: string;
      }>;
    }>;
  };
}

export interface BookingFormData {
  date: string;
  timeSlot: string;
  startTime: string;
  endTime: string;
}

interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

interface OrderData {
  id: string;
  amount: number;
  currency: string;
}

const BookingModal = ({ isOpen, onClose, venue }: BookingModalProps) => {
  const dispatch = useAppDispatch();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    date: "",
    timeSlot: "",
    startTime: "",
    endTime: "",
  });

  const timeSlotOptions: TimeSlot[] = [
    {
      id: "slot_1",
      label: "06:00 - 07:00",
      startTime: "06:00",
      endTime: "07:00",
    },
    {
      id: "slot_2",
      label: "07:00 - 08:00",
      startTime: "07:00",
      endTime: "08:00",
    },
    {
      id: "slot_3",
      label: "08:00 - 09:00",
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      id: "slot_4",
      label: "09:00 - 10:00",
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      id: "slot_5",
      label: "10:00 - 11:00",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: "slot_6",
      label: "11:00 - 12:00",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: "slot_7",
      label: "12:00 - 13:00",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: "slot_8",
      label: "13:00 - 14:00",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: "slot_9",
      label: "14:00 - 15:00",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      id: "slot_10",
      label: "15:00 - 16:00",
      startTime: "15:00",
      endTime: "16:00",
    },
    {
      id: "slot_11",
      label: "16:00 - 17:00",
      startTime: "16:00",
      endTime: "17:00",
    },
    {
      id: "slot_12",
      label: "17:00 - 18:00",
      startTime: "17:00",
      endTime: "18:00",
    },
    {
      id: "slot_13",
      label: "18:00 - 19:00",
      startTime: "18:00",
      endTime: "19:00",
    },
    {
      id: "slot_14",
      label: "19:00 - 20:00",
      startTime: "19:00",
      endTime: "20:00",
    },
    {
      id: "slot_15",
      label: "20:00 - 21:00",
      startTime: "20:00",
      endTime: "21:00",
    },
    {
      id: "slot_16",
      label: "21:00 - 22:00",
      startTime: "21:00",
      endTime: "22:00",
    },
  ];

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<boolean>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    if (isOpen && !window.Razorpay) {
      loadRazorpayScript();
    }
  }, [isOpen]);

  const getAvailableTimeSlots = (): TimeSlot[] => {
    if (!formData.date) {
      return [];
    }

    const bookedDateSlots = venue.bookedSlot?.find(
      (booking) => booking.date === formData.date
    );

    if (!bookedDateSlots || !bookedDateSlots.slots) {
      return timeSlotOptions;
    }

    return timeSlotOptions.filter((timeSlot) => {
      return !bookedDateSlots.slots.some(
        (bookedSlot) =>
          bookedSlot.start === timeSlot.startTime &&
          bookedSlot.end === timeSlot.endTime
      );
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    if (name === "timeSlot" && value) {
      const selectedSlot = timeSlotOptions.find((slot) => slot.id === value);
      if (selectedSlot) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        }));
        return;
      }
    }

    if (name === "date") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        timeSlot: "",
        startTime: "",
        endTime: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getTimeRange = (): string => {
    if (formData.startTime && formData.endTime) {
      return `${formData.startTime} - ${formData.endTime}`;
    }
    return "";
  };

  const createRazorpayOrder = async (): Promise<OrderData> => {
    try {
      const response = await axiosInstance.post<OrderData>(
        "/create-booking-order",
        {
          turfId: venue._id,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating booking order:", error);
      throw error;
    }
  };

  const validateForm = (): boolean => {
    if (!formData.date || !formData.timeSlot) {
      alert("Please select both date and time slot");
      return false;
    }
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    if (!window.Razorpay) {
      alert("Payment gateway is not loaded. Please try again.");
      return;
    }

    setIsProcessingPayment(true);

    try {
      const orderData = await createRazorpayOrder();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Venue Booking",
        description: `Booking for ${venue.name}`,
        order_id: orderData.id,
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#00423D",
        },
        handler: async (response: RazorpayResponse) => {
          try {
            await dispatch(
              bookVenue({
                date: formData.date,
                turfId: venue._id,
                startTime: formData.startTime,
                endTime: formData.endTime,
              })
            ).unwrap(); // Unwrap to handle the resolved promise or throw an error

            await dispatch(fetchVenueById({ turfId: venue._id })).unwrap(); // Fetch updated venue data

            alert(
              "Payment successful! Your venue has been booked successfully."
            );
            console.log(response);

            // Reset form
            setFormData({
              date: "",
              timeSlot: "",
              startTime: "",
              endTime: "",
            });

            onClose();
            setIsProcessingPayment(false);
          } catch (error) {
            console.error("Error during booking process:", error);
            alert("Booking failed. Please try again.");
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: { error: RazorpayError }) => {
        alert(
          `Payment failed: ${response.error.description}. Please try again.`
        );
        setIsProcessingPayment(false);
      });
      razorpay.open();
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  if (!isOpen) return null;

  const availableTimeSlots = getAvailableTimeSlots();
  const isFormValid = formData.date && formData.timeSlot;

  return (
    <dialog className="modal z-50" open={isOpen}>
      <div className="modal-box bg-white max-w-5xl mx-auto shadow-xl rounded-lg h-auto p-0">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-gray-100 z-10"
          onClick={onClose}
          disabled={isProcessingPayment}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 h-full">
          {/* Left Column - Venue Info */}
          <div className="bg-gradient-to-br from-[#00423D] to-[#415C41] p-8 rounded-l-lg flex flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <circle cx="40" cy="20" r="2" fill="currentColor" />
                <circle cx="60" cy="20" r="2" fill="currentColor" />
                <circle cx="80" cy="20" r="2" fill="currentColor" />
                <circle cx="20" cy="40" r="2" fill="currentColor" />
                <circle cx="40" cy="40" r="2" fill="currentColor" />
                <circle cx="60" cy="40" r="2" fill="currentColor" />
                <circle cx="80" cy="40" r="2" fill="currentColor" />
                <circle cx="20" cy="60" r="2" fill="currentColor" />
                <circle cx="40" cy="60" r="2" fill="currentColor" />
                <circle cx="60" cy="60" r="2" fill="currentColor" />
                <circle cx="80" cy="60" r="2" fill="currentColor" />
                <circle cx="20" cy="80" r="2" fill="currentColor" />
                <circle cx="40" cy="80" r="2" fill="currentColor" />
                <circle cx="60" cy="80" r="2" fill="currentColor" />
                <circle cx="80" cy="80" r="2" fill="currentColor" />
              </svg>
            </div>

            <div className="text-center z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                Book your perfect sports venue experience
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>
                    {venue.area}, {venue.city}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>
                    {venue.turfType} • {venue.size}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form & Payment Summary */}
          <div className="p-6">
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#415C41] mb-1">
                  Book Venue
                </h2>
                <p className="text-sm text-[#998869]">
                  Fill in your booking details
                </p>
              </div>

              <div className="space-y-3 flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getTodayDate()}
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                      required
                      disabled={isProcessingPayment}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Time Slot
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      disabled={!formData.date || isProcessingPayment}
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                    >
                      <option value="">
                        {!formData.date
                          ? "Select date first"
                          : "Select time slot"}
                      </option>
                      {availableTimeSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.date && availableTimeSlots.length === 0 && (
                  <div className="mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-sm text-red-600">
                      No available slots for this date. Please select another
                      date.
                    </span>
                  </div>
                )}

                {formData.timeSlot && (
                  <div className="mt-2 px-3 py-2 bg-[#00423D]/5 border border-[#00423D]/20 rounded-lg">
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-[#00423D]">
                        🕖 {getTimeRange()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-[#415C41]">
                    Booking Summary
                  </h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#998869]">Hourly Rate:</span>
                      <span className="font-medium text-[#415C41]">
                        ₹{venue.hourlyRate}
                      </span>
                    </div>
                    {formData.date && (
                      <div className="flex justify-between">
                        <span className="text-[#998869]">Date:</span>
                        <span className="font-medium text-[#415C41]">
                          {new Date(formData.date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {getTimeRange() && (
                      <div className="flex justify-between">
                        <span className="text-[#998869]">Time:</span>
                        <span className="font-medium text-[#415C41]">
                          {getTimeRange()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#998869]">Duration:</span>
                      <span className="font-medium text-[#415C41]">1 Hour</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-gray-300 pt-2 text-[#415C41]">
                      <span>Total Amount:</span>
                      <span>₹{venue.hourlyRate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isProcessingPayment}
                  className="w-full bg-[#00423D] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#415C41] focus:ring-4 focus:ring-[#00423D]/20 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay ₹{venue.hourlyRate} & Book Venue
                    </>
                  )}
                </button>
                <p className="text-xs text-[#998869] text-center mt-2">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
