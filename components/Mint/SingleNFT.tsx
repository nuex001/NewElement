import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  formValues: any;
  image: string;
  handleImageChange: any;
  handleChange: any;
};

const SingleNFT = ({
  image,
  formValues,
  handleImageChange,
  handleChange,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center md:w-3/4 ">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center  justify-center w-full h-80 border-green border cursor-pointer bg-gray-50 dark:hover:bg-neutral-700 dark:bg-neutral-800 hover:bg-gray-100 transition duration-300 ease-in-out "
      >
        {image ? (
          <img
            src={image}
            alt="nft"
            className="object-cover w-fit inherit p-1"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm font-ibmPlex text-gray-500 dark:text-gray-400">
              <span className="font-semibold ">Click to upload</span> or drag
              and drop
            </p>
          </div>
        )}{" "}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />{" "}
      </label>
      <input
        id="title1"
        placeholder="Title"
        type="text"
        name="title"
        value={formValues.title}
        onChange={handleChange}
        className="w-full h-16 mt-3 border-green placeholder:text-sm border pl-5 cursor-pointer font-ibmPlex text-green  dark:bg-neutral-800 focus:bg-neutral-700 focus:outline-none transition duration-300 ease-in-out"
      />

      <input
        id="description1"
        name="description"
        placeholder="Description"
        type="text"
        value={formValues.description}
        onChange={handleChange}
        className="w-full h-20 mt-3 border-green placeholder:text-sm border pl-5 cursor-pointer font-ibmPlex text-green  dark:bg-neutral-800  focus:bg-neutral-700 focus:outline-none transition duration-300 ease-in-out"
      />
      <div className="font-ibmPlex text-left">
        <p className="my-4 text-[13px]">
          Please give your artwork some context with a title and description.
        </p>
        <Menu as="div" className="relative inline-block w-full">
          <div>
            <Menu.Button className="inline-flex items-center text-sm mb-3 pl-5 w-full h-14 border-green border cursor-pointer bg-gray-50 dark:hover:bg-neutral-700 dark:bg-neutral-800 hover:bg-gray-100 transition duration-300 ease-in-out ">
              <p> Collection</p>
              <div className="flex-grow"></div>
              <ChevronDownIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-full origin-top-right  border-green border cursor-pointer dark:bg-neutral-800 ">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active
                          ? "bg-neutral-700 text-gray-200"
                          : "text-gray-400",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Collection 1
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active
                          ? "bg-neutral-700 text-gray-200"
                          : "text-gray-400",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Collection 2
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className=" flex text-left justify-end mb-6">
          {" "}
          <p className="pr-2 font-bold text-green uppercase">
            Reserve <br /> Price
          </p>
          <input
            type="number"
            name="reservePrice"
            pattern="[0-9]+"
            placeholder="0.00  ETH"
            value={formValues.reservePrice}
            onChange={handleChange}
            className="border bg-transparent pl-2 w-[30%] focus:outline-green"
          />
        </div>
        <p className="mb-4 text-[13px]">
          Please provide the minimum amount you would like to sell your artwork
          for. This is denominated in ETHEREUM. When you add a ETH amount you
          will see the current Dollar amount represented underneath the box.
        </p>
      </div>
    </div>
  );
};

export default SingleNFT;
