"use client";

import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/atoms/Loader/Loader";

const SuccessPaymentTemplate: React.FC = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("paymentSuccessVisited");

    if (hasVisited) {
      router.replace("/");
    } else {
      sessionStorage.setItem("paymentSuccessVisited", "true");
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-xl p-8 overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200 rounded-full -translate-x-16 -translate-y-16 opacity-50 animate-pulseSlow" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-100 rounded-full translate-x-20 translate-y-20 opacity-50 animate-pulseSlow" />

        <div className="relative text-center space-y-6">
          {" "}
          <div className="flex justify-center">
            <div className="relative animate-bounceIn">
              <BsCheckCircleFill className="w-20 h-20 text-orange-500 drop-shadow-lg" />
              <div className="absolute inset-0 bg-orange-200 rounded-full scale-125 blur-md opacity-75 animate-pulse" />
            </div>
          </div>
          <div className="animate-slideUp">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
              Payment Success!
            </h1>
            <p className="mt-3 text-gray-600 text-xl font-medium">
              Your payment was processed successfully
            </p>
          </div>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-semibold text-lg shadow-md hover:bg-orange-600 transform transition-all hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 animate-slideUp delay-100"
          >
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPaymentTemplate;
