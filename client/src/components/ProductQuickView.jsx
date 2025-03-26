import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function ProductQuickView({ isOpen, onClose, product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedVariant?.name
    );
    onClose();
  };

  if (!product) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="font-serif text-3xl text-secondary"
                    >
                      {product.name}
                    </Dialog.Title>
                    <p className="mt-2 text-2xl text-primary">${product.price}</p>
                  </div>

                  <p className="text-gray-600">{product.description}</p>

                  {/* Variants */}
                  {product.variants && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-secondary">Options</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-2 rounded-md border transition-colors ${
                              selectedVariant?.id === variant.id
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'hover:border-primary hover:bg-primary/5'
                            }`}
                          >
                            {variant.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-secondary">Quantity</h4>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 rounded-md border hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <FaMinus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-lg">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-md border hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <FaPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  {product.details && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-secondary">Details</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {product.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <FaShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="py-3 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors"
                      onClick={onClose}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ProductQuickView;