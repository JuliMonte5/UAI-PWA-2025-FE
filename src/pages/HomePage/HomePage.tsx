import { Card } from "./components/Card";
import styles from "./HomePage.module.css";

const Sections = [
  {
    title: "Tutorials",
    link: "/tutorials",
  },
  {
    title: "Documentation",
    link: "/docs",
  },
  {
    title: "Contact Form",
    link: "/contact",
  },
];

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>PWA 2025 - FE</h1>
      <div className={styles.cardsContainer}>
        {Sections.map((section) => (
          <Card title={section.title} link={section.link} />
        ))}
      </div>
    </div>
  );
};
