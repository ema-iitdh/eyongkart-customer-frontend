import React from "react";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";

const Darkmode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;
  //   accessing to html elements
  //   console.log(element);
  // set theme to localstorage and html

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      element.classList.add("dark");
      element.classList.add("dark");
    } else {
      element.classList.remove("light");
      element.classList.remove("dark");
    }
  });

  return (
    <div className="relative">
      <BsToggle2On
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`w-12 h-6 cursor-pointer absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        } transition-all duration-300`}
      />
      <BsToggle2Off
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`w-12 h-6 cursor-pointer `}
      />
    </div>
  );
};

export default Darkmode;
