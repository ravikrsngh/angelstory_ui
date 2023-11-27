// import { Tab } from "@headlessui/react"
// import { IconCloudUpload, IconTexture, IconCategory2, IconLetterT, IconLayersSubtract, IconTemplate, IconSlideshow } from "@tabler/icons-react"
// import BackgroundPanel from "../../pages/design/background-panel"
// import LayersPanel from "../../pages/design/layers"
// import ShapesPanel from "../../pages/design/shapes-panel"
// import { TemplatePanel } from "../../pages/design/templates-panel"
// import TextPanel from "../../pages/design/text"
// import UploadToolPanel from "../../pages/design/upload-tool"
// import EditPanel from "../edit-panel"
// import { ToolBarButton } from "./toolbar-btn"

// export const SideNav = () => {
//     return (
//         <Tab.Group
//             className="sidebars shadow-md hidden lg:flex"
//             as={"div"}
//             selectedIndex={currentIndex}
//             onChange={updateTabIndexes}
//           >
//             <Tab.List className="toolbar flex flex-col gap-10 h-full bg-white p-4 w-20 py-10">
//               <Tab className="outline-none">
//                 <ToolBarButton
//                   key="upload"
//                   icon={<IconCloudUpload color="rgb(30 83 134)" size={26} />}
//                   label="Upload"
//                 />
//               </Tab>
//               <Tab className="outline-none">
//                 <ToolBarButton
//                   key="background"
//                   icon={<IconTexture color="rgb(30 83 134)" size={26} />}
//                   label="Background"
//                 />
//               </Tab>
//               <Tab className="outline-none">
//                 <ToolBarButton
//                   key="shapes"
//                   icon={<IconCategory2 color="rgb(30 83 134)" size={26} />}
//                   label="Shapes"
//                 />
//               </Tab>
//               <Tab className="outline-none">
//                 <ToolBarButton
//                   key="text"
//                   icon={<IconLetterT color="rgb(30 83 134)" size={26} />}
//                   label="Text"
//                 />
//               </Tab>
//               <Tab className="outline-none">
//                 <ToolBarButton
//                   key="layers"
//                   icon={<IconLayersSubtract color="rgb(30 83 134)" size={26} />}
//                   label="Layers"
//                 />
//               </Tab>
//               <Tab className="outline-none">
//                 <ToolBarButton
//                   key="templates"
//                   icon={<IconTemplate color="rgb(30 83 134)" size={26} />}
//                   label="Templates"
//                 />
//               </Tab>
//               <div onClick={() => setSlideShowMode(true)}>
//                 <ToolBarButton
//                   key="slideshow"
//                   icon={<IconSlideshow color="rgb(30 83 134)" size={26} />}
//                   label="Slideshow"
//                 />
//               </div>
//               <Tab className="outline-none"></Tab>
//             </Tab.List>
//             <Tab.Panels className="w-72 border-l border-slate-200 bg-white">
//               <Tab.Panel className="w-full h-full overflow-auto">
//                 <UploadToolPanel addImage={addImage} />
//               </Tab.Panel>
//               <Tab.Panel className="w-full h-full overflow-auto">
//                 <BackgroundPanel />
//               </Tab.Panel>
//               <Tab.Panel className="w-full h-full overflow-auto">
//                 <ShapesPanel />
//               </Tab.Panel>
//               <Tab.Panel className="w-full h-full overflow-auto">
//                 <TextPanel />
//               </Tab.Panel>
//               <Tab.Panel className="w-full h-full overflow-auto">
//                 <LayersPanel />
//               </Tab.Panel>
//               <Tab.Panel className="w-full h-full overflow-auto">
//                 <TemplatePanel />
//               </Tab.Panel>
//               <Tab.Panel className="w-full h-full overflow-auto">
//                 <EditPanel object={fabricRef.current?._activeObject} />
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab.Group>
//     )
// }