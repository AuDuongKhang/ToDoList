import { DetailedHTMLProps, HTMLAttributes } from "react";
import style from "./Layout.module.css";

interface PropsLayout
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Layout: React.FC<PropsLayout> = ({ children }) => {
  return <section className={style.Layout}>{children}</section>;
};

export default Layout;
