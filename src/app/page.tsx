"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ShieldCheck, Search, FileCheck2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-yellow-400">CitizenVoice</span> Rwanda
          </h1>
          <nav className="flex gap-4">
            <Button asChild variant="ghost" className="text-white hover:text-yellow-400 hover:bg-blue-800 transition-colors">
              <Link href="/submit-complaint">Submit Complaint</Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:text-yellow-400 hover:bg-blue-800 transition-colors">
              <Link href="/auth/login">Login / Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section
        className="relative bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: "url('/Kigali.jpg')", 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8 text-center">
          <motion.h2
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Empowering Rwanda, One Voice at a Time
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl max-w-3xl mx-auto mb-10"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Share your feedback on public services and help build a stronger, more transparent Rwanda with CitizenVoice.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 font-semibold group"
            >
              <Link href="/submit-complaint" className="flex items-center gap-2">
                Submit a Complaint
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
            >
              <Link href="/dashboard">Track Your Complaint</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.h3
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          How CitizenVoice Works
        </motion.h3>
        <div className="grid sm:grid-cols-3 gap-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-blue-50 flex justify-center">
                <ShieldCheck className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle className="text-xl font-semibold text-blue-700">Submit</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Easily report issues like road repairs or water supply, anonymously or with an account.
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-yellow-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-yellow-50 flex justify-center">
                <Search className="w-10 h-10 text-yellow-600 mb-2" />
                <CardTitle className="text-xl font-semibold text-yellow-700">Track</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Monitor the status of your complaint with real-time updates (account required).
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-green-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-green-50 flex justify-center">
                <FileCheck2 className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle className="text-xl font-semibold text-green-700">Resolve</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Get responses and solutions from government agencies efficiently.
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="bg-blue-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold mb-6"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Ready to Make Your Voice Heard?
          </motion.h3>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 font-semibold"
            >
              <Link href="/submit-complaint">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      
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