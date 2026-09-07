import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-xl w-full border border-gray-100">
        <div className="w-16 h-16 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold">f</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the App</h1>
        <p className="text-gray-600 mb-8">
          This is the simulated logged-in dashboard. The landing page "Get Started" and "Open App" buttons redirect here per the assignment instructions.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-brand-purple font-medium hover:underline"
        >
          <ArrowLeft size={16} /> Back to Landing Page
        </Link>
      </div>
    </main>
  );
}
