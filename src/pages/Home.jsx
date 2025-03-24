import React, { useRef } from "react";
import Header from "../Components/layout/Header";
import Feauter1 from "../Components/Section/feauter1";
import Feauter2 from "../Components/Section/feauter2";
import Feauter3 from "../Components/Section/feauter3";
import MultiProductSlider from "../Components/Section/MultiProductSlider";
import Footer from "../Components/layout/Footer";

function Home() {
  // Références pour chaque section
  const Apropos = useRef(null);
  const Contact = useRef(null);

  // Fonction pour faire défiler la page vers une section spécifique
  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Délai de 100ms pour éviter les conflits d'affichage
    } else {
      console.error("Référence invalide:", sectionRef);
    }
  };

  return (
    <div>
      <Header
        scrollToSection={scrollToSection}
        Contact={Contact}
        Apropos={Apropos}
      />
      <Feauter1 />
      <MultiProductSlider />
      <Feauter2 />
      <div ref={Contact}>
        <Feauter3 />
      </div>
      <Footer
        scrollToSection={scrollToSection}
        Contact={Contact}
      />
    </div>
  );
}

export default Home;