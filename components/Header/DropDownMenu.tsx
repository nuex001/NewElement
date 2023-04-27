import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Bars2Icon from "@heroicons/react/24/outline/Bars2Icon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Link from "next/link";
import Image from "next/image";
import discord from "../../assets/discord.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";

type Props = {
  openMenu: boolean;
  closeMenu: () => void;
};

function DropDownMenu({ openMenu, closeMenu }: Props) {
  const navigation = [
    { name: "Marketplace", href: "/", current: true },
    { name: "Apply to join", href: "/apply", current: false },
    { name: "Ranking", href: "/ranking", current: false },
    { name: "About Us", href: "/about", current: false },
  ];
  //lets start animation
  const item = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };

  return (
    <div className="relative z-2 lg:hidden">
      {/* <header className="flex items-center">
        <button
          className="inline-flex items-center justify-center  text-gray-400 "
          onClick={isOpen}
        >
          <Bars2Icon className="h-7 w-7 mr-2" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </header> */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="absolute pl-4 pt-8 inset-y-0 font-xxCompressed tracking-widest
              w-screen h-screen bg-mobileBg text-white z-10 overflow-hidden"
            variants={item}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit="exit"
          >
            <div className="flex pb-10">
              <button
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-md pr-2 text-gray-400  hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <Link href="/">
                <h1 className="text-xl font-compressed text-white">
                  NEW ELEMENTS
                </h1>
              </Link>
            </div>
            {navigation.map((item, index) => (
              <motion.a
                className="text-5xl text-green  flex items-center pb-8 p-3 hover:bg-gray-700 uppercase"
                href={item.href}
                key={index}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                exit={{
                  opacity: 0,
                  y: 90,
                  transition: {
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              className="flex pl-3 mt-6"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              exit={{
                opacity: 0,
                y: 90,
                transition: {
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            >
              <Link className="mr-6" href="#">
                <Image src={discord} width={30} height={30} alt="discord" />
              </Link>
              <Link className="mr-6" href="#">
                <Image src={instagram} width={30} height={30} alt="instagram" />
              </Link>
              <Link className="mr-6" href="#">
                <Image src={twitter} width={30} height={30} alt="twitter" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <div
        className="w-full h-screen-16 flex items-center justify-center flex-col;
"
      >
        <p>Animated Navigation</p>
      </div> */}
    </div>
  );
}

export default DropDownMenu;
