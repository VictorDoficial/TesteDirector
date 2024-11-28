import { ToastContainer } from 'react-toastify';
import NewsletterForm from './components/NewsletterForm';
import NewsList from './components/NewsList';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Positive Newsletter
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <NewsletterForm />
          <NewsList />
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;