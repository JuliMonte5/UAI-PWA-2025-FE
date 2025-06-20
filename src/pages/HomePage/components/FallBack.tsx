import { HomeButton } from "../../../components/";
import styles from "./FallBack.module.css";

export const FallBack = () => {
  return (
    <div className={styles.fallbackContainer}>
      <h1>404 Not found</h1>
      <HomeButton />
    </div>
  );
};
