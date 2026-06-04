import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      title: "Smart Recipe Search",
      description:
        "Find meal ideas fast by typing dish names and exploring curated recipe cards.",
      icon: "🔎",
    },
    {
      title: "Clear Step-by-Step Details",
      description:
        "Open any recipe to see ingredients and instructions in an easy-to-follow format.",
      icon: "📋",
    },
    {
      title: "Share Your Own Dishes",
      description:
        "Submit your favorite recipes and inspire the RecipeApp cooking community.",
      icon: "🍲",
    },
  ];

  return (
    <div className="bg-slate-50">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/bg-home.jpeg"
            alt="Fresh ingredients on a kitchen table"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/40 to-slate-900/35" />
        </div>

        <div className="content-container relative z-10 py-16">
          <div className="max-w-3xl text-white">
            <p className="uppercase tracking-[0.18em] text-xs sm:text-sm text-blue-200 font-semibold">
              Cook Better Every Day
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Discover recipes you can actually cook tonight.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl">
              Search meals, open detailed instructions, and explore ingredients with a
              cleaner recipe experience on every device.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/recipe" className="btn-primary">
                Explore Recipes
              </Link>
              <Link to="/submitRecipe" className="btn-secondary">
                Submit Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="content-container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="section-title">Why home cooks use RecipeApp</h2>
            <p className="section-subtitle">
              Built for fast browsing, readable instructions, and smooth mobile cooking.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="card-surface p-6 sm:p-7 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-2xl flex items-center justify-center">
                  <span role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="section-title">Plan meals with confidence</h2>
              <p className="section-subtitle">
                Browse recipe collections, compare dishes, and pick your next meal with
                better visual structure and faster navigation.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/recipe" className="btn-primary">
                  Get Started
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
            <div>
              <img
                src="/images/cookingillu.png"
                alt="Cooking illustration"
                className="w-full h-auto rounded-2xl shadow-md border border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
