import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/nav/Navbar";
import Recipe from "./pages/Recipe";
import Description from "./pages/Description";
import RecipeForm from "./pages/RecipeForm";
import MessengerChatBot from "./component/MessengerChatBot";
import PrivacyPolicy from "./pages/PrivacyPolicy";
function App() {
  return < >
    <Navbar />
    <Routes>
      {/* <Home /> */}
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/des/:id" element={<Description />} />
      <Route path="/submitRecipe" element={<RecipeForm />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
    <div className="fixed bottom-0 bg-white">
      <MessengerChatBot pageId='542291682293940' appId='592047586550815' />
    </div>
  </>;
}

export default App;
