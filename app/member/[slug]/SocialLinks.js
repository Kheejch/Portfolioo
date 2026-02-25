import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function SocialLinks({ contact }) {
  return (
    <div className="flex items-center gap-2">
      {/* GitHub */}
      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700/40 to-gray-800/30 border border-gray-500/50 backdrop-blur-md hover:bg-gray-800 hover:text-white hover:shadow-[0_0_15px_rgba(75,85,99,0.8)] hover:border-gray-400 transition-all duration-300 group hover:scale-110 hover:-translate-y-0.5 active:scale-95"
        title="GitHub"
      >
        <FaGithub className="w-3 h-3 text-gray-300 group-hover:text-white transition-colors duration-300" />
      </a>
    </div>
  );
} 