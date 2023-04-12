import Link from "next/link";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <SocialMediaIcons />
      <div className={s.brand}>
        <p>© 2021. Guanaco Rental. San Juan, Argentina.</p>
        <div className={s.privacy_link}>
          <Link href="/policy">Política de privacidad.</Link>
        </div>
      </div>
    </footer>
  );
}
