import { HeaderLogo } from "./styles";

import logoImg from "../../assets/logo.svg";
import Image from "next/image";

export function Header() {
  return (
    <HeaderLogo>
      <Image src={logoImg} alt="" />
    </HeaderLogo>
  );
}
