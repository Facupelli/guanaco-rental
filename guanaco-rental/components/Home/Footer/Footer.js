import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <SocialMediaIcons />
      <p>© 2021. Guanaco Rental. San Juan, Argentina.</p>
    </footer>
  );
}
