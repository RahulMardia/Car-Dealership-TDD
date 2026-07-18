import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, POST } from "@/lib/apiConstants";
import { useApi } from "@/hooks/useApi";
import AuthCardLayout from "@/components/layout/AuthCardLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { request, isLoading, error } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await request(POST, api.login, { email, password });
      
      if (response.success && response.token) {
        // Save the token to local storage
        localStorage.setItem("token", response.token);
        
        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <AuthCardLayout
      title="Login to your account"
      description="Enter your email below to login to your account"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkTo="/register"
      buttonText={isLoading ? "Logging in..." : "Login"}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-md text-sm text-center mb-2 animate-in fade-in">
          {error}
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-white/80">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-white/30 h-11"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password" className="text-white/80">Password</Label>
          <a
            href="#"
            className="ml-auto inline-block text-sm text-white/50 hover:text-white underline-offset-4 hover:underline transition-colors"
          >
            Forgot your password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="bg-black/50 border-white/20 text-white focus-visible:ring-white/30 h-11"
        />
      </div>
    </AuthCardLayout>
  );
};

export default Login;