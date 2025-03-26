import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaHeart,
  FaBell,
  FaShieldAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'profile', name: 'Profile', icon: FaUser },
  { id: 'orders', name: 'Orders', icon: FaShoppingBag },
  { id: 'addresses', name: 'Addresses', icon: FaMapMarkerAlt },
  { id: 'payment', name: 'Payment Methods', icon: FaCreditCard },
  { id: 'wishlist', name: 'Wishlist', icon: FaHeart },
  { id: 'notifications', name: 'Notifications', icon: FaBell },
  { id: 'security', name: 'Security', icon: FaShieldAlt },
];

function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const handleLogout = () => {
    // Implement logout logic here
    toast.success('Logged out successfully');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Implement profile update logic here
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md text-left ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
            <button
              className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-left text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-secondary">Personal Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="input mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="input mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="input mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="input mt-1"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary px-6 py-2">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-secondary">Order History</h2>
                <div className="space-y-4">
                  {/* Sample order - replace with actual orders */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Order #12345</p>
                        <p className="text-sm text-gray-500">Placed on March 15, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Delivered
                      </span>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <img
                        src="/sample-product.jpg"
                        alt="Product"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">Diamond Pendant</h3>
                        <p className="text-sm text-gray-500">18K Gold</p>
                        <p className="font-medium">$1,299.00</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="btn-secondary px-4 py-2 text-sm">
                        Track Order
                      </button>
                      <button className="btn-secondary px-4 py-2 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif text-secondary">Saved Addresses</h2>
                  <button className="btn-primary px-4 py-2">Add New Address</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sample address - replace with actual addresses */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Home</h3>
                      <span className="text-sm text-primary">Default</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      123 Main Street<br />
                      Apt 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="text-sm text-primary hover:underline">Edit</button>
                      <button className="text-sm text-red-600 hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif text-secondary">Payment Methods</h2>
                  <button className="btn-primary px-4 py-2">Add New Card</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sample payment method - replace with actual payment methods */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">•••• •••• •••• 4242</h3>
                      <span className="text-sm text-primary">Default</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Expires 12/25</p>
                    <div className="mt-4 flex gap-2">
                      <button className="text-sm text-primary hover:underline">Edit</button>
                      <button className="text-sm text-red-600 hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-secondary">Wishlist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample wishlist item - replace with actual items */}
                  <div className="border rounded-lg p-4">
                    <img
                      src="/sample-product.jpg"
                      alt="Product"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h3 className="font-medium mt-2">Diamond Ring</h3>
                    <p className="text-sm text-gray-500">18K Gold</p>
                    <p className="font-medium">$2,499.00</p>
                    <button className="btn-primary w-full mt-2 py-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-secondary">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-sm text-gray-500">
                        Receive notifications about your order status
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions</h3>
                      <p className="text-sm text-gray-500">
                        Receive notifications about sales and special offers
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-secondary">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Change Password</h3>
                    <form className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input type="password" className="input mt-1" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input type="password" className="input mt-1" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input type="password" className="input mt-1" />
                      </div>
                      <button type="submit" className="btn-primary px-6 py-2">
                        Update Password
                      </button>
                    </form>
                  </div>
                  <div className="pt-6 border-t">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Add an extra layer of security to your account
                    </p>
                    <button className="btn-secondary px-6 py-2 mt-4">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;