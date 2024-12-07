import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserPlus,
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Loader2,
  GraduationCap,
} from "lucide-react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Login = () => {
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signUpInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  const resetForm = (value) => {
    if (value === "signup") {
      setSignUpInput({ name: "", email: "", password: "" });
    } else {
      setLoginInput({ email: "", password: "" });
    }
  };

  useEffect(() => {
    if (registerSuccess && registerData) {
      toast.success(registerData.message || "User Registered Successfully");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Registration Error");
    }
    if (loginSuccess && loginData) {
      toast.success(loginData.message || "Login Successful");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Error");
    }
  }, [
    loginLoading,
    registerLoading,
    loginData,
    registerData,
    registerError,
    loginError,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
      <div className="w-full max-w-[400px] relative">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-white">
            <GraduationCap className="w-8 h-8" />
            <span className="text-2xl font-bold">Welcome to DevTube</span>
          </div>
        </div>

        <Tabs defaultValue="signup" className="w-full" onValueChange={resetForm}>
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#1A1F2E] rounded-lg p-1">
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-[#2A3142] rounded-md data-[state=active]:text-white transition-all duration-200"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign up
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-[#2A3142] rounded-md data-[state=active]:text-white transition-all duration-200"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <Card className="border-0 bg-[#1A1F2E] shadow-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">
                  Create an account
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Join our learning platform today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="name"
                      value={signUpInput.name}
                      required
                      onChange={(e) => changeInputHandler(e, "signup")}
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 bg-[#2A3142] border-[#3A4156] text-white placeholder:text-gray-500 focus:border-[#4A5166] focus:ring-[#4A5166]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="email"
                      value={signUpInput.email}
                      required
                      onChange={(e) => changeInputHandler(e, "signup")}
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10 bg-[#2A3142] border-[#3A4156] text-white placeholder:text-gray-500 focus:border-[#4A5166] focus:ring-[#4A5166]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="password"
                      value={signUpInput.password}
                      required
                      onChange={(e) => changeInputHandler(e, "signup")}
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-[#2A3142] border-[#3A4156] text-white placeholder:text-gray-500 focus:border-[#4A5166] focus:ring-[#4A5166]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerLoading}
                  onClick={() => handleRegistration("signup")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {registerLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card className="border-0 bg-[#1A1F2E] shadow-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Continue your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-gray-200">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="email"
                      value={loginInput.email}
                      type="email"
                      required
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="john@example.com"
                      className="pl-10 bg-[#2A3142] border-[#3A4156] text-white placeholder:text-gray-500 focus:border-[#4A5166] focus:ring-[#4A5166]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-gray-200">
                      Password
                    </Label>
                    <Button
                      variant="link"
                      className="px-0 font-normal text-xs text-blue-400 hover:text-blue-300"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="password"
                      value={loginInput.password}
                      required
                      onChange={(e) => changeInputHandler(e, "login")}
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-[#2A3142] border-[#3A4156] text-white placeholder:text-gray-500 focus:border-[#4A5166] focus:ring-[#4A5166]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginLoading}
                  onClick={() => handleRegistration("login")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;