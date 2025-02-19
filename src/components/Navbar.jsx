import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["Hero", "About", "Arknights", "Story", "Contact"];
const musicTracks = [
  { id: 1, title: "Arknigths - CC#4", src: "/audio/ak.mp3" },
  { id: 2, title: "Garam N Madu", src: "/audio/gnm.mp3" },
  { id: 3, title: "Cinema", src: "/audio/loop.mp3" },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isMusicMenuVisible, setIsMusicMenuVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const playAudio = () => {
      if (audioElementRef.current) {
        audioElementRef.current.play().catch((error) => {
          console.log("Autoplay blocked, waiting for user interaction", error);
        });
      }
    };

    playAudio();

    const enableAudioOnInteraction = () => {
      playAudio();
      document.removeEventListener("click", enableAudioOnInteraction);
      document.removeEventListener("scroll", enableAudioOnInteraction);
    };

    document.addEventListener("click", enableAudioOnInteraction);
    document.addEventListener("scroll", enableAudioOnInteraction);

    return () => {
      document.removeEventListener("click", enableAudioOnInteraction);
      document.removeEventListener("scroll", enableAudioOnInteraction);
    };
  }, []);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMusicSelection = (track) => {
    if (currentTrack && currentTrack !== track) {
      audioElementRef.current.pause();
    }
    setCurrentTrack(track);
    audioElementRef.current.src = track.src;
    audioElementRef.current.play();
    setIsMusicMenuVisible(false); // Hide menu after selecting a track
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div 
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-500 sm:inset-x-6 hidden md:block"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Button
              id="product-button"
              title="2.Shinnra"
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                  onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white"
            >
              <span className="block w-6 h-1 bg-white mb-1"></span>
              <span className="block w-6 h-1 bg-white mb-1"></span>
              <span className="block w-6 h-1 bg-white"></span>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="absolute top-16 right-0 bg-white shadow-lg p-4 rounded w-40">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="block py-1 px-2 text-black hover:bg-gray-100"
                    onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}

            <button
              onClick={() => setIsMusicMenuVisible((prev) => !prev)}
              className="ml-10 flex items-center space-x-0.5"
            >
              <p className="text-white uppercase font-general font-bold text-xl">m</p>
              {isMusicMenuVisible && (
                <div className="absolute top-12 right-0 bg-white shadow-lg p-2 rounded">
                  {musicTracks.map((track) => (
                    <div
                      key={track.id}
                      className="cursor-pointer py-1 px-2 hover:bg-gray-100"
                      onClick={() => handleMusicSelection(track)}
                    >
                      {track.title}
                    </div>
                  ))}
                </div>
              )}
            </button>
          </div>
        </nav>
      </header>

      <audio
        ref={audioElementRef}
        className="hidden"
        loop
      />
    </div>
  );
};

export default NavBar;
