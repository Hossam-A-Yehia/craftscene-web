import { LinkProps } from "@/types/Atoms";
import Link from "next/link";
import React from "react";
const NavLink: React.FC<LinkProps> = ({ children, href, classN }) => {
  return (
    <Link href={href} className={`text-main text-sm font-medium ${classN}`}>
      {children}
    </Link>
  );
};

export default NavLink;
