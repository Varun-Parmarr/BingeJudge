import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import MainSlider from "./MainSlider";

export default function Videocard() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Logged-in user
  const [userId, setUserId] = useState(null);

  // Review modal state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Add media modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("movie");
  const [newDescription, setNewDescription] = useState("");
  const [newImageURL, setNewImageURL] = useState("");

  // Get logged-in user from localStorage (if any)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.UserId);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  // Fetch all media (public)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/media`);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching media:", err.response ? err.response.data : err.message);
      }
    };

    fetchItems();
  }, []);

  // Submit new media (only logged-in users)
  const handleAddMedia = async () => {
    if (!newTitle || !newDescription || !newImageURL) {
      alert("Please fill in all fields!");
      return;
    }
    
    const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in!"); // Safety check
    return;
  }

    try {
      await axios.post(`${API_URL}/api/media`, {
        title: newTitle,
        type: newType,
        content: newDescription,
        imageURL: newImageURL,
        user: userId,
      },{
      // This is the request CONFIG (where you add headers)
      headers: {
        'Authorization': `Bearer ${token}` // Send the token
      }
     } );

      alert("✅ Media added successfully!");
      setShowAddModal(false);
      setNewTitle("");
      setNewType("movie");
      setNewDescription("");
      setNewImageURL("");
      // Refresh media list
       const res = await axios.get(`${API_URL}/api/media`);
      setItems(res.data);
    } catch (error) {
      console.error("Error adding media:", error.response ? error.response.data : error.message);
      alert("❌ Failed to add media.");
    }
  };

  // Submit review (only logged-in users)
  const handleSubmitReview = async () => {
    if (!rating || !comment) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
    if (!token) {
    alert("You are not logged in!");
    setLoading(false);
    return;
  }

   // 1. Get the media ID from the item you clicked
      const mediaId = selectedItem._id;

      // 2. Create the URL that matches your backend

      await axios.post(`${API_URL}/review/${mediaId}`, {
        rating,
        comment
      },
    {
      headers: {
        'Authorization': `Bearer ${token}` // Send the token
      }
     } );

      setMessage("✅ Review submitted successfully!");
      setComment("");
      setRating(0);

      setTimeout(() => {
        setSelectedItem(null);
        setMessage("");
      }, 1500);
    } 
    catch (error) {
      console.error("Error submitting review:", error.response ? error.response.data : error.message);
      setMessage("❌ Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="p-6 bg-slate-800 min-h-screen ">
      
      <div className="ml-10 mr-10 mt-2"><MainSlider/></div>
      

       {/* Media Grid (visible to everyone) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ml-10 mr-10 gap-5">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="relative cursor-pointer rounded-xl overflow-hidden hover:scale-105 transform transition-transform duration-300 shadow-2xl"
          >
            <img
              src={item.imageURL}
              alt={item.title}
              className="w-full h-64 shadow-lg object-cover"
            />

            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
            <h3 className="font-extrabold text-xl tracking-wide drop-shadow-md truncate">{item.title}</h3>
           </div>
          </div>
        ))}
      </div>

      {/* Add Media Button (only for logged-in users) */}
      {userId && (
        <div className="m-6 text-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            + Add Movie / Series / Anime
          </button>
        </div>
      )}

  

      {/* Review Modal (only logged-in users can submit) */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-300 rounded-lg shadow-lg w-full max-w-md relative p-6 overflow-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedItem.imageURL}
              alt={selectedItem.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedItem.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{selectedItem.type}</p>
            <p className="text-gray-700 mb-4">{selectedItem.content}</p>

            {userId ? (
              <div className="border-t pt-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Add Your Review</h3>

                {/* Star Rating */}
                <div className="flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRating(num)}
                      className={`px-2 py-1 rounded ${
                        rating >= num ? "bg-yellow-400" : "bg-gray-200"
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>

                {/* Comment */}
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your review..."
                  rows="3"
                ></textarea>

                <button
                  onClick={handleSubmitReview}
                  disabled={loading}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>

                {message && (
                  <p className="text-center text-sm mt-3 text-gray-700">{message}</p>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-4">Login to add a review.</p>
            )}
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-6">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Add New Media</h2>

            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            >
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="anime">Anime</option>
            </select>

            <textarea
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border p-2 rounded mb-3"
              rows="3"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <button
              onClick={handleAddMedia}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Add Media
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
