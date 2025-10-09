import { useState } from 'react';
import { Button } from "./ui/button";
import { Menu, X, Home, Users, ShoppingCart, TrendingUp, User, LogOut } from 'lucide-react';

export function Navigation({ currentPage, setCurrentPage, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavItems = () => {
    const baseItems = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    ];

    if (user) {
      if (user.userType === 'farmer') {
        baseItems.splice(1, 0, { id: 'farmers', label: 'My Dashboard', icon: Users });
      } else {
        baseItems.splice(1, 0, { id: 'buyers', label: 'Marketplace', icon: ShoppingCart });
      }
      baseItems.push({ id: 'account', label: 'My Account', icon: User });
    } else {
      baseItems.splice(1, 0, 
        { id: 'farmers', label: 'For Farmers', icon: Users },
        { id: 'buyers', label: 'For Buyers', icon: ShoppingCart }
      );
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-green-600 p-2 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <span className="text-green-600 font-bold">🌱</span>
              </div>
            </div>
            <span className="ml-3 text-xl font-semibold text-green-800">FarmConnect</span>
          </div>

          {/* User Info (Desktop) */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-green-600">Welcome back,</p>
                <p className="font-medium text-green-800">{user.name || user.email.split('@')[0]}</p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                user.userType === 'farmer' ? 'bg-green-600' : 'bg-blue-600'
              }`}>
                <User className="text-white" size={20} />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="lg"
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-6 py-3 flex items-center space-x-2 ${
                    currentPage === item.id 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "text-green-700 hover:bg-green-50"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Button>
              );
            })}
            
            {/* Logout Button (Desktop) */}
            {user && (
              <Button
                variant="outline"
                size="lg"
                onClick={onLogout}
                className="px-6 py-3 border-red-600 text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-green-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-200">
            {/* User Info (Mobile) */}
            {user && (
              <div className="px-6 py-4 bg-green-50 mx-4 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    user.userType === 'farmer' ? 'bg-green-600' : 'bg-blue-600'
                  }`}>
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">{user.name || user.email.split('@')[0]}</p>
                    <p className="text-sm text-green-600 capitalize">{user.userType}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="lg"
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start px-6 py-4 flex items-center space-x-3 ${
                      currentPage === item.id 
                        ? "bg-green-600 text-white" 
                        : "text-green-700 hover:bg-green-50"
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-lg">{item.label}</span>
                  </Button>
                );
              })}
              
              {/* Logout Button (Mobile) */}
              {user && (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start px-6 py-4 flex items-center space-x-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={24} />
                  <span className="text-lg">Logout</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}