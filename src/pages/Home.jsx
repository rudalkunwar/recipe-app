import React from 'react';
import { Link } from 'react-router-dom';
import GoToTop from '../component/GoToTop';

function Home() {
  const features = [
    {
      imgSrc: "https://img.icons8.com/ios-filled/50/000000/search.png",
      title: "Search Recipes",
      description: "Easily search for recipes based on ingredients or meal types."
    },
    {
      imgSrc: "https://img.icons8.com/ios-filled/50/000000/star.png",
      title: "Save Favorites",
      description: "Bookmark your favorite recipes for easy access anytime."
    },
    {
      imgSrc: "https://img.icons8.com/ios-filled/50/000000/food-bar.png",
      title: "Explore Cuisines",
      description: "Discover new cuisines and exciting dishes from around the world."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/bg-home.jpeg"
            alt="Food Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white animate-fade-in">
              Welcome to RecipeApp
            </h1>
            <p className="mt-6 text-xl text-gray-200">
              Discover a world of delicious recipes at your fingertips.
            </p>
            <div className="mt-8">
              <Link
                to="/recipe"
                className="inline-block px-8 py-4 rounded-lg bg-white text-gray-900 text-lg font-medium hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
              >
                Explore Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose RecipeApp?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Explore our key features that make cooking fun and easy!
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
              >
                <img src={feature.imgSrc} alt="" className="w-12 h-12 mx-auto" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900 text-center">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Start Your Cooking Adventure Now!
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Join RecipeApp and explore culinary wonders from around the world.
              </p>
              <div className="mt-8">
                <Link
                  to="/recipe"
                  className="inline-block px-8 py-4 rounded-lg bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/images/cookingillu.png"
                alt="Cooking Illustration"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Share Recipe Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/shareRecipe.png"
                alt="Share Recipe"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Share Your Recipe!
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Have a delicious recipe? Share it with our community and inspire others!
              </p>
              <div className="mt-8">
                <Link
                  to="/share"
                  className="inline-block px-8 py-4 rounded-lg bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition-all duration-200"
                >
                  Submit Recipe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 RecipeApp. All rights reserved.</p>
        </div>
      </footer>
      
      <GoToTop />
    </div>
  );
}

export default Home;