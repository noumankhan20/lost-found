"use client"
import React, { useState, useEffect } from "react";
import { Search, Filter, MapPin, Calendar, Clock, ChevronDown, Plus, Eye } from "lucide-react";

const LostAndFoundPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("lost"); // "lost" or "found"

  // Simulate fetching data from an API
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        // Mock data
        const mockItems = [
          {
            id: 1,
            name: "Nouman ",
            category: "Personal Items",
            location: "Kurla",
            date: "2025-02-21",
            time: "14:30",
            description: "A man with  a button on his head",
            image: "/lost.jpg",
            status: "lost",
            reportedBy: "Alex Johnson"
          },
          {
            id: 2,
            name: "AirPods Pro",
            category: "Electronics",
            location: "Student Center Cafeteria",
            date: "2025-09-23",
            time: "12:15",
            description: "White AirPods Pro in charging case",
            image: "/air.jpg",
            status: "found",
            reportedBy: "Akshat Gupta"
          },
          {
            id: 3,
            name: "Blue Hydroflask",
            category: "Personal Items",
            location: "Gym, Locker Room",
            date: "2025-09-21",
            time: "18:45",
            description: "32oz navy blue water bottle with stickers",
            image: "",
            status: "lost",
            reportedBy: "James Wilson"
          },
          {
            id: 4,
            name: "Car Keys with Red Lanyard",
            category: "Keys",
            location: "Parking Lot B",
            date: "2025-09-24",
            time: "09:10",
            description: "Toyota car keys with university logo lanyard",
            image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a",
            status: "found",
            reportedBy: "Campus Security"
          },
          {
            id: 5,
            name: "Prescription Glasses",
            category: "Personal Items",
            location: "Science Building, Room 302",
            date: "2025-09-23",
            time: "15:20",
            description: "Black-framed glasses with case",
            image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371",
            status: "lost",
            reportedBy: "Emily Parker"
          },
          {
            id: 6,
            name: "MacBook Pro Laptop",
            category: "Electronics",
            location: "Central Library Study Room",
            date: "2025-09-22",
            time: "16:35",
            description: "13-inch Space Gray MacBook with stickers on cover",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            status: "lost",
            reportedBy: "Michael Zhang"
          },
          {
            id: 7,
            name: "Student ID Card",
            category: "IDs & Documents",
            location: "Campus Bus Stop",
            date: "2025-09-24",
            time: "08:45",
            description: "University ID for Sarah Thompson",
            image: "https://images.unsplash.com/photo-1608236415053-3691791bbffe",
            status: "found",
            reportedBy: "Bus Driver"
          },
          {
            id: 8,
            name: "Textbook - Organic Chemistry",
            category: "Books & Notes",
            location: "Chemistry Lab",
            date: "2025-09-21",
            time: "13:15",
            description: "7th edition with yellow highlights throughout",
            image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14",
            status: "found",
            reportedBy: "Lab Assistant"
          },
        ];

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(mockItems.map(item => item.category))];
        
        setItems(mockItems);
        setFilteredItems(mockItems);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filter items based on category, search query, and view mode
  useEffect(() => {
    let result = [...items];
    
    // Filter by view mode (lost/found)
    result = result.filter(item => item.status === viewMode);
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(result);
  }, [items, selectedCategory, searchQuery, viewMode]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Lost & <span className="text-red-600">Found</span></h1>
          <p className="text-gray-400">Help return lost items to their rightful owners</p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex mb-8 bg-gray-900 rounded-lg p-1 w-full max-w-xs">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === "lost" 
                ? "bg-red-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setViewMode("lost")}
          >
            Lost Items
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === "found" 
                ? "bg-red-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setViewMode("found")}
          >
            Found Items
          </button>
        </div>
        
        {/* Report Button (Mobile) */}
        <div className="mb-6 sm:hidden">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center">
            <Plus className="h-5 w-5 mr-2" />
            Report {viewMode === "lost" ? "Lost" : "Found"} Item
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
          
          {/* Report Button (Desktop) */}
          <button className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors items-center">
            <Plus className="h-5 w-5 mr-2" />
            Report {viewMode === "lost" ? "Lost" : "Found"} Item
          </button>
        </div>
        
        {/* Filters Button */}
        <div className="mb-6">
          <button
            onClick={toggleFilter}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
          </button>
          
          {/* Expandable Filters */}
          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800 animate-fadeIn">
              <h3 className="font-medium text-white mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${selectedCategory === category
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <h3 className="font-medium text-white mb-3 mt-4">Date Range</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">From</label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">To</label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results info */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredItems.length} {viewMode} {filteredItems.length === 1 ? "item" : "items"}
          </p>
        </div>
        
        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-red-600 transition-all"
              >
                {/* Item Image */}
                <div className="relative h-56 overflow-hidden bg-gray-800">
                  <img
                    src={`${item.image}?w=400&h=300&fit=crop`}
                    alt={item.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 left-3 ${
                    item.status === "lost" ? "bg-red-600" : "bg-green-600"
                  } text-white text-xs px-2 py-1 rounded-full uppercase font-bold`}>
                    {item.status}
                  </div>
                </div>
                
                {/* Item Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                      <h3 className="text-lg font-semibold mb-2 text-white hover:text-red-400 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                  
                  {/* Location and Time */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-300">{item.location}</p>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-300">{formatDate(item.date)}</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-300">{item.time}</p>
                    </div>
                  </div>
                  
                  {/* View Button */}
                  <button className="w-full bg-gray-800 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold mb-2 text-white">No {viewMode} items found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
            <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Report a {viewMode === "lost" ? "Lost" : "Found"} Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostAndFoundPage;