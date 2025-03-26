import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import ProductQuickView from './ProductQuickView';

function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className="group">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
          <button
            onClick={handleQuickView}
            className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          >
            <FaShoppingBag className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="font-serif text-lg text-secondary group-hover:text-primary">
            {product.name}
          </h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="font-semibold">${product.price}</p>
        </div>
      </Link>

      <ProductQuickView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}

export default ProductCard;