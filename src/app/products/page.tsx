
// pages/products/index.tsx
'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import Header from './Header';
import ProductGrid from './ProductGrid';
import AutoScrollBanner from './AutoScrollBanner';
import HeroBanner from './HeroBanner'
import { Product } from './type/product';

const ProductsPage: React.FC = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('best-selling');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Dummy data based on the images
 useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/products'); // Replace with your actual endpoint
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();

      // Assuming the response structure matches Product[]
      setProducts(data.products);
      setFilteredProducts(data.products);
      console.log("dta", data)
    } catch (error) {
      console.error('Error fetching products:', error);

      // Optional: fallback to dummy products if needed
      // setProducts(dummyProducts);
      // setFilteredProducts(dummyProducts);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

 
  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    
    const suggestions = products
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(product => product.name)
      .slice(0, 5);
    
    const categories = ['rings', 'earrings', 'necklace', 'bracelets', 'pendant']
      .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3);
    
    return [...new Set([...suggestions, ...categories])];
  }, [searchQuery, products]);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // best-selling
        // Keep original order for best-selling
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'rings', label: 'Rings' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'necklace', label: 'Necklaces' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'pendant', label: 'Pendants' }
  ];

  const sortOptions = [
    { value: 'best-selling', label: 'Best Selling' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'discount', label: 'Highest Discount' }
  ];

  const handleProductClick = (product: Product) => {
    // Navigate to product detail page
    window.location.href = `/products/${product.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
      setProducts={setProducts}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        suggestions={searchSuggestions}
      />
      
      <AutoScrollBanner />
      <HeroBanner />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-600">Discover our exquisite collection of diamond jewelry</p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 font-medium">
              {filteredProducts.length} Products
            </span>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <ProductGrid 
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
        )}
      </main>
    </div>
  );
};

export default ProductsPage;