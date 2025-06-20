'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

interface SearchResult {
  products: Product[];
  names: string[];
  categories: string[];
}

interface HeaderProps {
  onProductsChange?: (products: Product[]) => void;
  searchQuery?: string;
}

const Header: React.FC<HeaderProps> = ({ onProductsChange, searchQuery = '', setProducts }) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult>({
    products: [],
    names: [],
    categories: []
  });
  const [initialData, setInitialData] = useState<{
    names: string[];
    categories: string[];
  }>({
    names: [],
    categories: []
  });
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load initial categories and names when component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [namesRes, categoriesRes] = await Promise.all([
        fetch('/api/product-names'),
        fetch('/api/product-categories')
      ]);

      const [namesData, categoriesData] = await Promise.all([
        namesRes.json(),
        categoriesRes.json()
      ]);

      setInitialData({
        names: namesData.names || [],
        categories: categoriesData.categories || []
      });
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      // Clear products when search is empty
      onProductsChange?.([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/search-products?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      // Handle both possible response formats
      const products = data.results || data.products || data;
      onProductsChange?.(products);
      console.log("data : ",data)
      setProducts(data.results)
    } catch (error) {
      console.error('Error searching products:', error);
      onProductsChange?.([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = (query: string) => {
    if (!query.trim()) {
      setSuggestions({ products: [], names: [], categories: [] });
      return;
    }

    const queryLower = query.toLowerCase();
    
    // Filter from initial data based on user input
    const filteredNames = initialData.names.filter(name => 
      name.toLowerCase().includes(queryLower)
    ).slice(0, 5);
    
    const filteredCategories = initialData.categories.filter(category => 
      category.toLowerCase().includes(queryLower)
    ).slice(0, 3);

    setSuggestions({
      names: filteredNames,
      categories: filteredCategories,
      products: [] // We're not showing product suggestions, only names and categories
    });
  };

  // Update search input state when searchQuery prop changes
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1);
    
    if (value.trim()) {
      setShowSuggestions(true);
      fetchSuggestions(value);
    } else {
      setShowSuggestions(false);
      setSuggestions({ products: [], names: [], categories: [] });
    }
  };

  const handleSearch = (query: string) => {
    setInputValue(query);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    searchProducts(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allSuggestions = [
      ...suggestions.names,
      ...suggestions.categories
    ];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (allSuggestions.length + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev <= 0 ? allSuggestions.length : prev - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < allSuggestions.length) {
        handleSearch(allSuggestions[selectedIndex]);
      } else {
        handleSearch(inputValue);
      }
    } else if (e.key === 'Tab' && selectedIndex >= 0) {
      e.preventDefault();
      setInputValue(allSuggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const getTotalSuggestions = () => {
    return suggestions.names.length + suggestions.categories.length;
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-black text-center py-3">
        <div className="flex items-center justify-center space-x-8 overflow-hidden">
          <span className="whitespace-nowrap animate-pulse font-medium">
            ✨ 10% OFF ON DIAMONDS + 50% OFF ON MAKING CHARGES ✨
          </span>
          <span className="whitespace-nowrap animate-pulse font-medium">
            🚚 FREE SHIPPING ON ORDERS ABOVE ₹5000
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Geer.in
              </h1>
            </div>

            {/* Large Search Bar */}
            <div className="flex-1 max-w-3xl mx-8 relative">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for diamonds, rings, earrings, necklaces..."
                  value={inputValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (inputValue.trim()) {
                      setShowSuggestions(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full px-6 py-4 pl-14 pr-20 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all shadow-sm hover:shadow-md text-black"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-800" />
                
                {loading && (
                  <Loader2 className="absolute right-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-purple-500 animate-spin" />
                )}
                
                {!loading && inputValue && (
                  <button
                    onClick={() => handleSearch(inputValue)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-black px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Search
                  </button>
                )}
              </div>

              {/* Enhanced Search Suggestions Dropdown */}
              {showSuggestions && getTotalSuggestions() > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-2xl mt-2 max-h-96 overflow-y-auto z-10"
                >
                  {/* Product Names */}
                  {suggestions.names.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 text-sm font-semibold text-gray-600 border-b">
                        Suggested Products
                      </div>
                      {suggestions.names.map((name, index) => {
                        const globalIndex = index;
                        return (
                          <button
                            key={`name-${index}`}
                            onClick={() => handleSuggestionClick(name)}
                            className={`w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors border-b border-gray-100 ${
                              selectedIndex === globalIndex ? 'bg-purple-50 border-purple-200' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Search className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-800">{name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Categories */}
                  {suggestions.categories.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 text-sm font-semibold text-gray-600 border-b">
                        Categories
                      </div>
                      {suggestions.categories.map((category, index) => {
                        const globalIndex = suggestions.names.length + index;
                        return (
                          <button
                            key={`category-${index}`}
                            onClick={() => handleSuggestionClick(category)}
                            className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                              index === suggestions.categories.length - 1 ? '' : 'border-b border-gray-100'
                            } ${selectedIndex === globalIndex ? 'bg-blue-50 border-blue-200' : ''}`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                              <span className="text-gray-800 font-medium">{category}</span>
                              <span className="text-xs text-gray-500 ml-auto">Category</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Search Tips */}
                  <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t">
                    Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">Tab</kbd> to autocomplete, 
                    <kbd className="px-1 py-0.5 bg-gray-200 rounded ml-1">↑↓</kbd> to navigate, 
                    <kbd className="px-1 py-0.5 bg-gray-200 rounded ml-1">Enter</kbd> to search
                  </div>
                </div>
              )}
            </div>

            {/* Minimal Right Section */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;