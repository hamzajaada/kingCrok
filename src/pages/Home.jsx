import React from "react";
import Header from "../Components/layout/Header";
import Feauter1 from "../Components/Section/feauter1";
import Feauter2 from "../Components/Section/feauter2";
import Feauter3 from "../Components/Section/feauter3";

import MultiProductSlider from "../Components/Section/MultiProductSlider";
import Footer from "../Components/Section/Footer";

function Home() {
  return (
   <div>
    <Header/>
    <Feauter1/>
    <MultiProductSlider/>
    <Feauter2/>
    <Feauter3/>
    <Footer/>
   </div>
  );
}

export default Home;
