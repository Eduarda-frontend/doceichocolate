import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 
            p-4 rounded-full shadow-lg 
            bg-primary text-primary-foreground 
            hover:bg-primary/90 transition 
            flex items-center justify-center
          "
          aria-label="Voltar ao topo"
        >
          <FaArrowUp  className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
