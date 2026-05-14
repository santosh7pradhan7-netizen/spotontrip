// app/about/page.js
// FIX: Removed unused 'Link' import.

// import Link from 'next/link'; // Removed Link

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="bg-white shadow-md sticky top-0 z-30">
                {/* ... Header content ... */}
            </header>

            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full flex-grow">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-indigo-600">Our Story</h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Our mission is simple: We&apos;re committed to making travel affordable and accessible for everyone. 
                    </p>
                </div>
                
                {/* ... rest of the content ... */}
            </main>

            <footer className="bg-gray-800 text-white py-12">
                {/* ... Footer content ... */}
            </footer>
        </div>
    );
}