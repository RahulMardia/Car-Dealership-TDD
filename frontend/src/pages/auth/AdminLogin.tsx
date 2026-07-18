import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCardLayout from "@/components/layout/AuthCardLayout";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { adminLoginAction } from "@/redux/actions/authActions";

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useAppSelector((state) => state.common);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    const isSuccess = await dispatch(adminLoginAction(email, password));

    if (isSuccess) {
     
      navigate("/admin");
    }
  };

  return (
    <AuthCardLayout
      title="Admin Portal Login"
      description="Secure access for Dealership Administrators"
      footerText="Not an admin?"
      footerLinkText="User Login"
      footerLinkTo="/login"
      buttonText={isLoading ? "Authenticating..." : "Login as Admin"}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-md text-sm text-center mb-2 animate-in fade-in">
          {error}
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-white/80">Admin Email</Label>
        <Input
          id="email"
          type="email"
          placeholder=""
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-white/30 h-11"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password" className="text-white/80">Admin Password</Label>
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

export default AdminLogin;
