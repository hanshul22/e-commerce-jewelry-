import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const handleApplyCoupon = async () => {
    setLoading(true);
    try {
      // Apply coupon logic here
      toast.success('Coupon applied successfully!');
    } catch (error) {
      toast.error('Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-serif text-secondary mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Discover our collection and add some pieces to your cart.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-serif text-secondary mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 bg-white rounded-lg shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-serif text-lg text-secondary">{item.name}</h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{item.variant}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      className="btn-secondary px-3 py-1"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      className="btn-secondary px-3 py-1"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold">${item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-6">
          <h2 className="text-2xl font-serif text-secondary">Order Summary</h2>

          {/* Coupon Code */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="input flex-1"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="btn-secondary"
              onClick={handleApplyCoupon}
              disabled={loading}
            >
              Apply
            </button>
          </div>

          {/* Calculations */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              to="/checkout"
              className="btn-primary w-full block text-center py-3"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="btn-secondary w-full block text-center py-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;