/** @format */

import { RiMenu4Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const Navbar = ({ hamb, setHamb }) => {
  return (
    <>
    <div className="my-1 rounded-sm  p-4 py-3 items-center space-x-4 BigNav">
        <img
          src={img}
          alt=""
          onClick={() => setHamb(!hamb)}
          style={{ cursor: "pointer" }}
        />
        <div
          className='right'
        >
        <p>Welcome</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
