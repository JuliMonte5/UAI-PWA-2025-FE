import { Outlet } from "react-router";
import styles from "./Tutorials.module.css";
import { NavBar } from "./components/NavBar";
import { HomeButton } from "../../components";

export const Tutorials = () => {
  return (
    <div className={styles.container}>
      <h1>Tutorials</h1>
      <HomeButton />
      <p>
        Welcome to the tutorials section! Here you will find various tutorials
        to help you learn and master new skills.
      </p>
      <NavBar />
      <Outlet />
    </div>
  );
};
