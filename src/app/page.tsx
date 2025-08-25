"use client";

import React, { useEffect } from "react";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Home = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/projects");
    }
  }, [isSignedIn, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6">TaskHive</h1>
        <p className="text-lg text-gray-700 mb-8">
          Collaborate, organize, and track tasks effortlessly with TaskHive.
          Manage your projects, assign tasks, and stay on top of deadlines - all
          in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <SignUpButton mode="modal">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
      <div className="mt-16 text-grat-400 text-sm">
        &copy; {new Date().getFullYear()} TaskHive. All rights reserved.
      </div>
    </main>
  );
};

export default Home;
