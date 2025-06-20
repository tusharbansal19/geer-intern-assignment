import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from './type/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium">
            {product.discount}% OFF
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {product.savings && (
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mb-3">
            SAVE ₹{product.savings.toLocaleString()}
          </div>
        )}
        
        {product.variants && (
          <div className="flex space-x-2">
            {product.variants.map((variant, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: variant.colorCode }}
                title={variant.color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
