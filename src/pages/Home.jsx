import React from 'react';
import { Link } from 'react-router-dom';
import GoToTop from '../component/GoToTop';
import Footer from "../components/nav/Footer";


function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="h-screen relative bg-gray-800 text-white overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center items-center h-full py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              Welcome to RecipeApp
            </h1>
            <p className="mt-4 text-lg leading-6 text-gray-300">
              Discover a world of delicious recipes at your fingertips. Find your next favorite dish now!
            </p>
            <div className="mt-8 flex justify-center">
              <Link className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 transition duration-200" to="/recipe">Search Recipes</Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-home.jpeg"
            alt="Food Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </div>

      {/* Small Banner Section */}
      <div className="absolute z-10 bottom-0 w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4">
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


      <div className="relative text-black py-16 pt-0 flex flex-col lg:flex-row items-center lg:items-start my-20">
  <div className="w-full lg:w-auto flex-shrink-0 lg:ml-36">
    <img
      src="/images/cookingillu.png"
      alt="Food Background"
      className="w-full h-72 lg:h-96 object-cover"
    />
  </div>
  
  <div className="lg:absolute inset-0 flex flex-col items-center justify-center text-center px-4 lg:px-0 lg:ml-80 mt-10 lg:mt-0">
    <h2 className="text-2xl lg:text-3xl font-extrabold">
      Start Your Cooking Adventure Now!
    </h2>
    <p className="mt-4 text-4xl lg:text-6xl font-extrabold w-full lg:w-1/2">
      Join RecipeApp and Explore culinary wonders.
    </p>
    <div className="mt-4">
      <a
        href="#"
        className="inline-block px-6 py-2 lg:px-8 lg:py-3 text-yellow-400 rounded-md text-3xl lg:text-6xl font-extrabold hover:text-yellow-600 transition duration-200"
      >
        Explore
      </a>
    </div>
  </div>
</div>


            

      {/* Share Your Recipe Banner */}
<div className="py-8 flex flex-col lg:flex-row items-center lg:items-start">
  {/* Image for small screens */}
  <div className="lg:hidden ml-24 w-full flex-shrink-0">
    <img
      src="/images/shareRecipe.png"
      alt="Food Background"
      className="w-[300px] h-72 md:w-[400px] md:h-80 object-cover"
    />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 lg:mt-32">
    <h2 className="text-2xl md:text-3xl font-extrabold">Share Your Recipe!</h2>
    <p className="mt-2 text-base md:text-lg">
      Have a delicious recipe? Share it with our community and inspire others!
    </p>
   <Link to={"/submitRecipe"}> <div className="mt-4">
      <p
        href="#"
        className="inline-block px-4 py-2 hover:cursor-pointer md:px-6 md:py-2 border border-transparent text-xl md:text-2xl font-medium rounded-md bg-white text-green-600 hover:bg-gray-100 hover:text-lime-500 transition duration-200"
      >
        Submit Your Recipe
      </p>
    </div></Link>
  </div>

  {/* Image for large screens */}
  <div className="hidden lg:block ml-10 mr-36 w-full lg:w-auto flex-shrink-0">
    <img
      src="/images/shareRecipe.png"
      alt="Food Background"
      className="w-[500px] h-96 object-cover"
    />
  </div>
</div>



      

      {/* Footer Section */}
      <Footer/>
    </div>
  );
}

export default Home;
