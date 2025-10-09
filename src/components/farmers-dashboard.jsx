import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Plus, Edit, Trash2, DollarSign, Package, TrendingUp, Eye } from 'lucide-react';

export function FarmersDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 60,
      quantity: 100,
      unit: 'kg',
      description: 'Fresh organic tomatoes grown without pesticides',
      image: 'https://images.unsplash.com/photo-1752917680382-3ac274d84103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBwZXBwZXJzfGVufDF8fHx8MTc1ODYwNjE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      location: 'Lagos, Nigeria'
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      category: 'Vegetables',
      price: 45,
      quantity: 150,
      unit: 'kg',
      description: 'Sweet and crunchy carrots, perfect for cooking',
      image: 'https://images.unsplash.com/photo-1752917680382-3ac274d84103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBwZXBwZXJzfGVufDF8fHx8MTc1ODYwNjE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      location: 'Kano, Nigeria'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    unit: 'kg',
    description: '',
    location: 'My Farm, Nigeria'
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const product = {
        id: Date.now().toString(),
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
        unit: newProduct.unit,
        description: newProduct.description,
        image: 'https://images.unsplash.com/photo-1752917680382-3ac274d84103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBwZXBwZXJzfGVufDF8fHx8MTc1ODYwNjE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: newProduct.location
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        category: '',
        price: '',
        quantity: '',
        unit: 'kg',
        description: '',
        location: 'My Farm, Nigeria'
      });
      setActiveTab('products');
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Farmer Dashboard</h1>
          <p className="text-green-600">Manage your products and track your sales</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('dashboard')}
            className={activeTab === 'dashboard' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}
          >
            <TrendingUp size={20} className="mr-2" />
            Sales Tracking
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}
          >
            <Package size={20} className="mr-2" />
            My Listings
          </Button>
          <Button
            variant={activeTab === 'add-product' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('add-product')}
            className={activeTab === 'add-product' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}
          >
            <Plus size={20} className="mr-2" />
            Add Product
          </Button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-green-800">
                    <DollarSign size={24} className="mr-2 text-green-600" />
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">₦{totalRevenue.toFixed(2)}</div>
                  <p className="text-green-600">Based on current inventory</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-green-800">
                    <Package size={24} className="mr-2 text-green-600" />
                    Products Listed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">{totalProducts}</div>
                  <p className="text-green-600">Active listings</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-green-800">
                    <TrendingUp size={24} className="mr-2 text-green-600" />
                    Total Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">{totalQuantity}</div>
                  <p className="text-green-600">Kg available</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Activity</CardTitle>
                <CardDescription>Your latest product updates and sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <Package className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-green-800">Product Added: Organic Tomatoes</p>
                      <p className="text-green-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <DollarSign className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-green-800">Sale: 10kg Fresh Carrots</p>
                      <p className="text-green-600">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-800">My Products</CardTitle>
                <CardDescription>Manage your product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="border-green-200">
                      <CardContent className="p-4">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-green-800 mb-2">{product.name}</h3>
                        <p className="text-green-600 text-sm mb-2">{product.category}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-2xl font-bold text-green-700">₦{product.price}</span>
                          <span className="text-green-600">per {product.unit}</span>
                        </div>
                        <p className="text-green-600 mb-3">Available: {product.quantity} {product.unit}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 border-green-600 text-green-600 hover:bg-green-50">
                            <Edit size={16} className="mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-600 text-red-600 hover:bg-red-50"
                            onClick={() => removeProduct(product.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add-product' && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-green-800">Add New Product</CardTitle>
              <CardDescription>List a new product for sale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-green-800">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="e.g., Organic Tomatoes"
                      className="mt-2 border-green-300 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-green-800">Category</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                      <SelectTrigger className="mt-2 border-green-300 focus:ring-green-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Grains">Grains</SelectItem>
                        <SelectItem value="Herbs">Herbs</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-green-800">Price (₦)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="0.00"
                        className="mt-2 border-green-300 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="unit" className="text-green-800">Unit</Label>
                      <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({...newProduct, unit: value})}>
                        <SelectTrigger className="mt-2 border-green-300 focus:ring-green-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">per kg</SelectItem>
                          <SelectItem value="lb">per lb</SelectItem>
                          <SelectItem value="piece">per piece</SelectItem>
                          <SelectItem value="bunch">per bunch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="quantity" className="text-green-800">Available Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                      placeholder="0"
                      className="mt-2 border-green-300 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description" className="text-green-800">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="Describe your product..."
                      rows={6}
                      className="mt-2 border-green-300 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-green-800">Farm Location</Label>
                    <Input
                      id="location"
                      value={newProduct.location}
                      onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                      placeholder="Your farm name or location"
                      className="mt-2 border-green-300 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-green-200">
                <Button 
                  size="lg" 
                  onClick={handleAddProduct}
                  className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700"
                >
                  <Plus size={20} className="mr-2" />
                  Add Product
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}