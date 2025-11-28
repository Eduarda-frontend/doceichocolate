import heroImage from '@/assets/hero-banner.jpg';
import logo from '@/assets/logo.png';

const HeroSection = () => {
  return(
    <section 
      className="relative md:h-[70vh] overflow-hidden flex items-center justify-center"
      role="banner"
      aria-label="Seção principal - Doce e Chocolate"
    >
      {/* Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Box de conteúdo */}
      <div 
        className="
          absolute 
          bottom-0 
          w-full 
          bg-white 
          rounded-2xl 
          z-10 
          p-6 
          grid 
          gap-6
          text-center

          /* Mobile */
          grid-cols-1

          /* Tablet */
          md:grid-cols-[auto_1fr]

          /* Desktop */
          lg:grid-cols-7 
          lg:p-10
        "
      >
        {/* Logo */}
        <div className="place-self-center lg:col-span-1">
          <img 
            src={logo} 
            alt="Logo Doce e Chocolate"
            loading="lazy"
            className="rounded-3xl w-28 md:w-40"
          />
        </div>

        {/* Conteúdo principal */}
        <div 
          className="
            flex 
            flex-col 
            items-center 
            lg:items-center 
            justify-center
            gap-3 
            lg:col-span-5
            text-center 
            lg:text-left
          "
        >
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-cursivo leading-tight"
          >
            Doce e Chocolate
          </h1>

          <ul 
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-4 
              pt-4 
              font-secundario 
              text-lg
            "
          >
            <li className="flex items-center gap-2">
              {/* Ícone localização */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="size-6"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>Caldas Novas - GO</span>
            </li>

            <li>
              <a  
                href="#informacoes"
                className="
                  underline 
                  underline-offset-2 
                  hover:text-pink-700 
                  transition 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-pink-400 
                  rounded-md
                "
              >
                Mais informações
              </a>
            </li>
          </ul>
        </div>

        {/* Espaço opcional da direita no layout desktop */}
        <div className="hidden lg:block lg:col-span-1"></div>
      </div>
      
    </section>
  );
};

export default HeroSection;
