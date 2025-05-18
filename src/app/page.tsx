// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">CitizenVoice</h1>
          <nav>
            <Button asChild variant="ghost">
              <Link href="/auth/login">Login / Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Together, Let’s Build a Better Rwanda
          </h2>
          <p className="mt-4 max-w-2xl text-xl">
            Submit your complaints or feedback on public services and track progress with CitizenVoice.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Link href="/submit-complaint">Submit a Complaint</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/dashboard">Track Your Complaint</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-gray-900">How It Works</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>1. Submit</CardTitle>
            </CardHeader>
            <CardContent>
              Share your complaint or feedback anonymously or with an account.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Track</CardTitle>
            </CardHeader>
            <CardContent>
              Monitor the status of your complaint if you have an account.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. Resolve</CardTitle>
            </CardHeader>
            <CardContent>
              Receive updates and responses from government agencies.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p>&copy; 2025 CitizenVoice, Rwanda. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}