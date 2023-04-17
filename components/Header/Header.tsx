import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";

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
  //  thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  return (
    <Popover className="relative  z-10">
      <div className="mx-auto  px-2 sm:px-6 font-compressed uppercase text-green lg:px-8 max-w-[1300px]">
        <div className="absolute flex h-20 w-[90%] items-center justify-between ">
          <div className="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start">
            <div className="flex items-center pl-5">
              <Link href="/">
                <h1 className="text-3xl pl-5 ">NEW ELEMENTS</h1>
              </Link>
            </div>
            <div className="grow flex"></div>
            <div className="hidden lg:ml-10 lg:mr-16 lg:flex items-center">
              <div className="flex  space-x-4 items-center ">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "text-blue  hover:opacity-80",
                      "px-3 py-2 rounded-md text-xl font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-10 flex items-center justify-center">
              <ProfileMenu />
            </div>

            <div className="-my-2 mt-2 lg:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-7 w-7" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
        </div>
      </div>

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
          className="absolute z-10 inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden"
        >
          <div className="divide-y-2 z-10 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <img
                    className="md:ml-5"
                    alt="logo"
                    src="images/Nav-Logo.png"
                    width="200"
                  />
                </Link>
                <div className="-mr-2 ">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex font-courier border-b items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
