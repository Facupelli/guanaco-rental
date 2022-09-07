import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import s from "./SocialMediaIcons.module.scss";
import Link from "next/link";

export default function SocialMediaIcons({ width }) {
  return (
    <div className={s.social_net_icons_wrapper}>
      <div>
        <Link
          href="https://www.instagram.com/guanaco.rentalaudiovisual/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className={`${
              width === "30" ? s.social_net_icon_30 : s.social_net_icon_20
            }`}
          />
        </Link>
      </div>
      <div>
        <Link
          href="https://www.youtube.com/channel/UCBBtSIgA8F4xqz65fO8pcoA"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faYoutube}
            className={`${
              width === "30" ? s.social_net_icon_30 : s.social_net_icon_20
            }`}
          />
        </Link>
      </div>
      <div>
        <Link
          href="https://www.facebook.com/guanaco.rental/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className={`${
              width === "30" ? s.social_net_icon_30 : s.social_net_icon_20
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
