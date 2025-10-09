import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Filter, MapPin, ShoppingCart, Star, Heart, Package, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  image: string;
  farmer: string;
  location: string;
  distance: string;
  rating: number;
}

export function BuyersMarketplace() {
  const [activeTab, setActiveTab] = useState<'browse' | 'orders' | 'saved'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [savedProducts, setSavedProducts] = useState<string[]>([]);

  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 60,
      quantity: 100,
      unit: 'kg',
      description: 'Fresh organic tomatoes grown without pesticides. Perfect for cooking and salads.',
      image: 'https://images.unsplash.com/photo-1752917680382-3ac274d84103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBwZXBwZXJzfGVufDF8fHx8MTc1ODYwNjE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      farmer: 'Green Valley Farm',
      location: 'Lagos',
      distance: '5 km',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      category: 'Vegetables',
      price: 45,
      quantity: 150,
      unit: 'kg',
      description: 'Sweet and crunchy carrots, perfect for cooking and snacking.',
      image: 'https://images.unsplash.com/photo-1752917680382-3ac274d84103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBwZXBwZXJzfGVufDF8fHx8MTc1ODYwNjE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      farmer: 'Sunny Acres',
      location: 'Kano',
      distance: '8 km',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Sweet Bell Peppers',
      category: 'Vegetables',
      price: 80,
      quantity: 75,
      unit: 'kg',
      description: 'Colorful bell peppers in red, yellow, and green varieties.',
      image: 'https://images.unsplash.com/photo-1752917680382-3ac274d84103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBwZXBwZXJzfGVufDF8fHx8MTc1ODYwNjE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      farmer: 'Mountain View Farm',
      location: 'Kaduna',
      distance: '12 km',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Fresh Spinach',
      category: 'Vegetables',
      price: 50,
      quantity: 50,
      unit: 'kg',
      description: 'Tender baby spinach leaves, great for salads and cooking.',
      image: 'https://images.unsplash.com/photo-1696219364443-0a34143c7cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBtYXJrZXQlMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzU4NTkzNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      farmer: 'Green Valley Farm',
      location: 'Lagos',
      distance: '5 km',
      rating: 4.9
    },
    {
      id: '5',
      name: 'Organic Apples',
      category: 'Fruits',
      price: 55,
      quantity: 200,
      unit: 'kg',
      description: 'Crispy organic apples, perfect for eating fresh or baking.',
      image: 'https://images.unsplash.com/photo-1696219364443-0a34143c7cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBtYXJrZXQlMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzU4NTkzNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      farmer: 'Orchard Hills',
      location: 'Oyo',
      distance: '3 km',
      rating: 4.8
    },
    {
      id: '6',
      name: 'Fresh Basil',
      category: 'Herbs',
      price: 200,
      quantity: 25,
      unit: 'kg',
      description: 'Aromatic fresh basil, perfect for cooking and garnishing.',
      image: 'https://images.unsplash.com/photo-1696219364443-0a34143c7cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBtYXJrZXQlMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzU4NTkzNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      farmer: 'Herb Garden Co.',
      location: 'Rivers',
      distance: '7 km',
      rating: 4.7
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && product.price < 60) ||
                        (priceFilter === 'medium' && product.price >= 60 && product.price < 100) ||
                        (priceFilter === 'high' && product.price >= 100);
    const matchesLocation = locationFilter === 'all' || product.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const toggleSaved = (productId: string) => {
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  // Mock orders data
  const myOrders = [
    { id: '1', product: 'Organic Tomatoes', quantity: 5, total: 300, status: 'Delivered', date: '2024-01-20' },
    { id: '2', product: 'Fresh Carrots', quantity: 3, total: 135, status: 'In Transit', date: '2024-01-22' },
    { id: '3', product: 'Bell Peppers', quantity: 2, total: 160, status: 'Processing', date: '2024-01-23' }
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Buyer Dashboard</h1>
          <p className="text-blue-600">Browse products, manage orders, and track your purchases</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'browse' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('browse')}
            className={activeTab === 'browse' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}
          >
            <Search size={20} className="mr-2" />
            Browse Products
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}
          >
            <Package size={20} className="mr-2" />
            My Orders
          </Button>
          <Button
            variant={activeTab === 'saved' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('saved')}
            className={activeTab === 'saved' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}
          >
            <Heart size={20} className="mr-2" />
            Saved Products
          </Button>
        </div>

        {/* Browse Products Tab */}
        {activeTab === 'browse' && (
          <>
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
                    <Input
                      placeholder="Search products or farmers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-blue-300 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Herbs">Herbs</SelectItem>
                      <SelectItem value="Grains">Grains</SelectItem>
                      <SelectItem value="Dairy">Dairy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Under ₦60</SelectItem>
                      <SelectItem value="medium">₦60 - ₦100</SelectItem>
                      <SelectItem value="high">Over ₦100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Lagos">Lagos</SelectItem>
                      <SelectItem value="Kano">Kano</SelectItem>
                      <SelectItem value="Kaduna">Kaduna</SelectItem>
                      <SelectItem value="Oyo">Oyo</SelectItem>
                      <SelectItem value="Rivers">Rivers</SelectItem>
                      <SelectItem value="Abuja">Abuja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Cart Summary */}
        {activeTab === 'browse' && getTotalCartItems() > 0 && (
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={24} />
              <span className="font-medium">
                {getTotalCartItems()} item(s) in cart
              </span>
            </div>
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              View Cart
            </Button>
          </div>
        )}

        {/* Browse Products Tab Content */}
        {activeTab === 'browse' && (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-white border-blue-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={() => toggleSaved(product.id)}
                      >
                        <Heart 
                          size={20} 
                          className={savedProducts.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-500'} 
                        />
                      </Button>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-blue-800 text-lg">{product.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="text-blue-600 text-sm">{product.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-blue-600 text-sm mb-2">{product.category}</p>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin size={16} className="text-blue-500" />
                        <span className="text-blue-600 text-sm">{product.farmer} • {product.distance}</span>
                      </div>
                      
                      <p className="text-blue-700 text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-2xl font-bold text-blue-800">₦{product.price}</span>
                          <span className="text-blue-600 text-sm"> per {product.unit}</span>
                        </div>
                        <span className="text-blue-600 text-sm">
                          {product.quantity} {product.unit} available
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="lg" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart size={18} className="mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-blue-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">No products found</h3>
                <p className="text-blue-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </>
        )}

        {/* My Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-blue-800">My Orders</CardTitle>
                <CardDescription>Track your recent purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <Package className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800">{order.product}</h4>
                          <p className="text-blue-600 text-sm">
                            Quantity: {order.quantity} • Total: ₦{order.total}
                          </p>
                          <p className="text-blue-500 text-sm">Ordered on {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Saved Products Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-blue-800">Saved Products</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {savedProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart size={64} className="mx-auto text-blue-300 mb-4" />
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">No saved products</h3>
                    <p className="text-blue-600">Save products by clicking the heart icon when browsing</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProducts.filter(product => savedProducts.includes(product.id)).map((product) => (
                      <Card key={product.id} className="bg-white border-blue-200">
                        <CardContent className="p-4">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-semibold text-blue-800 mb-2">{product.name}</h3>
                          <p className="text-blue-600 text-sm mb-2">{product.farmer}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-800">₦{product.price}</span>
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => addToCart(product.id)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Featured Farmers */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Featured Farmers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🌾</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Green Valley Farm</h3>
              <p className="text-blue-600 text-sm mb-3">Organic vegetables and herbs</p>
              <div className="flex items-center justify-center space-x-1 mb-3">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="text-blue-600">4.8 rating</span>
              </div>
              <Button size="sm" variant="outline" className="border-blue-600 text-blue-600">
                View Products
              </Button>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🍎</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Orchard Hills</h3>
              <p className="text-blue-600 text-sm mb-3">Fresh seasonal fruits</p>
              <div className="flex items-center justify-center space-x-1 mb-3">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="text-blue-600">4.7 rating</span>
              </div>
              <Button size="sm" variant="outline" className="border-blue-600 text-blue-600">
                View Products
              </Button>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🌿</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Herb Garden Co.</h3>
              <p className="text-blue-600 text-sm mb-3">Premium fresh herbs</p>
              <div className="flex items-center justify-center space-x-1 mb-3">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="text-blue-600">4.9 rating</span>
              </div>
              <Button size="sm" variant="outline" className="border-blue-600 text-blue-600">
                View Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}