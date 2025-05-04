import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import AuthForms from "@/components/auth/AuthForms";

export default function LandingPage() {
  const [isDesktop, setIsDesktop] = React.useState(true);
  const [authType, setAuthType] = React.useState<"login" | "signup">("login");
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);

  // Check if the device is desktop or mobile
  React.useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  const handleAuthOpen = (type: "login" | "signup") => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">EnglishTutor</h1>
        </div>
        <div className="flex gap-4">
          {isDesktop ? (
            <>
              <Dialog
                open={isAuthOpen && isDesktop}
                onOpenChange={setIsAuthOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => handleAuthOpen("login")}
                  >
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthForms type={authType} onSwitchType={setAuthType} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={isAuthOpen && isDesktop && authType === "signup"}
                onOpenChange={setIsAuthOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => handleAuthOpen("signup")}>
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthForms type={authType} onSwitchType={setAuthType} />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Drawer
                open={isAuthOpen && !isDesktop}
                onOpenChange={setIsAuthOpen}
              >
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => handleAuthOpen("login")}
                  >
                    Login
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="px-4 py-6">
                    <AuthForms type={authType} onSwitchType={setAuthType} />
                  </div>
                </DrawerContent>
              </Drawer>

              <Drawer
                open={isAuthOpen && !isDesktop && authType === "signup"}
                onOpenChange={setIsAuthOpen}
              >
                <DrawerTrigger asChild>
                  <Button onClick={() => handleAuthOpen("signup")}>
                    Sign Up
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="px-4 py-6">
                    <AuthForms type={authType} onSwitchType={setAuthType} />
                  </div>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection
          onLoginClick={() => handleAuthOpen("login")}
          onSignupClick={() => handleAuthOpen("signup")}
        />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Testimonials Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Students Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "IELTS Student",
                  content:
                    "The AI-powered tutoring helped me improve my speaking score from 6.5 to 8.0 in just two months!",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                },
                {
                  name: "Miguel Rodriguez",
                  role: "Business English",
                  content:
                    "Daily tasks are personalized to my needs. The voice chat feature has significantly improved my pronunciation.",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=miguel",
                },
                {
                  name: "Yuki Tanaka",
                  role: "TOEFL Student",
                  content:
                    "The platform understood my specific challenges as a Japanese speaker and tailored exercises accordingly.",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=yuki",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Improve Your English?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their language
              skills with our AI-powered platform.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleAuthOpen("signup")}
              className="text-primary font-bold"
            >
              Get Started For Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">EnglishTutor</h3>
              <p className="text-sm text-muted-foreground">
                Transforming language learning with AI-powered tutoring.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} EnglishTutor. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
