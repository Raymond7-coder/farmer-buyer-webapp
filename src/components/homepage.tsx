import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, ShoppingCart, TrendingUp, Leaf, MapPin, DollarSign, ArrowRight, UserCheck } from 'lucide-react';

interface User {
  email: string;
  userType: 'farmer' | 'buyer';
  name?: string;
}

interface HomepageProps {
  setCurrentPage: (page: string) => void;
  onUserTypeSelect: (userType: 'farmer' | 'buyer', action: 'login' | 'signup') => void;
  user: User | null;
}

export function Homepage({ setCurrentPage, onUserTypeSelect, user }: HomepageProps) {
  // If user is logged in, show personalized homepage
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Logged-in User Homepage */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
                Welcome back, {user.name || user.email.split('@')[0]}!
              </h1>
              <p className="text-xl md:text-2xl text-green-600 mb-12 max-w-3xl mx-auto">
                {user.userType === 'farmer' 
                  ? 'Ready to manage your farm and connect with buyers?' 
                  : 'Ready to find fresh produce from local farmers?'}
              </p>
              
              {/* Quick Actions for logged-in users */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {user.userType === 'farmer' ? (
                  <>
                    <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 p-4 bg-green-600 rounded-full w-fit">
                          <Users size={48} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-800 mb-4">My Dashboard</h3>
                        <p className="text-green-700 mb-6">
                          View your sales, manage products, and track performance
                        </p>
                        <Button 
                          size="lg" 
                          className="w-full py-3 bg-green-600 hover:bg-green-700"
                          onClick={() => setCurrentPage('farmers')}
                        >
                          Go to Dashboard
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 p-4 bg-blue-600 rounded-full w-fit">
                          <TrendingUp size={48} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">Market Trends</h3>
                        <p className="text-blue-700 mb-6">
                          Check current market prices and trends for your crops
                        </p>
                        <Button 
                          size="lg" 
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700"
                          onClick={() => setCurrentPage('trends')}
                        >
                          View Trends
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 p-4 bg-purple-600 rounded-full w-fit">
                          <UserCheck size={48} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-purple-800 mb-4">My Account</h3>
                        <p className="text-purple-700 mb-6">
                          Update your profile and manage account settings
                        </p>
                        <Button 
                          size="lg" 
                          className="w-full py-3 bg-purple-600 hover:bg-purple-700"
                          onClick={() => setCurrentPage('account')}
                        >
                          Manage Account
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 p-4 bg-blue-600 rounded-full w-fit">
                          <ShoppingCart size={48} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">Marketplace</h3>
                        <p className="text-blue-700 mb-6">
                          Browse fresh products from local farmers
                        </p>
                        <Button 
                          size="lg" 
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700"
                          onClick={() => setCurrentPage('buyers')}
                        >
                          Start Shopping
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 p-4 bg-green-600 rounded-full w-fit">
                          <TrendingUp size={48} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-800 mb-4">Market Trends</h3>
                        <p className="text-green-700 mb-6">
                          Check current market prices and seasonal availability
                        </p>
                        <Button 
                          size="lg" 
                          className="w-full py-3 bg-green-600 hover:bg-green-700"
                          onClick={() => setCurrentPage('trends')}
                        >
                          View Trends
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 p-4 bg-purple-600 rounded-full w-fit">
                          <UserCheck size={48} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-purple-800 mb-4">My Account</h3>
                        <p className="text-purple-700 mb-6">
                          View orders, saved products, and account settings
                        </p>
                        <Button 
                          size="lg" 
                          className="w-full py-3 bg-purple-600 hover:bg-purple-700"
                          onClick={() => setCurrentPage('account')}
                        >
                          Manage Account
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630277975641-38748ee8f41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm0lMjBmaWVsZCUyMGNyb3BzfGVufDF8fHx8MTc1ODUxMjM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Agricultural field with crops"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Recent Activity for logged-in users */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-800 text-2xl">
                  {user.userType === 'farmer' ? 'Recent Farm Activity' : 'Recent Activity'}
                </CardTitle>
                <CardDescription className="text-green-600">
                  {user.userType === 'farmer' 
                    ? 'Your latest sales and product updates'
                    : 'Your recent orders and saved products'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.userType === 'farmer' ? (
                    <>
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                          <Leaf className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-green-800">New product listing created</p>
                          <p className="text-green-600 text-sm">Organic Tomatoes - 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <DollarSign className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-green-800">Sale completed</p>
                          <p className="text-green-600 text-sm">10kg Fresh Carrots - ₦450 - 5 hours ago</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <ShoppingCart className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-blue-800">Order placed</p>
                          <p className="text-blue-600 text-sm">Fresh Spinach - ₦200 - 3 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                          <Leaf className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-blue-800">Product saved</p>
                          <p className="text-blue-600 text-sm">Organic Apples from Orchard Hills - 1 day ago</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12">
              Why Choose FarmConnect?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-green-600 mb-4">
                  <Leaf size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Fresh & Local</h3>
                <p className="text-green-600">
                  Connect directly with local farmers for the freshest produce in your area
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-green-600 mb-4">
                  <DollarSign size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Fair Prices</h3>
                <p className="text-green-600">
                  Transparent pricing that benefits both farmers and buyers
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-green-600 mb-4">
                  <TrendingUp size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Market Insights</h3>
                <p className="text-green-600">
                  Real-time market trends and pricing data to make informed decisions
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Original homepage for non-logged-in users
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              Welcome to FarmConnect
            </h1>
            <p className="text-xl md:text-2xl text-green-600 mb-12 max-w-3xl mx-auto">
              Choose your path and join our community of farmers and buyers
            </p>
            
            {/* User Type Selection - Main CTA */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-8">Who are you?</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                
                {/* I am a Farmer */}
                <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-6 p-6 bg-green-600 rounded-full w-fit">
                      <Users size={64} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-800 mb-4">I am a Farmer</h3>
                    <p className="text-lg text-green-700 mb-8">
                      Sell your fresh produce directly to buyers and earn fair prices
                    </p>
                    <div className="space-y-4">
                      <Button 
                        size="lg" 
                        className="w-full py-4 text-xl bg-green-600 hover:bg-green-700"
                        onClick={() => onUserTypeSelect('farmer', 'login')}
                      >
                        <UserCheck size={24} className="mr-3" />
                        Sign In as Farmer
                        <ArrowRight size={24} className="ml-3" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="w-full py-4 text-xl border-green-600 text-green-600 hover:bg-green-50"
                        onClick={() => onUserTypeSelect('farmer', 'signup')}
                      >
                        Create Farmer Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* I am a Buyer */}
                <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-6 p-6 bg-blue-600 rounded-full w-fit">
                      <ShoppingCart size={64} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-800 mb-4">I am a Buyer</h3>
                    <p className="text-lg text-blue-700 mb-8">
                      Find fresh, quality produce directly from local farmers
                    </p>
                    <div className="space-y-4">
                      <Button 
                        size="lg" 
                        className="w-full py-4 text-xl bg-blue-600 hover:bg-blue-700"
                        onClick={() => onUserTypeSelect('buyer', 'login')}
                      >
                        <UserCheck size={24} className="mr-3" />
                        Sign In as Buyer
                        <ArrowRight size={24} className="ml-3" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="w-full py-4 text-xl border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={() => onUserTypeSelect('buyer', 'signup')}
                      >
                        Create Buyer Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630277975641-38748ee8f41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm0lMjBmaWVsZCUyMGNyb3BzfGVufDF8fHx8MTc1ODUxMjM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Agricultural field with crops"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">1,200+</div>
                <div className="text-green-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">500+</div>
                <div className="text-green-600">Daily Buyers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">50+</div>
                <div className="text-green-600">Product Types</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Main Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Farmers Section */}
            <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200 shadow-lg">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 p-4 bg-green-600 rounded-full w-fit">
                  <Users size={48} className="text-white" />
                </div>
                <CardTitle className="text-3xl text-green-800 mb-4">For Farmers</CardTitle>
                <CardDescription className="text-lg text-green-600">
                  Sell your fresh produce directly to buyers and get fair prices for your hard work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="mb-8">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1757973779480-539b5f0d3a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NTg2MDYxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Farmer harvesting vegetables"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Leaf className="text-green-600" size={24} />
                    <span className="text-green-800">List your products with photos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="text-green-600" size={24} />
                    <span className="text-green-800">Set your own prices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="text-green-600" size={24} />
                    <span className="text-green-800">Track your sales</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-green-600" size={24} />
                    <span className="text-green-800">Reach local buyers</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full py-4 text-lg bg-green-600 hover:bg-green-700"
                  onClick={() => setCurrentPage('farmers')}
                >
                  Start Selling
                </Button>
              </CardContent>
            </Card>

            {/* Buyers Section */}
            <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 shadow-lg">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 p-4 bg-blue-600 rounded-full w-fit">
                  <ShoppingCart size={48} className="text-white" />
                </div>
                <CardTitle className="text-3xl text-blue-800 mb-4">For Buyers</CardTitle>
                <CardDescription className="text-lg text-blue-600">
                  Get fresh, quality produce directly from local farmers at competitive prices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="mb-8">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1696219364443-0a34143c7cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBtYXJrZXQlMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzU4NTkzNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Fresh vegetables at market"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Leaf className="text-blue-600" size={24} />
                    <span className="text-blue-800">Browse fresh products</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="text-blue-600" size={24} />
                    <span className="text-blue-800">Compare prices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="text-blue-600" size={24} />
                    <span className="text-blue-800">View market trends</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-blue-600" size={24} />
                    <span className="text-blue-800">Find local farmers</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full py-4 text-lg bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentPage('buyers')}
                >
                  Start Buying
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12">
            Why Choose FarmConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-green-600 mb-4">
                <Leaf size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Fresh & Local</h3>
              <p className="text-green-600">
                Connect directly with local farmers for the freshest produce in your area
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-green-600 mb-4">
                <DollarSign size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Fair Prices</h3>
              <p className="text-green-600">
                Transparent pricing that benefits both farmers and buyers
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-green-600 mb-4">
                <TrendingUp size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Market Insights</h3>
              <p className="text-green-600">
                Real-time market trends and pricing data to make informed decisions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}