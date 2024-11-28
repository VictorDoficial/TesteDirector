import { useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase/messaging';
import { toast } from 'react-toastify';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Request notification permission
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: 'YOUR_VAPID_KEY'
        });
        
        // Here you would typically send the token and email to your backend
        console.log('FCM Token:', token);
        toast.success('Successfully subscribed to positive news!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to subscribe. Please try again.');
    }

    setLoading(false);
    setEmail('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Subscribe to Positive News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}

export default NewsletterForm;