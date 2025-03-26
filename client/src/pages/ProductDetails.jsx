import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaChevronRight } from 'react-icons/fa';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { products } from '../data/products';
import ProductModal from '../components/ProductModal';

function ProductDetails() {
  const { id } = useParams();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find product from local data instead of making an API call
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-serif text-secondary mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn-primary">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <FaChevronRight className="h-4 w-4 mx-2" />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <FaChevronRight className="h-4 w-4 mx-2" />
        <span className="text-secondary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <TransformWrapper>
            <TransformComponent>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full rounded-lg"
              />
            </TransformComponent>
          </TransformWrapper>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 2}`}
                className="w-full rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-serif text-secondary">{product.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl text-primary">${product.price.toLocaleString()}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-5 w-5 ${
                    i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Variants */}
          {product.variants && (
            <div className="space-y-4">
              <h3 className="font-semibold">Available Options</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`px-4 py-2 rounded-md border ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                    } transition-colors`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                className="px-3 py-1 rounded-md border border-gray-300 hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                className="px-3 py-1 rounded-md border border-gray-300 hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-4">
            <div>
              <h3 className="font-semibold">Product Details</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Shipping & Returns</h3>
              <p className="mt-2 text-sm text-gray-600">
                Free shipping on orders over $500. Easy returns within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
}

export default ProductDetails;