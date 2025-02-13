"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "/main", icon: "" },
  {
    name: "觀看紀錄",
    href: "/history",
    icon: "",
  },
  { name: "Profile", href: "/profile", icon: "" },
];

interface NavLinkProps {
  hamburger: boolean;
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavLink({ hamburger, setHamburger }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <>
      {hamburger
        ? links.map((link) => {
            return (
              <motion.div
                key={link.name}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 100,
                }}
                transition={{ ease: "easeOut", duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className={clsx(
                    "font-bold hover:text-blue-600",
                    pathname === link.href ? "text-blue-600" : ""
                  )}
                  onClick={() => setHamburger((prev) => !prev)}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })
        : links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "font-bold hover:text-blue-600",
                  pathname === link.href ? "text-blue-600" : ""
                )}
              >
                {link.name}
              </Link>
            );
          })}
    </>
  );
}
