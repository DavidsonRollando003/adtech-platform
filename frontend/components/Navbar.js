import Link from 'next/link';
import { LayoutDashboard, PlusCircle } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/campaigns" className="flex items-center gap-2 text-xl font-bold group">
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                                <LayoutDashboard size={24} className="text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:to-blue-600 transition-all duration-300">
                                Plateforme AdTech
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/campaigns/new"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <PlusCircle size={16} className="animate-bounce" />
                            Nouvelle Campagne
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
