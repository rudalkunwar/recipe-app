import React from "react";
import { Link } from "react-router-dom";

function About() {
    return (
        <div className="bg-gray-50 pt-18 min-h-screen text-gray-800">
            {/* Container */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* About App Section */}
                <section className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">Welcome to Recipe App</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Recipe App is your go-to platform for discovering, sharing, and creating mouth-watering recipes.
                        Whether you’re a seasoned chef or just starting your culinary journey, we provide a variety of recipes
                        to inspire your next meal.
                    </p>
                </section>

                {/* Mission Section */}
                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Our mission is to bring food lovers together by providing an easy-to-use platform where everyone can
                        access delicious recipes, share their favorites, and learn new cooking techniques.
                    </p>
                </section>

                {/* Feature Highlights */}
                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose Us?</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Easy to Use</h4>
                            <p className="text-gray-700">
                                A simple and intuitive interface for browsing and sharing recipes effortlessly.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Vast Recipe Collection</h4>
                            <p className="text-gray-700">
                                Discover thousands of recipes for every taste and dietary preference.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h4 className="text-xl font-semibold text-green-600 mb-2">Community Driven</h4>
                            <p className="text-gray-700">
                                Share your own recipes and connect with food enthusiasts worldwide.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
                    <p className="text-lg mb-6 text-gray-700">
                        Start exploring recipes, sharing your favorites, and cooking like a pro today!
                    </p>
                    <Link to='/recipe' className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300">
                        Explore Recipes
                    </Link>
                </section>
            </div>
        </div>
    );
}

export default About;
