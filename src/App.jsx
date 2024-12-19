import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/nav/Navbar";
import Recipe from "./pages/Recipe";
import Description from "./pages/Description";
import RecipeForm from "./pages/RecipeForm";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Footer from "./components/nav/Footer";
import GoToTop from "./component/GoToTop";
import MessengerChat from "./component/MessengerChat";
import FacebookMessengerChat from "./component/FacebookMessengerChat";
import ChatBot from "./component/ChatBot";
function App() {
  return < >
    <Navbar />
    {/* <FacebookMessengerChat pageId='517579444770810' appId='968976658430478' /> */}
    {/* <MessengerChat /> */}
    <ChatBot />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/des/:id" element={<Description />} />
      <Route path="/submitRecipe" element={<RecipeForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
    <Footer />
    <GoToTop />
  </>;
}

export default App;
