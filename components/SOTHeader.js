// components/SOTHeader.js
import Link from 'next/link'; // Import Link for Next.js navigation
import { Plane, Bed, Train, Bus, User, Wallet, Percent, ChevronDown, MapPin, Briefcase } from 'lucide-react'; // Icons

const navItems = [
  // Define main product tabs
  { name: 'Flights', icon: Plane, color: 'text-blue-600', href: '/flights', active: true },
  { name: 'Hotels', icon: Bed, color: 'text-red-500', href: '/hotels' },
  { name: 'Trains', icon: Train, color: 'text-green-600', href: '/trains' },
  { name: 'Buses', icon: Bus, color: 'text-purple-600', href: '/buses' },
  // Highlight the Holidays tab prominently
  { name: 'Holidays', icon: MapPin, color: 'text-orange-500', href: '/holidays', isHighlighted: true }, 
  { name: 'Cabs', icon: Briefcase, color: 'text-gray-500', href: '/cabs' },
];

export default function SOTHeader() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          
          {/* Left: Logo and Primary Product Tabs */}
          <div className="flex items-center space-x-6">
            
            {/* Logo: "SpotOnTrip" */}
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight transition duration-150 hover:text-blue-900">
                  SpotOnTrip
                </h1>
              </div>
            </Link>
            
            {/* Core Navigation Tabs (MMT Style) */}
            <nav className="hidden lg:flex space-x-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`
                    flex items-center space-x-1 p-2 rounded-lg text-sm font-semibold transition duration-200
                    ${item.active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                    ${item.isHighlighted 
                        ? 'text-white bg-orange-500 hover:bg-orange-600' 
                        : ''
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${item.isHighlighted ? 'text-white' : item.color}`} />
                  <span className={`${item.isHighlighted ? 'text-white' : 'text-inherit'}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Utility & User Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Utility Links: Offers and Wallet */}
            <Link href="/offers" className="flex items-center space-x-1 text-sm text-gray-700 hover:text-red-600 p-1 rounded transition duration-150">
              <Percent className="w-5 h-5 text-red-500" />
              <span className="hidden sm:inline font-medium">Offers</span>
            </Link>
            <Link href="/wallet" className="flex items-center space-x-1 text-sm text-gray-700 hover:text-green-600 p-1 rounded transition duration-150">
              <Wallet className="w-5 h-5 text-green-500" />
              <span className="hidden sm:inline font-medium">Wallet</span>
            </Link>
            
            {/* Login/Signup/User Dropdown (MMT Style) */}
            <div className="flex items-center space-x-2 border border-gray-300 p-1.5 pl-3 rounded-full cursor-pointer hover:shadow-lg transition duration-150 bg-white group">
                <div className="flex flex-col text-right leading-none">
                    <span className="text-xs text-gray-800 font-medium group-hover:text-blue-800">Hello, Guest</span>
                    <span className="text-xs font-bold text-gray-900">Login / Signup</span>
                </div>
                {/* User Icon Block */}
                <div className="bg-blue-600 text-white p-2 rounded-full">
                    <User className="w-4 h-4" />
                </div>
            </div>

            {/* Language/Currency Dropdown */}
            <button className="text-sm font-semibold flex items-center text-gray-700 hover:text-blue-600 border border-gray-300 px-3 py-1.5 rounded-md transition duration-150">
                IND/EN <ChevronDown className="w-4 h-4 ml-1" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}