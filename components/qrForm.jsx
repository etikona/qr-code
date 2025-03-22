"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import QRCode from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";

const STATES = {
  ENTER_PHONE: "ENTER_PHONE",
  SHOW_QR: "SHOW_QR",
  VERIFIED: "VERIFIED",
};

export default function SubscriptionForm() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userInputCode, setUserInputCode] = useState("");
  const [state, setState] = useState(STATES.ENTER_PHONE);

  const validatePhone = (number) => {
    return number && number.length > 8;
  };

  const generateQRCode = () => {
    if (!validatePhone(phone)) {
      toast.error("Invalid phone number. Please enter a valid number.");
      return;
    }
    setLoading(true);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    const qrData = JSON.stringify({ phone, code });
    setQrCode(
      `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        qrData
      )}&size=150x150`
    );

    setTimeout(() => {
      setLoading(false);
      toast.success(
        "QR Code generated successfully! Scan to get verification code."
      );
      setState(STATES.SHOW_QR);
    }, 1000);
  };

  const handleVerification = () => {
    if (userInputCode === verificationCode) {
      setState(STATES.VERIFIED);
    } else {
      toast.error("Incorrect verification code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
        <CardContent className="space-y-6">
          {state === STATES.ENTER_PHONE && (
            <div className="p-5">
              <h2 className="text-2xl font-bold text-center">
                Subscribe with Your Phone
              </h2>
              <PhoneInput
                international
                defaultCountry="US"
                value={phone}
                onChange={setPhone}
                className="w-full border rounded-lg p-3 my-3"
              />
              <Button
                onClick={generateQRCode}
                className="w-full"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Get QR Code"}
              </Button>
            </div>
          )}

          {state === STATES.SHOW_QR && (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold text-center">
                Scan Your QR Code
              </h2>
              <img
                src={qrCode}
                alt="QR Code"
                className="w-40 h-40 border rounded-lg shadow-md hover:scale-105"
              />
              <p className="text-gray-600 text-sm">
                Scan to get verification code
              </p>
              <input
                type="text"
                placeholder="Enter verification code"
                value={userInputCode}
                onChange={(e) => setUserInputCode(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
              <Button onClick={handleVerification} className="w-full">
                Verify
              </Button>
            </div>
          )}

          {state === STATES.VERIFIED && (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold text-center text-green-600">
                Subscription Confirmed ✅
              </h2>
              <p className="text-gray-600 text-center">
                Thank you for verifying your phone number!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
