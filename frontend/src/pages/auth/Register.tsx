import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCardLayout from "@/components/layout/AuthCardLayout";

const Register = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted");
  };

  return (
    <AuthCardLayout
      title="Create an account"
      description="Enter your details below to create your account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
      buttonText="Create Account"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-white/80">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          required
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
          className="bg-black/50 border-white/20 text-white focus-visible:ring-white/30 h-11"
        />
      </div>
    </AuthCardLayout>
  );
};

export default Register;
