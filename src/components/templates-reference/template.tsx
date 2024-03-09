/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Menu, Transition } from "@headlessui/react";
import {
  IconArrowBarToRight,
  IconCheck,
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconFolderFilled,
  IconMusic,
  IconPhoto,
  IconPlayerPlay,
  IconSearch,
  IconTextPlus,
  IconTrash,
  IconUserShare,
  IconVideo,
  IconX,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../ui/modal";
import testImg from "./../../assets/download.jpeg";
import dashboard_hero_img from "./../../assets/new1.png";
import testAudio from "./../../assets/test.mp3";
import {
  AddJournalTemp,
  DeleteModalTemp,
  MoveCopyModalTemp,
  ShareModalTemp,
} from "./all-modals";
import { UploadFlowModalTemp } from "./upload-flow";

export const Card = ({ type, name, needs_approval }) => {
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [action, setAction] = useState<number>(0);

  const card_dropdown_options = [
    {
      id: 1,
      icon: <IconEye />,
      name: "View",
      action: () => {
        if (type != "folder") {
          setPreviewModal(true);
        }
      },
    },
    {
      id: 2,
      icon: <IconTrash />,
      name: "Delete",
      action: () => {
        setActionModal(true);
        setAction(2);
      },
    },
    {
      id: 3,
      icon: <IconArrowBarToRight />,
      name: "Move",
      action: () => {
        setActionModal(true);
        setAction(3);
      },
    },
    {
      id: 4,
      icon: <IconCopy />,
      name: "Copy",
      action: () => {
        setActionModal(true);
        setAction(4);
      },
    },
    {
      id: 5,
      icon: <IconUserShare />,
      name: "Share",
      action: () => {
        setActionModal(true);
        setAction(5);
      },
    },
    {
      id: 6,
      icon: <IconTextPlus />,
      name: "Add Journal",
      action: () => {
        setActionModal(true);
        setAction(6);
      },
    },
  ];

  const clickHandler = () => {
    if (type == "image" || type == "music") {
      setPreviewModal(true);
    }
  };

  const getHeaderIcon = () => {
    if (type == "folder") {
      return <IconFolderFilled />;
    } else if (type == "image") {
      return <IconPhoto />;
    } else if (type == "music") {
      return <IconMusic />;
    } else if (type == "video") {
      return <IconVideo />;
    }
    return <></>;
  };

  return (
    <>
      <div>
        <div className="p-3 bg-primary-100 w-64 h-min" onClick={clickHandler}>
          <div className="header flex gap-3 items-center">
            <div className=" text-primary-400">{getHeaderIcon()}</div>
            <span>{name}</span>
            <Menu as="div" className="relative inline-block text-left ml-auto">
              <div onClick={(e) => e.stopPropagation()}>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-700">
                  <IconDotsVertical
                    className="-mr-1 ml-2 h-5 w-5 text-primary-700"
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
                <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {card_dropdown_options.map((opt) => (
                      <Menu.Item key={opt.id}>
                        <div
                          className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            opt.action();
                          }}
                        >
                          <span>{opt.icon}</span>
                          <span>{opt.name}</span>
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="w-full overflow-hidden mt-2 flex justify-center items-center h-[240px]">
            {type == "image" && <img src={testImg} className="w-full" />}
            {type == "video" && <IconPlayerPlay />}
            {type == "music" && <IconPlayerPlay />}
          </div>
        </div>
        {needs_approval ? (
          <div
            className="p-3 flex justify-center items-center gap-4 bg-white mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button>
              <IconCheck />
            </button>
            <button>
              <IconX />
            </button>
          </div>
        ) : null}
      </div>

      <Modal
        openModal={previewModal}
        setOpenModal={setPreviewModal}
        headerLabel=""
      >
        <div className="mb-4 flex gap-2">
          <button>
            <IconEdit />
          </button>
          <button>
            <IconTrash />
          </button>
        </div>
        <div className="">
          {type == "image" && <img src={testImg} className="w-full" />}
          {type == "music" && (
            <audio src={testAudio} controls className="w-full"></audio>
          )}
        </div>
      </Modal>
      {action == 2 && (
        <Modal
          headerLabel="Delete Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <DeleteModalTemp />
        </Modal>
      )}
      {action == 3 && (
        <Modal
          headerLabel="Move Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModalTemp
            initalStage={1}
            stageList={[
              {
                id: 1,
                name: "collection",
                query: "collection",
              },
              {
                id: 2,
                name: "journey",
                query: "journey",
              },
              {
                id: 3,
                name: "inside-journey",
              },
            ]}
            actionLabel={"Move here"}
            action={"move"}
          />
        </Modal>
      )}
      {action == 4 && (
        <Modal
          headerLabel="Copy Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModalTemp
            initalStage={1}
            stageList={[
              {
                id: 1,
                name: "collection",
                query: "collection",
              },
              {
                id: 2,
                name: "journey",
                query: "journey",
              },
              {
                id: 3,
                name: "inside-journey",
              },
            ]}
            actionLabel={"Copy here"}
            action={"copy"}
          />
        </Modal>
      )}
      {action == 5 && (
        <Modal
          headerLabel="Share Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ShareModalTemp />
        </Modal>
      )}
      {action == 6 && (
        <Modal
          headerLabel="Add Journal Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <AddJournalTemp />
        </Modal>
      )}
    </>
  );
};

export const Template = () => {
  const [openUploadModal, setUploadModal] = useState<boolean>(false);
  return (
    <>
      <div className="relative rounded-md overflow-hidden h-40 md:h-56 lg:h-auto max-h-96">
        <img
          src={dashboard_hero_img}
          alt=""
          className="h-40 md:h-56 max-w-none lg:h-auto lg:w-full"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <div className="search-bar w-full max-w-3xl px-4 md:px-10 lg:px-16">
            <div>
              <form
                action=""
                className="flex border-[1px] border-slate-400 bg-white rounded-sm"
              >
                <input
                  type="text"
                  placeholder="Search templates"
                  className="grow px-4 py-3 outline-none"
                />
                <button className="px-4 py-3">
                  <IconSearch />
                </button>
              </form>
            </div>
          </div>

          <div className="flex gap-4 justify-center items-center mt-16">
            <button className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500">
              <span className="text-sm lg:text-base font-medium">Events</span>
            </button>
            <button className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500">
              <span className="text-sm lg:text-base font-medium">Journey</span>
            </button>
            <button
              className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500"
              onClick={() => setUploadModal(true)}
            >
              <span className="text-sm lg:text-base font-medium">Upload</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 lg:px-16 ">
        <h2 className="text-xl py-10 md:text-3xl">All Collections</h2>
        <div className="breadcrumbs flex gap-4">
          <Link
            to="#"
            className="text-primary-400 underline-offset-4 hover:underline"
          >
            All Collection
          </Link>
          <Link
            to="#"
            className="text-primary-400 underline-offset-4 hover:underline"
          >
            Collection Name
          </Link>
          <Link
            to="#"
            className="text-primary-400 underline-offset-4 hover:underline"
          >
            Journey Name
          </Link>
        </div>
        <div className="all-cards mt-8 flex gap-4">
          <Card type="folder" name="journey" needs_approval={undefined} />
          <Card type="image" name="image.png" needs_approval={undefined} />
          <Card type="music" name="music.mp3" needs_approval={undefined} />
          <Card type="video" name="video.mp4" needs_approval={undefined} />
        </div>
      </div>

      {openUploadModal && (
        <Modal
          openModal={openUploadModal}
          setOpenModal={setUploadModal}
          headerLabel={"Upload Files"}
        >
          <UploadFlowModalTemp />
        </Modal>
      )}
    </>
  );
};
