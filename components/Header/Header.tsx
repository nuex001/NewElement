import Link from "next/link";
import React, { useState } from "react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import ProfileMenu from "./ProfileMenu";
import { usePathname } from "next/navigation";
import DropDownMenu from "./DropDownMenu";

const navigation = [
  { name: "Marketplace", href: "/", current: true },
  { name: "Apply to join", href: "/apply", current: false },
  { name: "Ranking", href: "/ranking", current: false },
  { name: "About Us", href: "/about", current: false },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [openMenu, setOpen] = useState<boolean>(false);

  const isOpen = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };
  const pathname = usePathname();
  const bg = pathname === "/apply" ? "bg-transparent" : "bg-black";
  return (
    <Popover className="relative z-2">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 font-xCompressed lg:font-xxCompressed uppercase text-green">
            <div
              className={`absolute lg:fixed flex h-20  xl:max-w-[1600px] left-[50%] z-2 translate-x-[-50%]  top-0 w-screen px-4 sm:px-4 lg:px-0 items-center justify-center ${bg}`}
            >
              <div className="flex  items-center w-full justify-center lg:px-10 sm:items-stretch ">
                {/* <div className="flex items-center lg:hidden"> */}
                {/* <Popover.Button className="inline-flex items-center justify-center  text-gray-400  hover:text-gray-500 ">
                    <span className="sr-only">Open menu</span>
                    <Bars2Icon className="h-7 w-7 mr-2" aria-hidden="true" />
                  </Popover.Button> */}
                <header className="flex items-center lg:hidden">
                  <button
                    className="inline-flex items-center justify-center  text-gray-400 "
                    onClick={isOpen}
                  >
                    <Bars2Icon className="h-7 w-7 mr-2" aria-hidden="true" />
                    <span className="sr-only">Open menu</span>
                  </button>
                </header>
                {/* </div> */}
                <div className="flex  items-center basis-[48%]">
                  <Link href="/">
                    <h1 className="text-3xl lg:text-4xl font-compressed">
                      NEW ELEMENTS
                    </h1>
                  </Link>
                </div>

                <div className="basis-[52%] flex justify-between">
                  <div className=" w-full items-center">
                    <div className="flex w-full items-center justify-end lg:justify-between">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            "text-blue  hover:opacity-80",
                            "px-3 py-2 rounded-md lg:text-dynamic font-medium tracking-wide hidden lg:flex"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}{" "}
                      <div className="flex items-center justify-center">
                        <ProfileMenu />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile */}
          <DropDownMenu openMenu={openMenu} closeMenu={closeMenu} />
          {/* {open && (
            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 inset-x-0  top-0 origin-top-right transform transition lg:hidden"
              >
                <div className="divide-y-2 z-10 font-compressed  uppercase text-green pt-2 lg:px-8 bg-black ">
                  <div className="mx-4 pt-5 pb-6">
                    <div className="flex pb-4">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md pr-2 text-gray-400  hover:text-gray-500 focus:outline-none">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>

                      <Link href="/">
                        <h1 className="text-xl text-white">NEW ELEMENTS</h1>
                      </Link>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-8 font-xxCompressed ">
                        {navigation.map((item) => (
                          <Popover.Button
                            as={Link}
                            key={item.name}
                            href={item.href}
                            className="-m-3  flex items-center p-3 hover:bg-gray-700"
                          >
                            <span className=" text-5xl text-green ">
                              {item.name}
                            </span>
                          </Popover.Button>
                        ))}
                      </nav>{" "}
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          )} */}
        </>
      )}
    </Popover>
  );
}
