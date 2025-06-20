import { NavLink } from "react-router";

import styles from "./NavBar.module.css";

const tutorialSections = [
  {
    title: "Getting Started",

    NavLink: "/tutorials/tutorial/1",
  },
  {
    title: "Advanced Techniques",

    NavLink: "/tutorials/tutorial/2",
  },
  {
    title: "Best Practices",

    NavLink: "/tutorials/tutorial/3",
  },
];

export const NavBar = () => {
  return (
    <div className={styles.container}>
      {tutorialSections.map((section, index) => (
        <NavLink
          key={index}
          to={section.NavLink}
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          {section.title}
        </NavLink>
      ))}
    </div>
  );
};
