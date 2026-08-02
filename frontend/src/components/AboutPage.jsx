
import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Welcome to <span className="text-blue-600">BingeJudge</span>
        </h1>
        <p className="text-lg text-white">
          The ultimate community-driven platform for Movie, Series, and Anime enthusiasts.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-200 p-8 rounded-2xl shadow-xl">
        
        {/* Section 1: Our Mission */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            🎥 Discover & Decide
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Tired of scrolling endlessly through streaming services? At BingeJudge, 
            we bring the best entertainment into one place. Anyone can browse our 
            collection to find their next obsession, but the real magic happens 
            when you join the community.
          </p>
        </div>

        {/* Section 2: For Contributors */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            🚀 Build the Library
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Found a hidden gem that isn't listed? <span className="font-semibold text-blue-600">Signed-up users</span> have the power to 
            expand our database. Add your favorite Movies, Series, or Anime by simply 
            entering a title, an image URL, and a description. Use the description 
            not just for the plot, but to tell the world <em>how it made you feel</em>.
          </p>
        </div>

        {/* Section 3: For Reviewers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            ⭐ Judge & Review
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your opinion matters. Logged-in users can rate content and leave detailed reviews. 
            Whether it was a cinematic masterpiece or a total flop, share your honest 
            thoughts to help others decide if it's worth the watch.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col justify-center items-center space-y-4 bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800">Ready to join?</h3>
          <p className="text-center text-gray-600 text-sm">
            Sign up today to start adding movies and writing reviews!
          </p>
          <div className="flex gap-4">
            <Link 
              to="/signin" 
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-2 bg-white text-blue-600 border border-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}