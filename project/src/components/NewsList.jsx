import { useState, useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/messaging';

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Listen for incoming FCM messages
    const unsubscribe = onMessage(messaging, (payload) => {
      const newItem = {
        id: Date.now(),
        title: payload.notification.title,
        body: payload.notification.body,
        timestamp: new Date().toLocaleString()
      };
      
      setNews(prev => [newItem, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Positive News</h2>
      {news.length === 0 ? (
        <p className="text-gray-500 text-center">No news yet. Subscribe to receive updates!</p>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.body}</p>
              <span className="text-sm text-gray-400 mt-2 block">{item.timestamp}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsList;