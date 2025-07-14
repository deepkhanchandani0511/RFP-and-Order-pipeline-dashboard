
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '../Navigation';
import ChatBot from '../AIChat/ChatBot';
import UserProfile from '../UserProfile/UserProfile';
import NotificationCenter from '../Notifications/NotificationCenter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Settings, LogOut, User, MessageSquare } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [currentContext, setCurrentContext] = useState<'dashboard' | 'pipeline' | 'analytics' | 'general'>('general');

  // Determine chat context based on current route
  const updateChatContext = (path: string) => {
    if (path.includes('/pipeline')) setCurrentContext('pipeline');
    else if (path.includes('/analytics')) setCurrentContext('analytics');
    else if (path === '/') setCurrentContext('dashboard');
    else setCurrentContext('general');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">RFP Dashboard Pro</h1>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Notifications */}
              <NotificationCenter />

              {/* AI Chat Toggle */}
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      {user?.company && (
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.company}
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowProfile(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Navigation */}
      <Navigation onRouteChange={updateChatContext} />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Enhanced AI Chatbot */}
      <ChatBot context={currentContext} />

      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile
          user={user!}
          onClose={() => setShowProfile(false)}
          onUpdate={() => {
            // Handle profile update
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
