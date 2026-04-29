import React, { useCallback } from "react";
import { User, Users, DollarSign, UserCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import axiosInstance from "@/utils/axiosInstance";
import type {
  RazorpayResponse,
  RazorpayError,
  RazorpayOptions,
} from "@/types/razorpay";
import { fetchMatchById, joinGame } from "@/redux/actions/user/hostActions";

// API Response Types
interface CreateOrderRequest {
  amount: number;
  currency: string;
  matchId: string;
  userId: string;
}

interface CreateOrderResponse {
  id: string;
  amount: number;
  currency: string;
}

// Payment callback types
interface PaymentSuccessData extends RazorpayResponse {
  matchId: string;
  userId: string;
}

interface JoinedPlayer {
  _id: string;
  username: string;
}

interface JoinbarProp {
  maxPlayers: number | undefined;
  title: string | undefined;
  date: string | undefined;
  paymentPerPerson: number | undefined;
  joinedPlayers?: JoinedPlayer[];
  matchId?: string;
  onPaymentSuccess?: (paymentData: PaymentSuccessData) => void;
  onPaymentError?: (error: RazorpayError | Error) => void;
}

const JoinBar = ({
  maxPlayers,
  title,
  date,
  paymentPerPerson,
  joinedPlayers,
  matchId,
  onPaymentSuccess,
  onPaymentError,
}: JoinbarProp) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const isUserJoined = joinedPlayers?.some((player) => player._id === user?.id);

  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const createRazorpayOrder =
    useCallback(async (): Promise<CreateOrderResponse> => {
      try {
        if (!matchId || !user?.id || !paymentPerPerson) {
          throw new Error(
            "Missing required data: matchId, userId, or paymentPerPerson"
          );
        }

        const requestData: CreateOrderRequest = {
          amount: paymentPerPerson * 1000, // Amount in paise
          currency: "INR",
          matchId,
          userId: user.id,
        };

        console.log("Sending request to create order:", requestData);

        const response = await axiosInstance.post<CreateOrderResponse>(
          `/create-join-order/${matchId}`,
          requestData
        );

        return response.data;
      } catch (error) {
        console.error(
          "Error creating Razorpay order:",
          JSON.stringify(error, null, 2)
        );
        throw error;
      }
    }, [paymentPerPerson, matchId, user?.id]);

  const handlePayment = useCallback(async () => {
    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load Razorpay. Please try again.");
        return;
      }

      // Create order
      const orderData = await createRazorpayOrder();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "your_razorpay_key_id",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Match Payment",
        description: `Payment for ${title}`,
        order_id: orderData.id,
        prefill: {
          name: user?.username || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#00423D",
        },
        handler: async (response: RazorpayResponse) => {
          console.log("Payment successful:", response);
          try {
            await dispatch(joinGame({ matchId }));
            await dispatch(fetchMatchById({ matchId }));
            alert("Joined successfully");
            if (onPaymentSuccess) {
              onPaymentSuccess({
                ...response,
                matchId: matchId || "",
                userId: user?.id || "",
              });
            }
          } catch (error) {
            console.error("Error joining match after payment:", error);
            alert(
              "Payment successful, but failed to join match. Please contact support."
            );
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled by user");
            alert("Payment was cancelled. You have not joined the match.");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on(
        "payment.failed",
        (response: { error: RazorpayError }) => {
          console.error("Payment failed:", response.error);
          if (onPaymentError) {
            onPaymentError(response.error);
          } else {
            alert(`Payment failed: ${response.error.description}`);
          }
        }
      );

      paymentObject.open();
    } catch (error) {
      console.error(
        "Error in payment process:",
        JSON.stringify(error, null, 2)
      );
      const errorObj =
        error instanceof Error ? error : new Error("Unknown error occurred");
      if (onPaymentError) {
        onPaymentError(errorObj);
      } else {
        alert(`Payment initialization failed: ${errorObj.message}`);
      }
    }
  }, [
    loadRazorpayScript,
    createRazorpayOrder,
    title,
    user,
    matchId,
    onPaymentSuccess,
    onPaymentError,
    dispatch,
  ]);

  const handleJoinClick = useCallback(() => {
    if (!user) {
      alert("Please login to join the match");
      return;
    }

    if (isUserJoined) {
      return;
    }

    if (joinedPlayers && maxPlayers && joinedPlayers.length >= maxPlayers) {
      alert("Match is full");
      return;
    }

    handlePayment();
  }, [user, isUserJoined, joinedPlayers, maxPlayers, handlePayment]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50">
      <div className="max-w-8xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1"
                style={{ color: "#415C41" }}
              >
                <Users className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {joinedPlayers?.length}/{maxPlayers}
                </span>
                <span className="text-sm text-gray-500">players</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#998869]" />
              <span
                className="text-lg font-semibold"
                style={{ color: "#00423D" }}
              >
                ${paymentPerPerson}
              </span>
              <span className="text-sm text-gray-500">per player</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium" style={{ color: "#00423D" }}>
                {title}
              </p>
              <p className="text-xs" style={{ color: "#998869" }}>
                {date}
              </p>
            </div>
            <button
              onClick={handleJoinClick}
              className={`group relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                isUserJoined || joinedPlayers?.length === maxPlayers
                  ? "bg-[#998869] cursor-not-allowed"
                  : "bg-[#00423D] hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
              }`}
              disabled={isUserJoined}
              type="button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center gap-2">
                {isUserJoined ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Joined</span>
                  </>
                ) : joinedPlayers?.length === maxPlayers ? (
                  <span>Full</span>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span>Join Match</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" style={{ color: "#998869" }} />
                <span className="font-semibold" style={{ color: "#00423D" }}>
                  ${paymentPerPerson}
                </span>
                <span className="text-gray-500">per player</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium" style={{ color: "#00423D" }}>
                {date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinBar;
