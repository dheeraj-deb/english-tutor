"use client";

import React, { useState } from "react";
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

interface AuthFormsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AuthForms = ({ open = true, onOpenChange }: AuthFormsProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSendOtp = () => {
    // In a real implementation, this would send an OTP to the user's mobile or email
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // In a real implementation, this would verify the OTP
    console.log("OTP verified");
    // Reset form state
    setIsOtpSent(false);
    setOtp("");
    setMobileOrEmail("");
    // Close the modal/drawer
    if (onOpenChange) onOpenChange(false);
  };

  const handleSignup = () => {
    // In a real implementation, this would send an OTP for signup verification
    setIsOtpSent(true);
  };

  const renderLoginForm = () => (
    <div className="space-y-4">
      {!isOtpSent ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="mobileOrEmail">Mobile Number or Email</Label>
            <Input
              id="mobileOrEmail"
              placeholder="Enter your mobile or email"
              value={mobileOrEmail}
              onChange={(e) => setMobileOrEmail(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSendOtp}>
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              placeholder="Enter the OTP sent to you"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="text-sm text-center mb-4">
            OTP sent to {mobileOrEmail}.
            <button
              className="text-primary hover:underline ml-1"
              onClick={() => setIsOtpSent(false)}
            >
              Change
            </button>
          </div>
          <Button className="w-full" onClick={handleVerifyOtp}>
            Verify & Login
          </Button>
        </>
      )}
    </div>
  );

  const renderSignupForm = () => (
    <div className="space-y-4">
      {!isOtpSent ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Native Language</Label>
            <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
              <SelectTrigger id="language">
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
          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              placeholder="Enter the OTP sent to you"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="text-sm text-center mb-4">
            OTP sent to {mobile}.
            <button
              className="text-primary hover:underline ml-1"
              onClick={() => setIsOtpSent(false)}
            >
              Change
            </button>
          </div>
          <Button className="w-full" onClick={handleVerifyOtp}>
            Verify & Create Account
          </Button>
        </>
      )}
    </div>
  );

  const renderAuthTabs = () => (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(value) => {
        setActiveTab(value as "login" | "signup");
        setIsOtpSent(false);
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">{renderLoginForm()}</TabsContent>
      <TabsContent value="signup">{renderSignupForm()}</TabsContent>
    </Tabs>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[450px] bg-background">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </DialogTitle>
          </DialogHeader>
          {renderAuthTabs()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8">{renderAuthTabs()}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default AuthForms;
