import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    // { name: "Ranking", href: "/ranking", current: false },
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
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="absolute px-4 pt-6 inset-y-0 font-xxCompressed tracking-widest
            flex flex-col  w-screen h-screen bg-mobileBg bg-no-repeat bg-cover text-white z-10 overflow-hidden"
            variants={item}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            transition={{ duration: 0 }}
            exit="exit"
          >
            <div className="flex pl-2 pb-4">
              <button
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-md pr-2 text-gray-400  hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {navigation.map((item, index) => (
              <motion.a
                className="text-6xl text-green  flex items-center mt-4 p-3 mb-4 hover:opacity-80 focus:opacity-80 uppercase"
                href={item.href}
                key={index}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
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
            {/* <div className="grow"></div> */}
            <motion.div
              className="flex pl-3 mb-8 mt-8"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
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
            <div className="grow"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropDownMenu;
