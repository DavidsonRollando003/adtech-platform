import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'AdTech Platform',
  description: 'Manage your advertising campaigns',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
