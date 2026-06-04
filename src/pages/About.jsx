import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            About Recipe App
          </p>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Cook confidently, discover constantly.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            Recipe App helps home cooks find inspiration fast. Explore curated dishes, dive into
            detailed instructions, and discover meals that fit your taste, time, and comfort level.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Simple Discovery",
              description: "Browse recipes quickly with a clean, distraction-free experience.",
            },
            {
              title: "Reliable Guidance",
              description: "Get clear recipe details so every step in the kitchen feels easier.",
            },
            {
              title: "Built for Everyday Cooking",
              description: "From quick weeknight meals to weekend experiments, find what fits.",
            },
          ].map(({ title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold text-blue-300">{title}</h2>
              <p className="text-slate-300">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-600/15 via-slate-900 to-indigo-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-semibold text-white">Ready to find your next dish?</h2>
          <p className="mb-6 text-slate-200">
            Explore recipe ideas and turn ingredients you already have into something great.
          </p>
          <Link
            to="/recipe"
            className="inline-flex items-center rounded-full bg-blue-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-400"
          >
            Explore Recipes
          </Link>
        </section>
      </div>
    </div>
  );
}

export default About;
