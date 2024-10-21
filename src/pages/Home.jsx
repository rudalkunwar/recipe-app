import React from 'react';

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 text-white overflow-hidden">
        <div className="relative z-10 py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                Welcome to RecipeApp
              </h1>
              <p className="mt-4 text-lg leading-6 text-gray-300">
                Discover a world of delicious recipes at your fingertips. Find your next favorite dish now!
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="#explore"
                  className="inline-block px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100"
                >
                  Explore Recipes
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Food Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="explore" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose RecipeApp?
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">
              Explore our key features that make cooking fun and easy!
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/search.png"
                alt="Search"
                className="mx-auto h-12 w-12"
              />
              <h3 className="mt-5 text-lg font-medium text-gray-900">Search Recipes</h3>
              <p className="mt-2 text-gray-600">Easily search for recipes based on ingredients or meal types.</p>
            </div>

            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/star.png"
                alt="Favorites"
                className="mx-auto h-12 w-12"
              />
              <h3 className="mt-5 text-lg font-medium text-gray-900">Save Favorites</h3>
              <p className="mt-2 text-gray-600">Bookmark your favorite recipes for easy access anytime.</p>
            </div>

            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/food-bar.png"
                alt="Explore"
                className="mx-auto h-12 w-12"
              />
              <h3 className="mt-5 text-lg font-medium text-gray-900">Explore Cuisines</h3>
              <p className="mt-2 text-gray-600">Discover new cuisines and exciting dishes from around the world.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Start Your Cooking Adventure Now!</h2>
          <p className="mt-4 text-lg text-gray-300">
            Join RecipeApp today and explore a world of culinary wonders.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">© 2024 RecipeApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
