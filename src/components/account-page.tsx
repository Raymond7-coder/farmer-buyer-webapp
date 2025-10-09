import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { User, Mail, Phone, MapPin, Calendar, Package, ShoppingCart } from 'lucide-react';
import { toast } from "sonner@2.0.3";

interface AccountPageProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    joinDate?: string;
    userType: 'farmer' | 'buyer';
  };
  onProfileUpdate: (profile: any) => void;
}

export function AccountPage({ user, onProfileUpdate }: AccountPageProps) {
  const [userType, setUserType] = useState<'farmer' | 'buyer' | null>(user?.userType || 'farmer');
  const [profile, setProfile] = useState({
    name: user?.name || 'Mirabel D',
    email: user?.email || 'mirabel@gmail.com',
    phone: user?.phone || '+234 800 123 4567',
    location: user?.location || 'Green Valley Farm, Lagos',
    joinDate: user?.joinDate || 'January 2024'
  });

  const handleSaveChanges = () => {
    onProfileUpdate(profile);
    toast.success('Profile updated successfully!');
  };

  const farmerStats = {
    totalProducts: 12,
    totalSales: 1250,
    revenue: 4825.50,
    avgRating: 4.8
  };

  const buyerStats = {
    totalOrders: 25,
    totalSpent: 680.25,
    favoriteCategory: 'Vegetables',
    memberSince: 'March 2024'
  };

  const recentActivity = [
    { type: 'product', title: 'Added Organic Tomatoes', date: '2 hours ago', status: 'active' },
    { type: 'sale', title: 'Sold 10kg Fresh Carrots', date: '5 hours ago', status: 'completed' },
    { type: 'product', title: 'Updated Bell Peppers price', date: '1 day ago', status: 'active' },
    { type: 'sale', title: 'Sold 15kg Spinach', date: '2 days ago', status: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">My Account</h1>
          <p className="text-green-600">Manage your profile and account settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* User Type Selection */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-800">Account Type</CardTitle>
                <CardDescription>Choose your account type to see relevant information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant={userType === 'farmer' ? 'default' : 'outline'}
                    onClick={() => setUserType('farmer')}
                    className={userType === 'farmer' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}
                  >
                    Farmer Account
                  </Button>
                  <Button
                    variant={userType === 'buyer' ? 'default' : 'outline'}
                    onClick={() => setUserType('buyer')}
                    className={userType === 'buyer' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}
                  >
                    Buyer Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Profile Information */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-green-800">Profile Information</CardTitle>
                  <CardDescription>Your basic account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">{profile.name}</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {userType === 'farmer' ? 'Verified Farmer' : 'Verified Buyer'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-green-600" size={20} />
                      <span className="text-green-800">{profile.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-green-600" size={20} />
                      <span className="text-green-800">{profile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-green-600" size={20} />
                      <span className="text-green-800">{profile.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-green-600" size={20} />
                      <span className="text-green-800">Joined {profile.joinDate}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    {userType === 'farmer' ? 'Farmer Statistics' : 'Buyer Statistics'}
                  </CardTitle>
                  <CardDescription>
                    {userType === 'farmer' ? 'Your farming business overview' : 'Your buying activity overview'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userType === 'farmer' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Package className="mx-auto text-green-600 mb-2" size={24} />
                        <div className="text-2xl font-bold text-green-800">{farmerStats.totalProducts}</div>
                        <div className="text-green-600 text-sm">Products Listed</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <ShoppingCart className="mx-auto text-green-600 mb-2" size={24} />
                        <div className="text-2xl font-bold text-green-800">{farmerStats.totalSales}</div>
                        <div className="text-green-600 text-sm">Items Sold</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">₦{farmerStats.revenue}</div>
                        <div className="text-green-600 text-sm">Total Revenue</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">{farmerStats.avgRating}</div>
                        <div className="text-green-600 text-sm">Avg Rating</div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <ShoppingCart className="mx-auto text-blue-600 mb-2" size={24} />
                        <div className="text-2xl font-bold text-blue-800">{buyerStats.totalOrders}</div>
                        <div className="text-blue-600 text-sm">Total Orders</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-800">₦{buyerStats.totalSpent}</div>
                        <div className="text-blue-600 text-sm">Total Spent</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg col-span-2">
                        <div className="text-lg font-bold text-blue-800">{buyerStats.favoriteCategory}</div>
                        <div className="text-blue-600 text-sm">Favorite Category</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Activity</CardTitle>
                <CardDescription>Your latest actions and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'product' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {activity.type === 'product' ? 
                            <Package className={`${activity.type === 'product' ? 'text-green-600' : 'text-blue-600'}`} size={20} /> :
                            <ShoppingCart className="text-blue-600" size={20} />
                          }
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800">{activity.title}</h4>
                          <p className="text-green-600 text-sm">{activity.date}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={activity.status === 'active' ? 'default' : 'secondary'}
                        className={activity.status === 'active' ? 'bg-green-600' : 'bg-gray-400'}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-800">Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-green-800">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="mt-2 border-green-300 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-green-800">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="mt-2 border-green-300 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone" className="text-green-800">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="mt-2 border-green-300 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-green-800">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="mt-2 border-green-300 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-green-200">
                  <div className="flex space-x-4">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => setProfile({
                        name: user?.name || 'Mirabel D',
                        email: user?.email || 'mirabel@gmail.com',
                        phone: user?.phone || '+234 800 123 4567',
                        location: user?.location || 'Green Valley Farm, Lagos',
                        joinDate: user?.joinDate || 'January 2024'
                      })}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}