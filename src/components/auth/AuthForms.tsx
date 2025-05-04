"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Mail, Phone, User, Lock, ArrowRight, Check, LogIn, UserPlus } from "lucide-react";

interface AuthFormsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  type?: "login" | "signup";
  onSwitchType?: (type: "login" | "signup") => void;
}

const AuthForms = ({ 
  open = true, 
  onOpenChange,
  type,
  onSwitchType
}: AuthFormsProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(type || "login");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as "login" | "signup");
    setIsOtpSent(false);
    if (onSwitchType) {
      onSwitchType(value as "login" | "signup");
    }
  };

  const handleSendOtp = () => {
    // In a real implementation, this would send an OTP to the user's mobile or email
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // In a real implementation, this would verify the OTP
    console.log("OTP verified");
    // Reset form state
    setIsOtpSent(false);
    setOtp(["", "", "", ""]);
    setMobileOrEmail("");
    // Close the modal/drawer
    if (onOpenChange) onOpenChange(false);
  };

  const handleSignup = () => {
    // In a real implementation, this would send an OTP for signup verification
    setIsOtpSent(true);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input if current one is filled
      if (value !== "" && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const renderLoginForm = () => (
    <div className="space-y-6">
      {!isOtpSent ? (
        <>
          <div className="bg-gradient-to-b from-muted/30 to-background p-7 rounded-xl border border-border/60 shadow-sm">
            <div className="space-y-5">
              <div className="relative">
                <Label htmlFor="mobileOrEmail" className="text-sm font-medium mb-2 block">
                  Mobile Number or Email
                </Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="mobileOrEmail"
                    className="pl-10 h-12 bg-background focus:ring-2 ring-offset-2 ring-offset-background transition-all duration-200"
                    placeholder="Enter your mobile or email"
                    value={mobileOrEmail}
                    onChange={(e) => setMobileOrEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                className="w-full mt-4 h-12 text-base flex items-center justify-center gap-2 font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-1px]"
                onClick={handleSendOtp}
              >
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() => setActiveTab("signup")}
            >
              Sign up
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gradient-to-b from-muted/30 to-background p-7 rounded-xl border border-border/60 shadow-sm">
            <div className="space-y-5">
              <div className="mb-5 text-center">
                <div className="mb-3 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-1.5">Verification Code</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a code to <span className="font-medium">{mobileOrEmail}</span>
                </p>
              </div>
              
              <div className="flex justify-center gap-3 my-6">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    className="w-14 h-14 text-center text-lg font-medium p-0 focus:ring-2 ring-offset-2 ring-offset-background transition-all duration-200"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    inputMode="numeric"
                  />
                ))}
              </div>
              
              <Button 
                className="w-full h-12 text-base flex items-center justify-center gap-2 font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-1px]"
                onClick={handleVerifyOtp}
              >
                Verify & Log in <Check size={16} />
              </Button>
              
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setIsOtpSent(false)}
                >
                  Use a different method
                </button>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive code?{" "}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
            >
              Resend
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderSignupForm = () => (
    <div className="space-y-5">
      {!isOtpSent ? (
        <>
          <div className="bg-gradient-to-b from-muted/30 to-background p-5 rounded-xl border border-border/60 shadow-sm">
            <div className="grid gap-3">
              <div className="relative">
                <Label htmlFor="name" className="text-sm font-medium mb-1 block">
                  Full Name
                </Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <User size={16} />
                  </div>
                  <Input
                    id="name"
                    className="pl-10 h-10 bg-background focus:ring-2 ring-offset-2 ring-offset-background transition-all duration-200"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="relative">
                <Label htmlFor="email" className="text-sm font-medium mb-1 block">
                  Email
                </Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <Mail size={16} />
                  </div>
                  <Input
                    id="email"
                    className="pl-10 h-10 bg-background focus:ring-2 ring-offset-2 ring-offset-background transition-all duration-200"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="relative">
                <Label htmlFor="mobile" className="text-sm font-medium mb-1 block">
                  Mobile Number
                </Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <Phone size={16} />
                  </div>
                  <Input
                    id="mobile"
                    className="pl-10 h-10 bg-background focus:ring-2 ring-offset-2 ring-offset-background transition-all duration-200"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="relative">
                <Label htmlFor="language" className="text-sm font-medium mb-1 block">
                  Native Language
                </Label>
                <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
                  <SelectTrigger id="language" className="bg-background h-10 focus:ring-2 ring-offset-2 ring-offset-background transition-all duration-200">
                    <SelectValue placeholder="Select your native language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="russian">Russian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full mt-2 h-10 text-sm flex items-center justify-center gap-2 font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-1px]"
                onClick={handleSignup}
              >
                Create Account <ArrowRight size={16} />
              </Button>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() => setActiveTab("login")}
            >
              Log in
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gradient-to-b from-muted/30 to-background p-7 rounded-xl border border-border/60 shadow-sm">
            <div className="space-y-5">
              <div className="mb-5 text-center">
                <div className="mb-3 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-1.5">Verification Code</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a code to <span className="font-medium">{mobile}</span>
                </p>
              </div>
              
              <div className="flex justify-center gap-3 my-6">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-signup-${index}`}
                    className="w-14 h-14 text-center text-lg font-medium p-0 focus:ring-2 ring-offset-2 ring-offset-background transition-all duration-200"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    inputMode="numeric"
                  />
                ))}
              </div>
              
              <Button 
                className="w-full h-12 text-base flex items-center justify-center gap-2 font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-1px]"
                onClick={handleVerifyOtp}
              >
                Create Account <Check size={16} />
              </Button>
              
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setIsOtpSent(false)}
                >
                  Use a different method
                </button>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive code?{" "}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
            >
              Resend
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderAuthContent = () => (
    <>
      {isDesktop ? (
        // Desktop content
        <>
          <div className="p-7 pb-0">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                {activeTab === "login" ? "Welcome Back" : "Join Us"}
              </DialogTitle>
              <div className="text-center text-sm text-muted-foreground mt-2">
                {activeTab === "login" 
                  ? "Log in to continue your learning journey" 
                  : "Create an account to start learning English"}
              </div>
            </DialogHeader>
          </div>
          
          <div className="px-7 pb-7">
            <Tabs
              value={activeTab}
              onValueChange={(value) => handleTabChange(value)}
              className="w-full my-6"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 h-12 p-1.5 bg-muted/50">
                <TabsTrigger 
                  value="login" 
                  className="h-full flex items-center justify-center gap-2 data-[state=active]:shadow-md transition-all"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="h-full flex items-center justify-center gap-2 data-[state=active]:shadow-md transition-all"
                >
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="w-full">
                {activeTab === "login" ? renderLoginForm() : renderSignupForm()}
              </div>
            </Tabs>
          </div>
        </>
      ) : (
        // Mobile content - simplified to avoid scrolling issues
        <div className="px-5 pt-5 pb-0">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">
              {activeTab === "login" ? "Welcome Back" : "Join Us"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {activeTab === "login" 
                ? "Log in to continue your learning journey" 
                : "Create an account to start learning English"}
            </p>
          </div>
          
          <Tabs
            value={activeTab}
            onValueChange={(value) => handleTabChange(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-5 h-11 p-1 bg-muted/50">
              <TabsTrigger 
                value="login" 
                className="h-full flex items-center justify-center gap-2 data-[state=active]:shadow-md transition-all"
              >
                <LogIn size={16} />
                <span>Login</span>
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="h-full flex items-center justify-center gap-2 data-[state=active]:shadow-md transition-all"
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="w-full">
              {activeTab === "login" ? renderLoginForm() : renderSignupForm()}
            </div>
          </Tabs>
        </div>
      )}
    </>
  );

  // For integrated usage in landing page, we just return the content
  if (type !== undefined && onSwitchType !== undefined) {
    return renderAuthContent();
  }

  // For standalone usage (not in landing page)
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden bg-background border-border/60 shadow-lg">
          {renderAuthContent()}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile drawer with explicit style overrides
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent style={{ height: 'auto', maxHeight: '90vh' }} className="bg-background rounded-t-xl overflow-y-auto">
        {renderAuthContent()}
      </DrawerContent>
    </Drawer>
  );
};

export default AuthForms;
