import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCardLayout from "@/components/layout/AuthCardLayout";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { registerAction } from "@/redux/actions/authActions";

const Register = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.common);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replaced api call with dispatch and reducer so multiple api calls does not takes place and clean/smooth data transistion
    const isSuccess = await dispatch(registerAction(name,email, password));
  
  if (isSuccess) {
    // If success (true) then user will be send to dashboard with it's token saved
    navigate("/dashboard");
  }
  };

  return (
    <AuthCardLayout
      title="Create an account"
      description="Enter your details below to create your account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
      buttonText={isLoading ? "Creating Account..." : "Create Account"}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-md text-sm text-center mb-2 animate-in fade-in">
          {error}
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-white/80">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-white/30 h-11"
        />
      </div>
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
        <Label htmlFor="password" className="text-white/80">Password</Label>
        <Input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="bg-black/50 border-white/20 text-white focus-visible:ring-white/30 h-11"
        />
      </div>
    </AuthCardLayout>
  );
};

export default Register;
