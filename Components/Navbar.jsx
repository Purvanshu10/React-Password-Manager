import React from 'react'
import { Github } from 'lucide-react';
const Navbar = () => {
  return (
    <>
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <span className="text-white">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-green-400">OP</span>
          <span className="text-white">/&gt;</span>
        </div>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <Github className="w-6 h-6" />
        </a>
      </header>
    </>
  )
}

export default Navbar
