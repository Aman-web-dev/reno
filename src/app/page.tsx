import Link from "next/link";

export default function Home() {
  return (
    <>
     <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="float-animation inline-block mb-8">
                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-6">
                        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
                    Welcome to <span className="text-yellow-300">My Schools</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
                    Your comprehensive platform to discover, list, and manage educational institutions in your area
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href={'/showschool'} className="card-hover bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:bg-gray-50 flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        <span>View Schools</span>
                    </Link>
                    
                    <Link href={'/addschool'} className="card-hover bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:bg-yellow-300 flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>Add Your School</span>
                    </Link>
                </div>
            </div>
        </div>
    </section>

    <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose My Schools?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Everything you need to connect with educational institutions in one simple platform
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="card-hover bg-gray-50 p-8 rounded-2xl text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Discovery</h3>
                    <p className="text-gray-600">
                        Find schools in your area with detailed information including contact details, location, and more
                    </p>
                </div>
                
                <div className="card-hover bg-gray-50 p-8 rounded-2xl text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Listing</h3>
                    <p className="text-gray-600">
                        List your school or educational institution with just a few clicks and reach more families
                    </p>
                </div>
                
                <div className="card-hover bg-gray-50 p-8 rounded-2xl text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Direct Contact</h3>
                    <p className="text-gray-600">
                        Copy contact information instantly and connect directly with schools for admissions and inquiries
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
                Join thousands of parents, students, and educators using My Schools to connect with quality education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={'/showschool'} className="card-hover bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl">
                    Browse Schools Now
                </Link>
                <Link href={'/addschool'} className="card-hover border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                    List Your School
                </Link>
            </div>
        </div>
    </section>

    <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <span className="ml-3 text-xl font-bold">My Schools</span>
                    </div>
                    <p className="text-gray-400">
                        Connecting students, parents, and educators with quality educational institutions.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <div className="space-y-2">
                        <Link href=""  className="block text-gray-400 hover:text-white transition-colors">View Schools</Link>
                        <Link href="#"  className="block text-gray-400 hover:text-white transition-colors">Add School</Link>
                        <Link href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</Link>
                    </div>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <div className="space-y-2 text-gray-400">
                        <p>📧 support@myschools.com</p>
                        <p>📞 +1 (555) 123-4567</p>
                        <p>📍 123 Education St, Learning City</p>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 My Schools. All rights reserved.</p>
            </div>
        </div>
    </footer>
    </>
  );
}
