import { Link } from "react-router-dom";
import { ArrowRight, KeyRound, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";

const WORDS = ["Mobility.", "Luxury.", "Performance.", "Excellence."];

const LandingPage = () => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-hidden selection:bg-white/20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-car.png" 
          alt="Luxury Minimalist Car" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-in fade-in zoom-in duration-[3000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-xl font-medium tracking-widest uppercase text-white/90">
            AutoInventory
          </span>
        </div>
      </nav>

      {/* Main */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            Redefining{" "}
            <span 
              key={currentWord} 
              className="text-white/50 animate-in fade-in slide-in-from-bottom-2 duration-700 inline-block"
            >
              {WORDS[currentWord]}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the pinnacle of automotive excellence. Browse our curated collection of premium vehicles, seamlessly managed through state-of-the-art inventory systems.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <KeyRound className="w-4 h-4" />
              <span>Sign In</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </Link>

            <Link 
              to="/register"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="pt-12 animate-in fade-in duration-1000 delay-500">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm font-medium tracking-widest uppercase text-white/40">
              <span>500+ Vehicles in Stock</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span>Instant Digital Purchasing</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span>24/7 Premium Support</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center z-10">
        <p className="text-xs text-white/30 tracking-widest uppercase font-light">
          © 2026 AutoInventory • Premium Dealership
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;