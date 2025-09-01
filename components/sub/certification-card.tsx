import React from "react";
import Link from "next/link";

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  date,
  link,
}) => {
  return (
    <div className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-green-500/50">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-200 transition-colors">{title}</h3>
        <h4 className="text-lg text-green-400 mb-4">{issuer}</h4>
        <div className="flex items-center justify-center mb-4">
          <span className="bg-green-500/20 text-green-300 font-medium px-3 py-1 rounded-full text-sm border border-green-500/30">
            {date}
          </span>
        </div>
        <a
          href={link || "https://github.com/lucifer9973/Certifications"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md hover:shadow-green-500/25"
          onClick={(e) => {
            const url = link || "https://github.com/lucifer9973/Certifications";
            if (url) {
              window.open(url, '_blank', 'noopener,noreferrer');
              e.preventDefault();
            }
          }}
        >
          <span className="mr-2">📄</span>
          View Certificate
        </a>
      </div>
    </div>
  );
};
