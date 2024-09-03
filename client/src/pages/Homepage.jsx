/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MdContentCopy, MdSearch } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaMicrophone } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { CgAttachment } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoPrint } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import axios from "axios";
import DropDown from "../components/DropDown";

const responsive = {
  superLargeDesktop: {
    // any name you want
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Homepage = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mediaItems = [
    {
      id: 1,
      type: "image",
      src: "https://images.unsplash.com/photo-1639477735279-c36dda1f7ebb?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      type: "image",
      src: "https://images.unsplash.com/photo-1639548206755-b20081a7cadc?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      id: 3,
      type: "image",
      src: "https://images.unsplash.com/photo-1639477734993-44982980229e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      type: "video",
      src: "https://www.w3schools.com/html/movie.mp4", // Another example video URL
    },
  ];

  const openMediaModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Block SML");
  const [selectedItem2, setSelectedItem2] = useState("Block SML");

  const items = [
    "Block SML",
    "Search In Wikipedia",
    "Search in Web",
    "Search in Research Paper",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleItemClick2 = (item) => {
    setSelectedItem2(item);
    setIsOpen2(false);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen);
  };

  const handleQuestionClick = (responseItem) => {
    // Handle your question click logic here, e.g., showing the selected question
    setSelectedResponse(responseItem);
    // Uncheck the drawer checkbox to close the drawer
    const drawerCheckbox = document.getElementById("my-drawer");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const getChatHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/fapi/chat_history"
      );
      const data = response.data;
      if (data.status) {
        return {
          success: true,
          data: data.response,
        };
      } else {
        return {
          success: false,
          message: "Failed to fetch chat history",
        };
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      return {
        success: false,
        message: "An error occurred while fetching chat history",
      };
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      const result = await getChatHistory();
      if (result.success) {
        setChatHistory(result.data);
        console.log(chatHistory);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };
    fetchChatHistory();
  }, []);

  return (
    <div className="h-full lg:h-screen pt-20 p-6 flex flex-col">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-4 flex-1 lg:overflow-hidden">
        <div className="drawer z-50 lg:hidden flex">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="bg-[#3373a0] text-white px-4 py-2 rounded-xl shadow-lg drawer-button"
            >
              Chat History
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <h2 className="text-lg font-semibold mb-4">History</h2>
              {chatHistory.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleQuestionClick(item)}
                  className="flex cursor-pointer p-2 hover:bg-gray-200 rounded-lg duration-150 justify-between items-center"
                >
                  <li key={index} className="">
                    {item.question}
                  </li>
                  <DropDown buttonLabel="" widthClass="w-fit">
                    <a
                      className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                      role="menuitem"
                    >
                      Share
                    </a>
                    <a
                      className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                      role="menuitem"
                    >
                      Rename
                    </a>
                    <a
                      className="flex text-red-500 rounded-md px-4 py-2 text-sm hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                      role="menuitem"
                    >
                      Delete
                    </a>
                  </DropDown>
                </div>
              ))}
            </ul>
          </div>
        </div>

        {/* history div */}
        <div className="rounded-lg border lg:flex hidden lg:flex-col p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">History</h2>
          <ul>
            {chatHistory.map((item, index) => (
              <div
                key={index}
                onClick={() => handleQuestionClick(item)}
                className="flex cursor-pointer p-2 hover:bg-gray-200 rounded-lg duration-150 justify-between items-center"
              >
                <li key={index} className="">
                  {item.question}
                </li>
                <DropDown buttonLabel="" widthClass="w-fit">
                  <a
                    className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem"
                  >
                    Share
                  </a>
                  <a
                    className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem"
                  >
                    Rename
                  </a>
                  <a
                    className="flex text-red-500 rounded-md px-4 py-2 text-sm  hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem"
                  >
                    Delete
                  </a>
                </DropDown>
              </div>
            ))}
          </ul>
        </div>

        {/* content/response div */}
        <div className="rounded-xl min-h-96 border border-zinc-200 p-4 lg:col-span-3 flex flex-col justify-center items-center overflow-auto">
          {selectedResponse ? (
            <div className="flex flex-col w-full lg:max-h-full max-h-[500px] lg:h-full">
              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                <div>
                  {/* Question Section */}
                  <div className="flex w-fit gap-4 pb-4">
                    <img className="h-10" src="/user.png" alt="User" />
                    <h3 className="text-xl font-semibold mb-2">
                      {selectedResponse.question}
                    </h3>
                  </div>

                  {/* Response Section */}
                  <div className="flex gap-4">
                    <img
                      className="h-10"
                      src="https://blocksml.com/img/favicon.png"
                      alt="Response Icon"
                    />
                    <p className="whitespace-pre-wrap pt-2">
                      {selectedResponse.response}
                    </p>
                  </div>

                  <div className="pl-12 flex gap-2 text-xl py-4">
                    <div className="relative group">
                      <MdContentCopy />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Copy
                      </span>
                    </div>
                    <div className="relative group">
                      <FaFacebookF />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Facebook
                      </span>
                    </div>
                    <div className="relative group">
                      <IoPrint />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Print
                      </span>
                    </div>
                    <div className="relative group">
                      <FaXTwitter />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Twitter
                      </span>
                    </div>
                    <div className="relative group">
                      <FaShareFromSquare />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Share
                      </span>
                    </div>
                    <div className="relative group">
                      <FaWhatsapp />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        WhatsApp
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Area */}
              <div className="flex-shrink-0 flex-col lg:h-16 h-24 px-4 py-2 flex items-start justify-between lg:items-center bg-zinc-100 rounded-xl w-full">
                <div className="flex h-12 items-center justify-between w-full">
                  <CgAttachment className="text-2xl mr-2" />
                  <input
                    placeholder="Enter prompt here.."
                    className="flex-1 bg-transparent outline-none"
                    type="text"
                  />
                  <div className="relative inline-block">
                    <button
                      tabIndex={0}
                      role="button"
                      className=" lg:w-44 lg:flex hidden text-sm py-2 rounded-lg text-white px-2 bg-[#3373a0] m-3"
                      onClick={toggleDropdown}
                    >
                      {selectedItem}
                    </button>
                    {isOpen && (
                      <ul className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute bottom-full mb-2 right-0">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="active:bg-blue-100"
                            onClick={() => handleItemClick(item)}
                          >
                            <a>{item}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-3 ml-2">
                    <FaMicrophone className="text-xl cursor-pointer" />
                    <IoMdSend className="text-xl cursor-pointer" />
                  </div>
                </div>
                <div className="dropdown lg:hidden flex dropdown-top">
                  <div
                    onClick={toggleDropdown2}
                    tabIndex={1}
                    role="button"
                    className="text-sm py-2 w-44 text-center rounded-lg text-white px-2 bg-[#3373a0]"
                  >
                    {selectedItem2}
                  </div>
                  {isOpen2 && (
                    <ul
                      tabIndex={1}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      {items.map((item) => (
                        <li key={item} onClick={() => handleItemClick2(item)}>
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between h-full w-full items-center flex-col text-center">
              <div className="flex justify-center flex-col gap-4 items-center h-full w-full">
                <img
                  className="h-10"
                  src="https://blocksml.com/img/favicon.png"
                  alt=""
                />
                <p>
                  Just give our prompt a try below and get ready to be amazed.
                  <br />
                  Please login for a better experience.
                </p>
              </div>

              <div className="flex-shrink-0 flex-col lg:h-16 h-24 px-4 py-2 flex items-start justify-between lg:items-center bg-zinc-100 rounded-xl w-full">
                <div className="flex h-12 items-center justify-between w-full">
                  <CgAttachment className="text-2xl mr-2" />
                  <input
                    placeholder="Enter prompt here.."
                    className="flex-1 bg-transparent outline-none"
                    type="text"
                  />
                  <div className="relative inline-block">
                    <button
                      tabIndex={0}
                      role="button"
                      className=" lg:w-44 lg:flex hidden text-sm py-2 rounded-lg text-white px-2 bg-[#3373a0] m-3"
                      onClick={toggleDropdown}
                    >
                      {selectedItem}
                    </button>
                    {isOpen && (
                      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute bottom-full mb-2 right-0">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="active:bg-blue-100"
                            onClick={() => handleItemClick(item)}
                          >
                            <a>{item}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-3 ml-2">
                    <FaMicrophone className="text-xl cursor-pointer" />
                    <IoMdSend className="text-xl cursor-pointer" />
                  </div>
                </div>
                <div className="dropdown lg:hidden flex dropdown-top">
                  <div
                    onClick={toggleDropdown2}
                    tabIndex={1}
                    role="button"
                    className="text-sm py-2 w-44 text-center rounded-lg text-white px-2 bg-[#3373a0]"
                  >
                    {selectedItem2}
                  </div>
                  {isOpen2 && (
                    <ul
                      tabIndex={1}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      {items.map((item) => (
                        <li key={item} onClick={() => handleItemClick2(item)}>
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* image div */}

        
        <div className="flex gap-4 flex-col">
          <div className="rounded-lg p-4 border border-zinc-200">
            <h1 className="font-semibold">Anticipated Media Response:</h1>
            <div
              className="grid grid-cols-2 grid-rows-2 py-4 gap-2 cursor-pointer"
              onClick={openMediaModal}
            >
              {mediaItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex h-24 w-24 justify-center items-center overflow-hidden"
                >
                  {item.type === "video" ? (
                    <video
                      className="w-full h-full object-cover rounded-xl"
                      src={item.src}
                      alt={`Video thumbnail ${item.id}`}
                      muted
                      controls={false}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      src={item.src}
                      alt={`Media item ${item.id}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-4 border h-full border-zinc-200">
            <h1 className="font-semibold pb-4">Similar Searches:</h1>
            <div className="flex gap-3 flex-col">
              <div className="flex gap-2 bg-zinc-100 rounded-2xl p-2 justify-start items-center">
                <MdSearch className="text-xl" />
                <p>Similar search result</p>
              </div>
              <div className="flex gap-2 bg-zinc-100 rounded-2xl p-2 justify-start items-center">
                <MdSearch className="text-xl" />
                <p>Similar search result</p>
              </div>
              <div className="flex gap-2 bg-zinc-100 rounded-2xl p-2 justify-start items-center">
                <MdSearch className="text-xl" />
                <p>Similar search result</p>
              </div>
              <div className="flex gap-2 bg-zinc-100 rounded-2xl p-2 justify-start items-center">
                <MdSearch className="text-xl" />
                <p>Similar search result</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Carousel Dialog */}
      <dialog
        id="my_modal_3"
        className="modal"
        role="dialog"
        aria-labelledby="media-carousel-title"
        aria-modal="true"
      >
        <div className="modal-box max-w-5xl relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
            aria-label="Close modal"
          >
            ✕
          </button>
          <h2 id="media-carousel-title" className="text-xl font-semibold mb-4">
            Related Media
          </h2>
          <Carousel responsive={responsive}>
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-center items-center p-4"
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`Slide ${item.id}`}
                    className="max-w-full h-80 max-h-full rounded-lg shadow-lg"
                  />
                ) : (
                  <video
                    controls
                    className="max-w-full h-80 max-h-full rounded-lg shadow-lg"
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </dialog>
    </div>
  );
};

export default Homepage;
