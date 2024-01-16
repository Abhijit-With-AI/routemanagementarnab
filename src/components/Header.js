import React from "react";
import Logo from "../svg/Logo";
import Profile from "../svg/Profile";
import { Flex } from "@chakra-ui/react";
import LogoTab from "../svg/LogoTab";
import Logout from "../svg/Logout";
import LogoutTab from "../svg/LogoutTab";
import ProfileTab from "../svg/ProfileTab";
import { useMediaQuery } from "@chakra-ui/react";

export default function Header() {
  const [isLargerThan800] = useMediaQuery("(min-width: 500px)");
  return (
    <Flex justifyContent={"space-between"} padding={2}>
      {!isLargerThan800 ? <ProfileTab></ProfileTab> : <Profile></Profile>}

      {!isLargerThan800 ? <LogoTab></LogoTab> : <Logo></Logo>}
      {!isLargerThan800 ? <LogoutTab></LogoutTab>: <Logout></Logout>}
    </Flex>
  );
}
