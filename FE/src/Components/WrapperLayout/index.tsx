import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./WrapperLayout.module.css";

interface WrapperLayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const WrapperLayout: React.FC<WrapperLayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default WrapperLayout;
