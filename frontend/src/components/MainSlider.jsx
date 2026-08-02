import { useState, useEffect } from 'react';

const HeroSlider = () => {
  // 1. STATE: Store the movies from the DB here
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 2. EFFECT: Fetch data from your Backend on load
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:4000/api/media'); 
        const data = await response.json();
        
        
        // Randomize the order of the movies array
        const shuffledMovies = data.sort(() => 0.5 - Math.random());
        
        // Pick the first 5 from the NEW random order
        setFeaturedMovies(shuffledMovies.slice(0, 5)); 

        setLoading(false);
      } catch (error) {
        console.error("Error fetching hero movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 3. EFFECT: The 5-Second Timer
  useEffect(() => {
    // Only run the timer if we actually have movies to show
    if (featuredMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredMovies]); // Re-run if featuredMovies changes

  // 4. LOADING STATE: Don't crash if data isn't ready yet
  if (loading) {
    return <div className="w-full h-[400px] bg-gray-900 animate-pulse rounded-2xl mb-12"></div>;
  }

  // 5. SAFETY CHECK: If DB returned empty list
  if (featuredMovies.length === 0) {
    return null; 
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="relative w-auto h-[250px] rounded-2xl overflow-hidden shadow-2xl mb-12 group">
      
      {/* IMAGE (Using your DB field 'imageURL') */}
      <img 
        key={currentMovie._id} // Use MongoDB _id as unique key
        src={currentMovie.imageURL} // Make sure this matches your DB field name!
        alt={currentMovie.title} 
        className="absolute inset-0 w-full h-full object-cover animate-fade-in"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

      {/* TEXT CONTENT */}
      <div className="absolute bottom-0 left-0  flex flex-col justify-center px-12 z-10 max-w-2xl">
        <h1 key={currentMovie.title} className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-4 animate-slide-up">
          {currentMovie.title}
        </h1>

        
      </div>
      
      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {featuredMovies.map((_, index) => (
          <div 
            key={index} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-6" : "bg-gray-500"}`}
          ></div>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;