import React from "react";
import Header from "../../../components/common/Header";

const Shimmer = () => {
  return (
    <div className="relative bg-[var(--light-blue)] min-h-screen">
      <Header />

      {/* Shimmer Effect for the Header */}
      <div className="absolute top-28 left-2/4 h-11 w-44 mt-1 shimmer-bg"></div>

      {/* Doctor Image */}
      <div className="absolute top-36 left-40">
        <div className="flex items-center justify-center w-56 h-56 rounded-full overflow-hidden border border-gray-300 bg-blue-400 shimmer-bg"></div>
        <div className="absolute h-11 w-11 flex items-center justify-center border border-gray-300 bg-blue-900 rounded-full left-[165px] top-[175px] overflow-hidden shimmer-bg"></div>
      </div>

      {/* Personal Information */}
      <div className="absolute top-40 left-[477px] bg-white h-56 w-[720px] rounded-lg shadow-md border border-gray-300 p-2 shimmer-bg">
        <div className="space-y-2">
          {/* Shimmer content */}
        </div>
      </div>

      {/* Professional Details */}
      <div className="absolute top-[400px] left-[100px]">
        <div className="bg-white w-[500px] h-[180px] rounded-lg border border-gray-300 shadow-md space-y-3 p-4 shimmer-bg">
          {/* Shimmer content */}
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute top-[400px] left-[700px]">
        <div className="bg-white w-[500px] h-[180px] rounded-lg border border-gray-300 shadow-md p-4 space-y-3 shimmer-bg">
          {/* Shimmer content */}
        </div>
      </div>

      {/* Shimmer Effect CSS (inlined in the component) */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer-bg {
          background: linear-gradient(90deg, #f8f8f8 25%, #e0e0e0 50%, #f8f8f8 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Shimmer;
