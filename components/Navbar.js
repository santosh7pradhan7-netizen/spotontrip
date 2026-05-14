// components/Navbar.js

import Link from 'next/link';
import SearchBox from './SearchBox'; // Assuming SearchBox component is in the same folder
import { Plane, Compass, Briefcase } from 'lucide-react'; // Importing travel-related icons

// Array of navigation links
const navLinks = [
  { name: 'Flights', href: '/flights', icon: Plane },
  { name: 'Hotels', href: '/hotels', icon: Compass },
  { name: 'Trips', href: '/mytrips', icon: Briefcase },
];

export default function Navbar() {
  return (
    // Updated styling for a travel theme: light background, blue accents, sticky
    <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Flex Container */}
        <div className="flex justify-between items-center py-4">
          
          {/* Left: Logo/Title Section */}
          <Link href="/">
            <div className='flex items-center space-x-2 cursor-pointer transition duration-150 hover:opacity-80'>
              <Plane className="w-8 h-8 text-blue-600 rotate-45" /> 
              <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                TravelFinder
              </h1>
            </div>
          </Link>

          {/* Center: Search Box Section */}
          <div className="flex-1 max-w-2xl mx-12 hidden lg:block">
            {/* The SearchBox is now centrally placed and limited in width */}
            {/* Note: In a travel app, the SearchBox might be moved to the main content area */}
            <SearchBox />
          </div>

          {/* Right: Navigation Links */}
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className="flex flex-col items-center p-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition duration-150 cursor-pointer">
                  <link.icon className="w-5 h-5 mb-0.5" />
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
      
      {/* Search box visible on small screens (optional) */}
      {/* SearchBox is included here for smaller screen flexibility */}
      <div className="max-w-7xl mx-auto px-4 pb-3 lg:hidden">
         <SearchBox />
      </div>

    </nav>
  );
}