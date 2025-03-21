"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import QRCode from "qrcode.react";

export default function qrForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const validatePhone = (number) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International format validation
    return phoneRegex.test(number);
  };

  useEffect(() => {
    if (phone) {
      setQrCode(
        `https://api.qrserver.com/v1/create-qr-code/?data=${phone}&size=150x150`
      );
    }
  }, [phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePhone(phone)) {
      setError("Invalid phone number. Please enter a valid number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2>Hello From Subscription Form</h2>
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-xl font-bold text-center mb-4">
            Subscribe with Your Phone
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Get QR Code"}
            </Button>
          </form>
          {qrCode && (
            <div className="mt-4 flex justify-center">
              <img src={qrCode} alt="QR Code" className="w-32 h-32" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
