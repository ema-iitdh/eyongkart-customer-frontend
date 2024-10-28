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
    <div className="bg-gray-100">
      <div className="container">
        <div className="grid md:grid-rows-2 pb-20 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <a
              href="#"
              className="text-primary font-semibold tracking-widest text-xl uppercase sm:text-2xl"
            >
              HANDLOOM & HANDICRAFT
            </a>
            <p className="text-gray-600 dark:text-white/70  pt-3">
              The traditional clothing of the Manipur region of northeastern
              India is famous for its vibrant colours and detailed patterns. The
              name of the traditional dress in Manipuri depends on whether a man
              or a woman wears it. Below are the names of the traditional dress
              of women's and men's manipuri separately. Manipur's handlooms and
              handicrafts are famous for their vibrant designs and complex
              artistry. The handloom division is known for traditional fabrics
              such as phanek and raniphee, introducing unique patterns and
              natural dyes. Handicrafts such as bamboo and sugarcane, pottery
              and jewellery reflect the region's rich cultural heritage and
              skilled craftsmanship, and each work embodies the tradition and
              creativity of local craftsmen.
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
                  <GrLocation size={20} />
                  <p>Imphal, Manipur, India</p>
                </div>

                {/* <div className="flex items-center gap-3 mt-6">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
