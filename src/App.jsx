import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/nav/Navbar";
import Recipe from "./pages/Recipe";
import Description from "./pages/Description";
import RecipeForm from "./pages/RecipeForm";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import MessengerChatBot from "./component/MessengerChatBot";
import Footer from "./components/nav/Footer";
function App() {
  return < >
    <Navbar />
    <MessengerChatBot pageId='1119864616458434' appId='592047586550815' />
    <Routes>
      {/* <Home /> */}
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/des/:id" element={<Description />} />
      <Route path="/submitRecipe" element={<RecipeForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
    <Footer />

  </>;
}

export default App;
