import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/nav/Navbar";
import Recipe from "./pages/Recipe";
import Description from "./pages/Description";
import RecipeForm from "./pages/RecipeForm";
function App() {
  return < >
    <Navbar />
    <Routes>
      {/* <Home /> */}
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/des/:id" element={<Description />} />
      <Route path="/submitRecipe" element={<RecipeForm />} />
    </Routes>
  </>;
}

export default App;
