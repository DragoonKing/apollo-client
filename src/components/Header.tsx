"use client";

import { Search, Stethoscope, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/doctors/general-physician-internal-medicine" className="text-2xl font-bold text-blue-600 flex items-center hover:text-blue-700">
                <Stethoscope className="h-6 w-6 mr-2" />
                MedConsult
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/doctors/general-physician-internal-medicine"
                className="text-neutral-500 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Find Doctors
              </Link>
              <Link href="#" className="text-neutral-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Specialties
              </Link>
              <Link href="#" className="text-neutral-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Lab Tests
              </Link>
              <Link href="#" className="text-neutral-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Medicines
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/add-doctor">
              <Button variant="outline" className="hidden sm:flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </Link>
            <button className="text-neutral-500 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
