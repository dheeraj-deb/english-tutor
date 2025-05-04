"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import AuthForms from "@/components/auth/AuthForms";
import { CheckCircle2, User, BookOpen, Medal, Lightbulb, ArrowRight, Zap, Mic, MessageCircle, BarChart } from "lucide-react";
import Image from "next/image";

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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">EnglishTutor</h1>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-purple-500 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-teal-500 transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-purple-500 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-teal-500 transition-colors">Testimonials</a>
          </nav>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => handleAuthOpen("login")}
              className="font-medium border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
            >
              Login
            </Button>
            <Button 
              onClick={() => handleAuthOpen("signup")}
              className="font-medium bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Auth Form Modal/Drawer */}
      {isDesktop ? (
        <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
          <DialogContent className="p-0 border-none">
            <AuthForms 
              open={isAuthOpen} 
              onOpenChange={setIsAuthOpen} 
              type={authType} 
              onSwitchType={setAuthType} 
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isAuthOpen} onOpenChange={setIsAuthOpen}>
          <DrawerContent className="max-h-[85vh] overflow-auto">
            <div className="pb-8">
              <AuthForms 
                open={isAuthOpen} 
                onOpenChange={setIsAuthOpen}
                type={authType}
                onSwitchType={setAuthType}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      <main>
        {/* Hero Section - Improved with gradient background and better layout */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-teal-900/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500 dark:from-purple-400 dark:to-teal-300">
                  Learn English with AI in your native language
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Our AI-powered platform provides personalized English lessons with support in 40+ native languages, making learning seamless and intuitive.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => handleAuthOpen("signup")}
                    className="px-8 font-medium text-base bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white"
                  >
                    Start Learning
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 font-medium text-base border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
                  >
                    Language Options
                  </Button>
                </div>
              </div>
              <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 p-3">
                <div className="bg-gradient-to-br from-purple-100 to-teal-100 dark:from-purple-900/30 dark:to-teal-900/20 rounded-xl p-6 aspect-video flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <User className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">AI Tutor</p>
                      <p className="text-muted-foreground">Learn in your native language</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements to enhance the hero visual */}
                <div className="absolute top-10 right-10 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium">40+ Languages</span>
                  </div>
                </div>
                
                <div className="absolute bottom-10 left-10 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                      <Mic className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span className="text-sm font-medium">Native Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tutoring Features */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">AI-powered learning tailored to your native language</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform uses advanced AI to provide personalized English instruction with support in your mother tongue.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Mic className="h-6 w-6 text-teal-500" />,
                  title: "Native Translation",
                  description: "Instructions and explanations translated into 40+ languages for better understanding"
                },
                {
                  icon: <MessageCircle className="h-6 w-6 text-purple-500" />,
                  title: "AI Conversation",
                  description: "Practice English with our AI tutor that understands your native language patterns"
                },
                {
                  icon: <BookOpen className="h-6 w-6 text-teal-500" />,
                  title: "Cultural Context",
                  description: "Learn English expressions with cultural context explained in your language"
                },
                {
                  icon: <BarChart className="h-6 w-6 text-purple-500" />,
                  title: "Accent Analysis",
                  description: "Receive pronunciation feedback specific to your native language accent"
                },
              ].map((feature, index) => (
                <div key={index} className="bg-background p-6 rounded-xl shadow-sm border border-border/60 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-teal-100 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The journey to English fluency in your native language</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI platform makes learning English intuitive with support in your mother tongue
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                number: "01",
                title: "Select your native language",
                description: "Choose from 40+ supported languages for interface and instruction translation."
              },
              {
                number: "02",
                title: "Take an AI-powered assessment",
                description: "Our AI evaluates your current English level with instructions in your language."
              },
              {
                number: "03",
                title: "Get personalized learning path",
                description: "Receive a custom curriculum that addresses common challenges for speakers of your language."
              },
              {
                number: "04",
                title: "Practice with bilingual AI tutor",
                description: "Engage in conversations with our AI that can explain concepts in your native language."
              },
              {
                number: "05",
                title: "Track progress with multilingual feedback",
                description: "Receive detailed feedback in both English and your native language."
              },
            ].map((step, index) => (
                <div key={index} className="flex gap-6 mb-8">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 text-white flex items-center justify-center font-semibold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-br from-purple-50/50 via-fuchsia-50/50 to-teal-50/50 dark:from-gray-900 dark:via-purple-900/10 dark:to-teal-900/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Learning Plans in Your Language</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan with interface and support in your native language
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-background rounded-xl border border-border/60 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Basic</h3>
                  <p className="text-muted-foreground mb-4">Essential language support</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "Interface in your native language",
                      "Basic AI conversation practice",
                      "10 AI-powered lessons per month",
                      "Native language pronunciation tips",
                      "Email support in your language"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" className="w-full border-purple-500 text-purple-500 hover:bg-purple-50" onClick={() => handleAuthOpen("signup")}>
                    Get Started
                  </Button>
                </div>
              </div>
              
              {/* Premium Plan */}
              <div className="bg-background rounded-xl border-2 border-gradient-to-r from-purple-500 to-teal-500 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-teal-500"></div>
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-teal-500 text-white text-xs py-1 px-3 rounded-bl-lg">
                  Most Popular
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Premium</h3>
                  <p className="text-muted-foreground mb-4">Advanced native support</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">$19.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "All Basic features",
                      "Unlimited AI conversation with bilingual support",
                      "Advanced accent correction for your language",
                      "Cultural context explanations",
                      "Personalized grammar focus based on your language",
                      "Priority support in your native language"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600" onClick={() => handleAuthOpen("signup")}>
                    Get Started
                  </Button>
                </div>
              </div>
              
              {/* Business Plan */}
              <div className="bg-background rounded-xl border border-border/60 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Business</h3>
                  <p className="text-muted-foreground mb-4">Complete language immersion</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">$49.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "All Premium features",
                      "Business terminology in your language",
                      "Industry-specific vocabulary with translations",
                      "Cultural business etiquette training",
                      "Presentation & meeting skills with native feedback",
                      "24/7 dedicated support in your language",
                      "Team learning with shared native language"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" className="w-full border-purple-500 text-purple-500 hover:bg-purple-50" onClick={() => handleAuthOpen("signup")}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-purple-100 to-teal-100 dark:from-purple-900/30 dark:to-teal-900/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10"></div>
              <div className="relative flex items-center justify-center min-h-[300px]">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-100 to-teal-100 dark:from-purple-900/50 dark:to-teal-900/50 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">Bilingual Experts</p>
                    <p className="text-muted-foreground">Join our platform</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Are you bilingual and passionate about teaching?</h2>
              <p className="text-muted-foreground mb-8">
                Join our platform as a language expert to help students learn English through their native language. We're looking for bilingual speakers to enhance our AI language support system.
              </p>
              <Button variant="outline" className="px-6 font-medium border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900/50 dark:to-teal-900/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Students Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Hiroshi Tanaka",
                  role: "Japanese speaker",
                  content:
                    "Being able to get explanations in Japanese made English grammar concepts so much clearer. The AI understands my specific challenges!",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=hiroshi",
                },
                {
                  name: "Maria Rodriguez",
                  role: "Spanish speaker",
                  content:
                    "The cultural context translations helped me understand idioms that never made sense before. Now I can use them confidently in conversations.",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
                },
                {
                  name: "Ahmed Hassan",
                  role: "Arabic speaker",
                  content:
                    "The pronunciation guidance specifically for Arabic speakers dramatically improved my accent. The AI knew exactly what sounds I struggled with.",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-border/60 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-gradient-to-r from-purple-400 to-teal-400">
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
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-gradient bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">LinguaAI</h3>
              <p className="text-sm text-muted-foreground">
                Making English accessible through AI-powered native language support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-purple-500"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-purple-500"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-purple-500"
                  >
                    Supported Languages
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
                    className="text-muted-foreground hover:text-teal-500"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-teal-500"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-teal-500"
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
                    className="text-muted-foreground hover:text-purple-500"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-purple-500"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-teal-500"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} LinguaAI. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
