import React from 'react';

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 text-white overflow-hidden">
        <div className="relative z-10 py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                Welcome to RecipeApp
              </h1>
              <p className="mt-4 text-lg leading-6 text-gray-300">
                Discover a world of delicious recipes at your fingertips. Find your next favorite dish now!
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="#explore"
                  className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 transition duration-200"
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

      {/* Small Banner Section */}
<div className="bg-green-600 text-white py-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <p className="text-sm font-medium">
      Unlock a World of Flavor: Discover New Recipes Every Day!
      <a href="#" className="underline ml-2 hover:text-green-200">Explore Now</a>
    </p>
  </div>
</div>

      {/* Features Section */}
      <div id="explore" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose RecipeApp?</h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">
              Explore our key features that make cooking fun and easy!
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                imgSrc: "https://img.icons8.com/ios-filled/50/000000/search.png",
                title: "Search Recipes",
                description: "Easily search for recipes based on ingredients or meal types.",
              },
              {
                imgSrc: "https://img.icons8.com/ios-filled/50/000000/star.png",
                title: "Save Favorites",
                description: "Bookmark your favorite recipes for easy access anytime.",
              },
              {
                imgSrc: "https://img.icons8.com/ios-filled/50/000000/food-bar.png",
                title: "Explore Cuisines",
                description: "Discover new cuisines and exciting dishes from around the world.",
              },
            ].map(feature => (
              <div className="text-center p-6 bg-white shadow-lg rounded-lg transition transform hover:scale-105" key={feature.title}>
                <img src={feature.imgSrc} alt={feature.title} className="mx-auto h-12 w-12 mb-4" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Share Your Recipe Banner */}
<div className="bg-gradient-to-r from-blue-500 to-teal-500 py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
    <h2 className="text-3xl font-extrabold">Share Your Recipe!</h2>
    <p className="mt-2 text-lg"> 
      Have a delicious recipe? Share it with our community and inspire others!
    </p>
    <div className="mt-4"> 
      <a
        href="#"
        className="inline-block px-6 py-2 border border-transparent text-base font-medium rounded-md bg-white text-gray-800 hover:bg-gray-100 transition duration-200"
      >
        Submit Recipe
      </a>
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
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 transition duration-200"
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
