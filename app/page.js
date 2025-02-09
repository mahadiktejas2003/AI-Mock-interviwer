"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/logos.svg"
            alt="AI Mock Interview Logo"
            width={48}
            height={48}
            className="hover:rotate-[12deg] transition-transform duration-300"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            InterviewAI
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-gray-300 hover:bg-white/10">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-24 pb-16 text-center"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 leading-tight">
            Ace Your Next Interview with<br />
            <span className="block">InterviewAI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Practice with mock interviews, get instant feedback, and track your progress with our intelligent system.
          </p>
          <div className="flex justify-center gap-6 mb-24">
            <Button
              onClick={handleDashboardClick}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-gray-300 border-gray-300 hover:bg-gray-800 px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Watch Demo
            </Button>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full max-w-4xl mx-auto aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            <Image
              src="/demo_screen.jpg"
              alt="Platform Preview"
              fill
              className="object-cover object-top"
            />
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 py-24">
          {[
            { title: "Real-time Feedback", description: "Get instant analysis on your performance." },
            { title: "Industry Specific", description: "Tailored questions for your field." },
            { title: "Progress Tracking", description: "Monitor your growth over time." },
          ].map(({ title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-colors shadow-md hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l7 7-7 7-7-7 7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-white/10 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} InterviewAI. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}