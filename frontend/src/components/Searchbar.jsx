  
import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
   
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

   
    const timeoutId = setTimeout(() => {
      fetchMedia(query);
    }, 500);

    
    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchMedia = async (searchTitle) => {
    setLoading(true);
    setError(null);

    try {
       
      const API_URL = import.meta.env.VITE_API_URL;

     const response = await fetch(`${API_URL}/api/media/search?title=${encodeURIComponent(searchTitle)}`);

      
      if (response.status === 404) {
        setResults([]); 
        return; 
      }

      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.msg || 'Server Error');
      }

     
      const data = await response.json();
      setResults(data);

    } catch (err) {
      console.error("Search failed:", err);
      setError(err.message || "Failed to connect to server");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl ">
      

      <div className="relative">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full rounded-lg py-2 pl-10 pr-4 focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

   
      <div className="mt-4">
        {loading && (
          <div className="flex items-center text-gray-500 text-sm justify-center py-4">
            <Loader2 className="animate-spin mr-2 w-4 h-4" />
            Searching database...
          </div>
        )}

        {error && (
          <div className="flex items-center text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle className="mr-2 w-4 h-4" />
            {error}
          </div>
        )}
      </div>


      {!loading && !error && results.length > 0 && (
        <ul className="mt-2 divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          {results.map((item) => (
            <li 
              key={item._id} 
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between group"
              onClick={() => console.log(`Selected ID: ${item._id}`)}
            >
              <span className="text-gray-700 font-medium group-hover:text-blue-600">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      )}

     
      {!loading && !error && query && results.length === 0 && (
        <div className="text-center py-6 text-gray-400 text-sm">
          No media found matching "{query}"
        </div>
      )}
    </div>
  );
}