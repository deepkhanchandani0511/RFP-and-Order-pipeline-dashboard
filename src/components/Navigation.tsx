
import { NavLink, useLocation } from 'react-router-dom';
import { BarChart3, Users, TrendingUp, FileText } from 'lucide-react';
import { useEffect } from 'react';

interface NavigationProps {
  onRouteChange?: (path: string) => void;
}

const Navigation = ({ onRouteChange }: NavigationProps) => {
  const location = useLocation();
  
  useEffect(() => {
    if (onRouteChange) {
      onRouteChange(location.pathname);
    }
  }, [location.pathname, onRouteChange]);

  const navItems = [
    { to: '/', label: 'Dashboard', icon: BarChart3 },
    { to: '/pipeline', label: 'RFP Pipeline', icon: FileText },
    { to: '/team', label: 'Team Performance', icon: Users },
    { to: '/analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <div className="hidden sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
