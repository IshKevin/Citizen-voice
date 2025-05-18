"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Login(){
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
    
      <header className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-yellow-400">CitizenVoice</span> Rwanda
          </h1>
        </div>
      </header>

      
      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border-blue-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-900">
              Welcome to CitizenVoice
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Log in or sign up to track your complaints and engage with public services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              className="w-full bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-2"
              size="lg"
            >
             <LoginLink>Sign in</LoginLink>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-500 flex items-center gap-2"
              size="lg"
            >
               <RegisterLink>Sign up</RegisterLink>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-center text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <a href="/privacy" className="text-blue-700 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </main>

      
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2025 CitizenVoice, Government of Rwanda. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="/about" className="hover:text-yellow-400 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
              Privacy
            </Link>
            <Link href="/help" className="hover:text-yellow-400 transition-colors">
              Help
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}