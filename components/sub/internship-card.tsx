import React from "react";

interface InternshipCardProps {
  title: string;
  company: string;
  description: string;
  duration: string;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  title,
  company,
  description,
  duration,
}) => {
  return (
    <div className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-blue-500/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{title}</h3>
        <h4 className="text-lg text-blue-400 mb-4">{company}</h4>
        <p className="text-gray-300 text-center mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center justify-center">
          <span className="bg-blue-500/20 text-blue-300 font-medium px-3 py-1 rounded-full text-sm border border-blue-500/30">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};
