import React from "react";
import { GrLocation } from "react-icons/gr";
import { FaMobileAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About Us",
    link: "/about",
  },
  // {
  //   title: "Contact",
  //   link: "/contact",
  // },
];

const Footer = () => {
  return (
    <div className="dark:bg-gray-950">
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <a
              href="#"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              HANDLOOM
            </a>
            <p className="text-gray-600 dark:text-white/70 lg:pr-24 pt-3">
              The traditional dress of Manipur, a state in Northeast India, is
              famous for its bright colors and detailed patterns. Manipuri
              traditional dress name depends on whether they are worn by men or
              women. Below we have mentioned Manipuri traditional dress name for
              female and male separately.
            </p>
            <p className="text-gray-500 mt-4">Made by coding devolpers.</p>
            <a
              href="https://brave.com"
              target="_blank"
              className="inline-block bg-primary/90 text-white py-2 px-4 mt-4 text-sm rounded-full"
            >
              Visit our website
            </a>
          </div>
          {/* Footer links */}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3 dark:text-white">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* second column */}

            {/*  Company address */}
            <div className="py-8 px-4 col-span-2 sm:col-auto dark:text-white">
              <h1 className="text-xl font-bold sm:text-left mb-3 ">Address </h1>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <GrLocation />
                  <p>Imphal,Manipur,India</p>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <FaMobileAlt />
                  <p>+91 9362002083</p>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <FaMobileAlt />
                  <p> +91 9863059696</p>
                </div>
                {/* social link */}
                <div className="flex items-center gap-3 mt-6">
                  <a href="#">
                    <FaInstagram className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <a href="#">
                    <FaFacebook className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <a href="#">
                    <FaLinkedin className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <a href="#">
                    <FaGithub className="text-3xl hover:text-primary duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
