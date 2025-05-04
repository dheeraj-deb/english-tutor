import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface HeroSectionProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const HeroSection = ({
  onLoginClick = () => {},
  onSignupClick = () => {},
}: HeroSectionProps) => {
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [showSignupForm, setShowSignupForm] = React.useState(false);
  const [activeForm, setActiveForm] = React.useState<"login" | "signup">(
    "login",
  );
  const [isDesktop, setIsDesktop] = React.useState(true);

  // Media query hook implementation
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLoginClick = () => {
    setActiveForm("login");
    setShowLoginForm(true);
    onLoginClick();
  };

  const handleSignupClick = () => {
    setActiveForm("signup");
    setShowSignupForm(true);
    onSignupClick();
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center min-h-[600px] text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Master English with Personalized AI Tutoring
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Improve your English skills with our AI-powered platform. Get
          personalized lessons, practice conversations, and prepare for exams
          with expert guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isDesktop ? (
            <>
              <Dialog open={showLoginForm} onOpenChange={setShowLoginForm}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoginClick}
                    className="text-lg px-8 py-6"
                  >
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  {/* Auth form will be implemented separately */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    <p className="text-gray-600">
                      Login form will be implemented here
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showSignupForm} onOpenChange={setShowSignupForm}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    onClick={handleSignupClick}
                    className="text-lg px-8 py-6"
                  >
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  {/* Auth form will be implemented separately */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                    <p className="text-gray-600">
                      Signup form will be implemented here
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Drawer
                open={showLoginForm || showSignupForm}
                onOpenChange={(open) => {
                  setShowLoginForm(open && activeForm === "login");
                  setShowSignupForm(open && activeForm === "signup");
                }}
              >
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoginClick}
                    className="text-lg px-8 py-6 w-full"
                  >
                    Login
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="px-4 py-6">
                    {/* Auth form will be implemented separately */}
                    <h2 className="text-2xl font-bold mb-4">
                      {activeForm === "login" ? "Login" : "Sign Up"}
                    </h2>
                    <p className="text-gray-600">
                      {activeForm === "login"
                        ? "Login form will be implemented here"
                        : "Signup form will be implemented here"}
                    </p>
                  </div>
                </DrawerContent>
              </Drawer>

              <Button
                size="lg"
                onClick={handleSignupClick}
                className="text-lg px-8 py-6 w-full"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80"
          alt="English learning illustration"
          className="rounded-lg shadow-xl w-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
