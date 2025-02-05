import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.tiktok.com/@shinnra_?_t=ZS-8teDo8KrQng&_r=1", icon: <FaTiktok/> },
  { href: "https://youtube.com", icon: <FaInstagram /> },
  { href: "wa.link/likq6u", icon: <FaWhatsapp /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          © 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;
