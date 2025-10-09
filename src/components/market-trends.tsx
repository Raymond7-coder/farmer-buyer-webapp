import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react';

export function MarketTrends() {
  // Mock data for price trends
  const priceData = [
    { month: 'Jan', tomatoes: 3.20, carrots: 2.10, peppers: 3.80, spinach: 2.90, apples: 2.50 },
    { month: 'Feb', tomatoes: 3.40, carrots: 2.20, peppers: 3.90, spinach: 3.10, apples: 2.60 },
    { month: 'Mar', tomatoes: 3.60, carrots: 2.30, peppers: 4.10, spinach: 3.20, apples: 2.70 },
    { month: 'Apr', tomatoes: 3.50, carrots: 2.25, peppers: 4.00, spinach: 3.00, apples: 2.75 },
    { month: 'May', tomatoes: 3.30, carrots: 2.15, peppers: 3.85, spinach: 2.85, apples: 2.65 },
    { month: 'Jun', tomatoes: 3.45, carrots: 2.28, peppers: 3.95, spinach: 2.95, apples: 2.80 }
  ];

  // Mock data for demand trends
  const demandData = [
    { week: 'Week 1', vegetables: 450, fruits: 320, herbs: 150, grains: 200 },
    { week: 'Week 2', vegetables: 480, fruits: 340, herbs: 160, grains: 220 },
    { week: 'Week 3', vegetables: 520, fruits: 380, herbs: 180, grains: 240 },
    { week: 'Week 4', vegetables: 490, fruits: 360, herbs: 170, grains: 230 }
  ];

  // Mock data for category distribution
  const categoryData = [
    { name: 'Vegetables', value: 45, color: '#22c55e' },
    { name: 'Fruits', value: 30, color: '#3b82f6' },
    { name: 'Herbs', value: 15, color: '#f59e0b' },
    { name: 'Grains', value: 10, color: '#8b5cf6' }
  ];

  // Mock data for top products
  const topProducts = [
    { name: 'Organic Tomatoes', sales: 850, change: 12.5, trend: 'up' },
    { name: 'Fresh Carrots', sales: 720, change: 8.2, trend: 'up' },
    { name: 'Bell Peppers', sales: 690, change: -2.1, trend: 'down' },
    { name: 'Spinach', sales: 580, change: 15.7, trend: 'up' },
    { name: 'Apples', sales: 950, change: 6.3, trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Market Trends & Analytics</h1>
          <p className="text-green-600">Real-time insights into agricultural market dynamics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <TrendingUp size={24} className="mr-2" />
                Avg Price Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+8.5%</div>
              <p className="text-green-100">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <Package size={24} className="mr-2" />
                Total Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12.4K</div>
              <p className="text-blue-100">Kg sold this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <DollarSign size={24} className="mr-2" />
                Market Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₦45.2K</div>
              <p className="text-purple-100">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <TrendingUp size={24} className="mr-2" />
                Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,247</div>
              <p className="text-orange-100">Products available</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Price Trends Chart */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-green-800">Price Trends (Last 6 Months)</CardTitle>
              <CardDescription>Average prices per kg for popular products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #ddd',
                        borderRadius: '8px' 
                      }} 
                    />
                    <Line type="monotone" dataKey="tomatoes" stroke="#22c55e" strokeWidth={3} name="Tomatoes" />
                    <Line type="monotone" dataKey="carrots" stroke="#f59e0b" strokeWidth={3} name="Carrots" />
                    <Line type="monotone" dataKey="peppers" stroke="#ef4444" strokeWidth={3} name="Peppers" />
                    <Line type="monotone" dataKey="spinach" stroke="#10b981" strokeWidth={3} name="Spinach" />
                    <Line type="monotone" dataKey="apples" stroke="#3b82f6" strokeWidth={3} name="Apples" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Demand Trends Chart */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-green-800">Weekly Demand by Category</CardTitle>
              <CardDescription>Kg of products sold by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #ddd',
                        borderRadius: '8px' 
                      }} 
                    />
                    <Area type="monotone" dataKey="vegetables" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.7} />
                    <Area type="monotone" dataKey="fruits" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.7} />
                    <Area type="monotone" dataKey="herbs" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.7} />
                    <Area type="monotone" dataKey="grains" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.7} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Category Distribution */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-green-800">Market Share by Category</CardTitle>
              <CardDescription>Distribution of products by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="bg-white lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-green-800">Top Selling Products</CardTitle>
              <CardDescription>Best performing products this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">{product.name}</h4>
                        <p className="text-green-600 text-sm">{product.sales} kg sold</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {product.trend === 'up' ? (
                        <TrendingUp className="text-green-500" size={20} />
                      ) : (
                        <TrendingDown className="text-red-500" size={20} />
                      )}
                      <span className={`font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {product.change > 0 ? '+' : ''}{product.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights */}
        <Card className="bg-white mt-8">
          <CardHeader>
            <CardTitle className="text-green-800">Market Insights</CardTitle>
            <CardDescription>Key trends and observations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Seasonal Trends</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Spring vegetables showing increased demand</li>
                  <li>• Organic produce prices trending upward</li>
                  <li>• Local sourcing preference growing by 15%</li>
                  <li>• Fresh herbs experiencing seasonal peak</li>
                </ul>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Price Forecasts</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Tomato prices expected to stabilize next month</li>
                  <li>• Fruit prices may increase due to weather conditions</li>
                  <li>• Strong demand for leafy greens continues</li>
                  <li>• Root vegetables showing steady pricing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}