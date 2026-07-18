import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode, FormEvent } from "react";

interface AuthCardLayoutProps {
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  buttonText: string;
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
}

export default function AuthCardLayout({
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkTo,
  buttonText,
  onSubmit,
  children,
}: AuthCardLayoutProps) {
  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-hidden selection:bg-white/20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-car.png"
          alt="Luxury Minimalist Car"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full px-8 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-xl font-medium tracking-widest uppercase text-white/90">
            AutoInventory
          </span>
        </Link>
      </nav>

      {/* Form content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4">
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 w-full max-w-sm">
          <Card className="w-full bg-black/40 backdrop-blur-xl border-white/10 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
              <CardDescription className="text-white/60">
                {description}
              </CardDescription>
              <div className="mt-2 text-sm text-white/50">
                {footerText}{" "}
                <Link
                  to={footerLinkTo}
                  className="text-white hover:text-white/80 underline underline-offset-4 transition-colors"
                >
                  {footerLinkText}
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-6">
                  {/* Form fields */}
                  {children}
                </div>
                <CardFooter className="flex-col gap-2 px-0 pt-8 pb-0">
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-white/90 font-medium h-11"
                  >
                    {buttonText}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
