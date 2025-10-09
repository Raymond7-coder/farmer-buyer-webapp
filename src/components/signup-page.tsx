import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, MapPin, Phone, UserCheck } from 'lucide-react';

interface SignupPageProps {
  userType: 'farmer' | 'buyer';
  onBack: () => void;
  onSignup: (userType: 'farmer' | 'buyer', userData: any) => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ userType, onBack, onSignup, onSwitchToLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    // Farmer specific
    farmName: '',
    productTypes: [] as string[],
    farmSize: '',
    // Buyer specific
    interestedProducts: [] as string[],
    businessType: '',
    // Terms
    agreeToTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const productCategories = [
    'Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Poultry', 'Organic Produce', 'Seasonal Crops'
  ];

  const handleProductTypeChange = (product: string, field: 'productTypes' | 'interestedProducts') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(product)
        ? prev[field].filter(p => p !== product)
        : [...prev[field], product]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    // Basic validation
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.agreeToTerms) newErrors.terms = 'Please accept the terms and conditions';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Role-specific validation
    if (userType === 'farmer') {
      if (!formData.farmName) newErrors.farmName = 'Farm name is required';
      if (formData.productTypes.length === 0) newErrors.productTypes = 'Select at least one product type';
    } else {
      if (formData.interestedProducts.length === 0) newErrors.interestedProducts = 'Select at least one product of interest';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate successful signup
    onSignup(userType, formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-green-700 hover:bg-green-50 p-3"
          size="lg"
        >
          <ArrowLeft size={24} className="mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`mx-auto mb-4 p-4 rounded-full w-fit ${
            userType === 'farmer' ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            <UserCheck size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {userType === 'farmer' ? 'Join as a Farmer' : 'Join as a Buyer'}
          </h1>
          <p className="text-green-600">
            Create your account and start {userType === 'farmer' ? 'selling fresh produce' : 'buying fresh produce'}
          </p>
        </div>

        {/* Signup Form */}
        <Card className="bg-white shadow-xl border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800">Create Account</CardTitle>
            <CardDescription className="text-lg">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-800 flex items-center">
                    <User size={20} className="mr-2 text-green-600" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your full name"
                    className={`border-green-300 focus:ring-green-500 py-3 ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-800 flex items-center">
                    <Mail size={20} className="mr-2 text-green-600" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className={`border-green-300 focus:ring-green-500 py-3 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-green-800 flex items-center">
                    <Phone size={20} className="mr-2 text-green-600" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+234 XXX XXX XXXX"
                    className={`border-green-300 focus:ring-green-500 py-3 ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-green-800 flex items-center">
                    <MapPin size={20} className="mr-2 text-green-600" />
                    {userType === 'farmer' ? 'Village/City' : 'City/Area'}
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Your location"
                    className={`border-green-300 focus:ring-green-500 py-3 ${
                      errors.location ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-800 flex items-center">
                    <Lock size={20} className="mr-2 text-green-600" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Create password"
                      className={`border-green-300 focus:ring-green-500 py-3 pr-12 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:bg-green-50"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-green-800 flex items-center">
                    <Lock size={20} className="mr-2 text-green-600" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm password"
                      className={`border-green-300 focus:ring-green-500 py-3 pr-12 ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:bg-green-50"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Role-specific fields */}
              {userType === 'farmer' ? (
                <>
                  {/* Farm Name */}
                  <div className="space-y-2">
                    <Label htmlFor="farmName" className="text-green-800">Farm Name</Label>
                    <Input
                      id="farmName"
                      value={formData.farmName}
                      onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                      placeholder="Your farm name"
                      className={`border-green-300 focus:ring-green-500 py-3 ${
                        errors.farmName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.farmName && <p className="text-red-600 text-sm">{errors.farmName}</p>}
                  </div>

                  {/* Product Types */}
                  <div className="space-y-3">
                    <Label className="text-green-800">What do you usually grow/sell?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {productCategories.map((product) => (
                        <div key={product} className="flex items-center space-x-2">
                          <Checkbox
                            id={`product-${product}`}
                            checked={formData.productTypes.includes(product)}
                            onCheckedChange={() => handleProductTypeChange(product, 'productTypes')}
                            className="border-green-300"
                          />
                          <Label 
                            htmlFor={`product-${product}`} 
                            className="text-green-700 text-sm cursor-pointer"
                          >
                            {product}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.productTypes && <p className="text-red-600 text-sm">{errors.productTypes}</p>}
                  </div>

                  {/* Farm Size */}
                  <div className="space-y-2">
                    <Label htmlFor="farmSize" className="text-green-800">Farm Size (optional)</Label>
                    <Input
                      id="farmSize"
                      value={formData.farmSize}
                      onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                      placeholder="e.g., 5 acres, 2 hectares"
                      className="border-green-300 focus:ring-green-500 py-3"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Business Type */}
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-green-800">Business Type (optional)</Label>
                    <Input
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                      placeholder="e.g., Restaurant, Retailer, Individual"
                      className="border-green-300 focus:ring-green-500 py-3"
                    />
                  </div>

                  {/* Interested Products */}
                  <div className="space-y-3">
                    <Label className="text-green-800">What are you interested in buying?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {productCategories.map((product) => (
                        <div key={product} className="flex items-center space-x-2">
                          <Checkbox
                            id={`interest-${product}`}
                            checked={formData.interestedProducts.includes(product)}
                            onCheckedChange={() => handleProductTypeChange(product, 'interestedProducts')}
                            className="border-green-300"
                          />
                          <Label 
                            htmlFor={`interest-${product}`} 
                            className="text-green-700 text-sm cursor-pointer"
                          >
                            {product}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.interestedProducts && <p className="text-red-600 text-sm">{errors.interestedProducts}</p>}
                  </div>
                </>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: !!checked})}
                  className="border-green-300 mt-1"
                />
                <div>
                  <Label htmlFor="terms" className="text-green-800 cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                  <p className="text-green-600 text-sm mt-1">
                    By creating an account, you agree to our terms and conditions
                  </p>
                  {errors.terms && <p className="text-red-600 text-sm mt-1">{errors.terms}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className={`w-full py-4 text-xl ${
                  userType === 'farmer' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Create Account
              </Button>

              {/* Switch to Login */}
              <div className="text-center pt-4 border-t border-green-200">
                <p className="text-green-700 mb-4">
                  Already have an account?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onSwitchToLogin}
                  className={`w-full py-4 text-lg ${
                    userType === 'farmer'
                      ? 'border-green-600 text-green-600 hover:bg-green-50'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Sign In Instead
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}