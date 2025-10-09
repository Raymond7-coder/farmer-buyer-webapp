import { useState } from 'react';
import { Navigation } from './components/navigation';
import { Homepage } from './components/homepage';
import { LoginPage } from './components/login-page';
import { SignupPage } from './components/signup-page';
import { FarmersDashboard } from './components/farmers-dashboard';
import { BuyersMarketplace } from './components/buyers-marketplace';
import { MarketTrends } from './components/market-trends';
import { AccountPage } from './components/account-page';
import { Toaster } from './components/ui/sonner';

interface User {
  email: string;
  userType: 'farmer' | 'buyer';
  name?: string;
  phone?: string;
  location?: string;
  joinDate?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authPage, setAuthPage] = useState<'login' | 'signup' | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<'farmer' | 'buyer' | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const handleUserTypeSelect = (userType: 'farmer' | 'buyer', action: 'login' | 'signup') => {
    setSelectedUserType(userType);
    setAuthPage(action);
  };

  const handleLogin = (userType: 'farmer' | 'buyer', email: string) => {
    // Simulate login
    setUser({ 
      email, 
      userType, 
      name: 'Mirabel D',
      phone: '+234 800 123 4567',
      location: 'Green Valley Farm, Lagos',
      joinDate: 'January 2024'
    });
    setAuthPage(null);
    setSelectedUserType(null);
    // Redirect to appropriate dashboard
    setCurrentPage(userType === 'farmer' ? 'farmers' : 'buyers');
  };

  const handleSignup = (userType: 'farmer' | 'buyer', userData: any) => {
    // Simulate signup
    setUser({ 
      email: userData.email, 
      userType, 
      name: userData.name,
      phone: userData.phone || '+234 800 123 4567',
      location: userData.location || 'Lagos, Nigeria',
      joinDate: 'January 2024'
    });
    setAuthPage(null);
    setSelectedUserType(null);
    // Redirect to appropriate dashboard
    setCurrentPage(userType === 'farmer' ? 'farmers' : 'buyers');
  };

  const handleProfileUpdate = (updatedProfile: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedProfile });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentPage('home');
  };

  const handleBackToHome = () => {
    setAuthPage(null);
    setSelectedUserType(null);
    setCurrentPage('home');
  };

  // If showing auth pages
  if (authPage && selectedUserType) {
    if (authPage === 'login') {
      return (
        <LoginPage
          userType={selectedUserType}
          onBack={handleBackToHome}
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthPage('signup')}
        />
      );
    } else {
      return (
        <SignupPage
          userType={selectedUserType}
          onBack={handleBackToHome}
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthPage('login')}
        />
      );
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage setCurrentPage={setCurrentPage} onUserTypeSelect={handleUserTypeSelect} user={user} />;
      case 'farmers':
        return user?.userType === 'farmer' ? <FarmersDashboard /> : <Homepage setCurrentPage={setCurrentPage} onUserTypeSelect={handleUserTypeSelect} />;
      case 'buyers':
        return user?.userType === 'buyer' ? <BuyersMarketplace /> : <Homepage setCurrentPage={setCurrentPage} onUserTypeSelect={handleUserTypeSelect} />;
      case 'trends':
        return <MarketTrends />;
      case 'account':
        return user ? (
          <AccountPage 
            user={user} 
            onProfileUpdate={handleProfileUpdate} 
          />
        ) : (
          <Homepage setCurrentPage={setCurrentPage} onUserTypeSelect={handleUserTypeSelect} />
        );
      default:
        return <Homepage setCurrentPage={setCurrentPage} onUserTypeSelect={handleUserTypeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user}
        onLogout={handleLogout}
      />
      {renderPage()}
      <Toaster />
    </div>
  );
}