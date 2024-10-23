/** @format */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CloseIcons, MenuIcons } from "../social-icons/icons";
import ThemeSwitch from "./components/ThemeSwitch";
import { useUser } from "@auth0/nextjs-auth0/client";

export const NavBarImage =
  "https://images.unsplash.com/photo-1521239365713-1e26965c69ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const navLinks = [
  {
    id: "popular",
    title: "Popular ",
  },
  // {
  //   id: "property",
  //   title: "Property",
  // },
  // {
  //   id: "search",
  //   title: "Search",
  // },
  // {
  //   id: "profile",
  //   title: "Profile",
  // },
  // {
  //   id: "about-us",
  //   title: "About Us",
  // },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { user, isLoading } = useUser();

  function getInitials(fullName: string) {
    const names = fullName.split(" "); // Split the full name by spaces
    if (names.length < 2) return ""; // Handle cases with no last name

    const firstNameInitial = names[0].charAt(0); // First letter of the first name
    const lastNameInitial = names[names.length - 1].charAt(0); // First letter of the last name

    return firstNameInitial + lastNameInitial; // Concatenate initials
  }
  return (
    <nav
      className={`fixed top-0 z-20 flex w-full items-center border-b-2 border-gray-300 bg-white/30 px-6 py-5 opacity-80 backdrop-blur-md sm:px-16`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scroll(0, 0);
          }}
        >
          <Image
            alt="logo"
            className="border-black-100 border-1 rounded-full"
            src={NavBarImage}
            width={50}
            height={50}
            loading="eager"
            priority
          />
          <p className="cursor-pointer font-bold">Bookmark Manager</p>
        </Link>
        <div className="flex gap-4 lg:gap-6">
          <ul className="hidden list-none flex-row items-center gap-4 text-sm md:flex lg:gap-6">
            {navLinks.map((link) => {
              return (
                <li
                  key={link.id}
                  className={`text-foreground transition-colors hover:text-foreground/80 ${
                    active === link.title ? "text-[#915eff]" : ""
                  }cursor-pointer`}
                  onClick={() => setActive(link.title)}
                >
                  <a href={`/${link.id}`}>{link.title}</a>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-1 items-center justify-end md:hidden">
            <DropdownMenu
              onOpenChange={(
                open: boolean | ((prevState: boolean) => boolean),
              ) => setToggle(open)}
            >
              <DropdownMenuTrigger aria-label="Small Screen navbar">
                {!toggle ? <MenuIcons /> : <CloseIcons />}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.title}>
                    <a
                      href={`/${link.id}`}
                      className={`text-foreground transition-colors hover:text-foreground/80 ${
                        active === link.title ? "text-[#915eff]" : ""
                      }cursor-pointer`}
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      {link.title}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeSwitch />
          {!isLoading && !user && (
            <Link
              href="/api/auth/login"
              className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Login
            </Link>
          )}
          {user && user.picture && (
            <Avatar>
              <AvatarImage
                src={user.picture || "https://github.com/shadcn.png"}
                alt="Avatar Images"
              />
              <AvatarFallback>
                {getInitials(user.name || "User")}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
