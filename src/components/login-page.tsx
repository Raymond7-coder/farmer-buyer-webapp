import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  userType: 'farmer' | 'buyer';
  onBack: () => void;
  onLogin: (userType: 'farmer' | 'buyer', email: string) => void;
  onSwitchToSignup: () => void;
}

export function LoginPage({ userType, onBack, onLogin, onSwitchToSignup }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email or phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate successful login
    onLogin(userType, formData.email);
  };

  const isEmailValid = (email: string) => {
    return email.includes('@') || /^\+?[\d\s-()]+$/.test(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
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
            <User size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {userType === 'farmer' ? 'Farmer Login' : 'Buyer Login'}
          </h1>
          <p className="text-green-600">
            Welcome back! Sign in to your account
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={userType === 'farmer' 
              ? "https://images.unsplash.com/photo-1757973779480-539b5f0d3a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NTg2MDYxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              : "https://images.unsplash.com/photo-1696219364443-0a34143c7cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBtYXJrZXQlMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzU4NTkzNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            }
            alt={userType === 'farmer' ? 'Farmer harvesting' : 'Fresh market produce'}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Login Form */}
        <Card className="bg-white shadow-xl border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800">Sign In</CardTitle>
            <CardDescription className="text-lg">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-800 flex items-center">
                  <Mail size={20} className="mr-2 text-green-600" />
                  Email or Phone Number
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com or +1234567890"
                  className={`border-green-300 focus:ring-green-500 py-4 text-lg ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
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
                    placeholder="Enter your password"
                    className={`border-green-300 focus:ring-green-500 py-4 text-lg pr-12 ${
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
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2"
                >
                  Forgot Password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                size="lg"
                className={`w-full py-4 text-xl ${
                  userType === 'farmer' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Sign In
              </Button>

              {/* Switch to Signup */}
              <div className="text-center pt-4 border-t border-green-200">
                <p className="text-green-700 mb-4">
                  Don't have an account?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onSwitchToSignup}
                  className={`w-full py-4 text-lg ${
                    userType === 'farmer'
                      ? 'border-green-600 text-green-600 hover:bg-green-50'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Create New Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-green-600 mb-4">
            Need help? Contact our support team
          </p>
          <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
            Get Help
          </Button>
        </div>
      </div>
    </div>
  );
}