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
            <p className="text-gray-600 dark:text-white/70  pt-3">
              The traditional dress of Manipur, a state in Northeast India, is
              famous for its bright colors and detailed patterns. Manipuri
              traditional dress name depends on whether they are worn by men or
              women. Below we have mentioned Manipuri traditional dress name for
              female and male separately.
            </p>
          </div>
          {/* Footer links */}
          <div className="col-span-2 grid grid-cols-2  md:pl-6">
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3 dark:text-white">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-400  hover:text-red-500 duration-300"
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
                  <p>+91 453278999</p>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <FaMobileAlt />
                  <p> +91 567895446</p>
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
