import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, Mail, Lock, Github, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-animated flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/40 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/30 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-primary/50 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-20 right-32 w-1 h-1 bg-primary/40 rounded-full animate-float-slow"></div>
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-primary/20 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float-fast"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Branding */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg animate-bounce-gentle hover:scale-110 transition-transform duration-300">
              <Bot className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white animate-slide-up">AgentEval</h1>
          <p className="text-muted-foreground mt-2 animate-slide-up animation-delay-200">
            Sign in to your AI Agent Evaluation platform
          </p>
        </div>

        <Card className="card-elevated animate-scale-in backdrop-blur-sm bg-card/95 border border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center animate-slide-up">SIGN IN</CardTitle>
            <CardDescription className="text-center animate-slide-up animation-delay-100">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 animate-slide-up animation-delay-200">
                <Label htmlFor="email" className="transition-colors duration-200">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 input-animated transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2 animate-slide-up animation-delay-300">
                <Label htmlFor="password" className="transition-colors duration-200">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 input-animated transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary animate-pulse-gentle hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-glow animate-slide-up animation-delay-400" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="space-y-4 animate-slide-up animation-delay-500">
              <Separator className="my-4" />
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Or continue with
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full transition-all duration-200 hover:scale-105 hover:bg-accent hover:border-primary/30">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  
                  <Button variant="outline" className="w-full transition-all duration-200 hover:scale-105 hover:bg-accent hover:border-primary/30">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm">
                <a href="#" className="text-primary hover:underline transition-all duration-200 hover:text-primary/80">
                  Forgot your password?
                </a>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline transition-all duration-200 hover:text-primary/80">
                  Sign up
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-muted-foreground animate-fade-in animation-delay-700">
          <p>Protected by enterprise-grade security & MFA</p>
        </div>
      </div>
    </div>
  );
}