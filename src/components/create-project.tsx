import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useGetAllSizes } from "../hooks/collection/use-get-size";
import { useGetAllCollectionForUser } from "../hooks/collection/use-get-collection";
import Cookies from "js-cookie";
import { useCreateCollection } from "../hooks/collection/use-create-collection";
import toast from "react-hot-toast";
import { CreateProjectInputType, CreateProjectPropType, CreateProjectStepPropType } from "../types";

const SelectProjectTypeSection = ({ setProjData, setStep }: CreateProjectStepPropType) => {

    const selectProjectType = (t:string) => {
        setProjData((prev) => {
            const temp = {...prev}
            temp.projectType = t
            return temp
        })
        setStep(2)
    }

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg md:text-xl text-center font-medium leading-6 text-gray-900"
      >
        What do you want to create ?
      </Dialog.Title>
      <div className="flex gap-4 justify-center items-center mt-10  md:mt-16">
        <div onClick={() => selectProjectType("card")} className="w-40 h-40 bg-primary-100 rounded-sm flex justify-center items-center hover:shadow-md hover:cursor-pointer">
          {" "}
          <span>Card</span>{" "}
        </div>
        <div onClick={() => selectProjectType("slideshow")} className="w-40 h-40 bg-primary-100 rounded-sm flex justify-center items-center hover:shadow-md hover:cursor-pointer">
          {" "}
          <span>Slideshow</span>{" "}
        </div>
      </div>
    </>
  );
};


const SelectProjectSizeSection = ({ setProjData, setStep }:CreateProjectStepPropType) => {

    const {data, isLoading, isFetching} = useGetAllSizes()

    const selectProjectSize = (width, height) => {
        setProjData((prev) => {
            const temp = {...prev}
            temp.width = width
            temp.height = height
            return temp
        })
        setStep(3)
    }

    if (isLoading || isFetching) {
        return <>
            <span>Loading...</span>
        </>
    }

    
  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg md:text-xl text-center font-medium leading-6 text-gray-900"
      >
        Choose a Size
      </Dialog.Title>
      <div className="flex overflow-x-auto gap-4 items-center mt-10  md:mt-16">
        {data?.map((size) => (
            <div onClick={() => selectProjectSize(size.width, size.height)} style={{aspectRatio: `${size.width/size.height}`}} className="p-4 h-40 bg-primary-100 rounded-sm flex justify-center items-center hover:shadow-md hover:cursor-pointer">
            {" "}
            <span className="text-sm text-center">{size.label}</span>{" "}
          </div>
        ) )}
      </div>
    </>
  );
};

const SelectCollectionSection = ({ projData, setProjData }: CreateProjectStepPropType) => {

    const {data, isLoading, isFetching } = useGetAllCollectionForUser(Cookies.get('user') || '')
    const createCollectionHook = useCreateCollection()

    const selectThisCollection = (collectionId: number) => {
        setProjData((prev) => {
          const temp = {...prev}
          temp.collectionId = collectionId
          return temp
      })
    }

    const handleSubmitCreateCollection = (e) => {
        e.preventDefault();
        console.log(e.target.collection.value)
        createCollectionHook.mutate({collectionName: e.target.collection.value})
      }

      const createNewProject = () => {
        if(!projData.collectionId) {
          toast.error('Please select a collection.')
          return
        }
      }

    if (isLoading || isFetching) {
        return <>
            <span>Loading...</span>
        </>
    }

    
  return (
    <div className="md:px-10">
      <Dialog.Title
        as="h3"
        className="text-lg md:text-xl text-center font-medium leading-6 text-gray-900"
      >
        Choose a collection for your project
      </Dialog.Title>
      <form className="mt-6 md:mt-10 overflow-y-auto max-h-52">
        {data?.map((c) => (
            <div key={c.id} className="bg-primary-50 px-4 flex items-center gap-2 mb-4">
                <input type="radio" name="collection" id={`collection${c.id}`} onChange={(e) => selectThisCollection(c.id)} />
                <label htmlFor={`collection${c.id}`} className="grow h-full block text-sm md:text-base py-3 md:py-4">{c.name}</label>
            </div>
        ) )}
      </form>
      <form className="flex gap-4" onSubmit={handleSubmitCreateCollection}>
            <input type="text" placeholder="Enter new collection name" name="collection" className=" rounded-md py-2 px-3 outline-none focus:shadow grow border border-slate-200"/>
            <button type="submit" className="bg-primary-300 px-3 py-2 text-white rounded-md">Add</button>
      </form>
      <div className="flex justify-center mt-10">
        <button className="bg-primary-400 px-8 py-2 text-white rounded-md" onClick={createNewProject}>Create Project</button>
      </div>
    </div>
  );
};

export const CreateProject = ({
  displayCreateProject,
  setDisplayCreateProject,
}:CreateProjectPropType) => {
  const [step, setStep] = useState<number>(1);
  const [projData, setProjData] = useState<CreateProjectInputType>({
    collectionId: null,
    height: null,
    name: "Untitled",
    projectType: null,
    width: null,
  });

  const closeProjectModal = () => {
    setStep(1)
    setProjData({
        collectionId: null,
        height: null,
        name: "Untitled",
        projectType: null,
        width: null,
      })
    setDisplayCreateProject(false)
  }
  
  return (
    <Transition appear show={displayCreateProject} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => closeProjectModal()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="py-12 md:py-20 px-5 w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                {step == 1 ? (
                  <SelectProjectTypeSection projData={projData} setProjData={setProjData} setStep={setStep} />
                ) : null}
                {step == 2 ? (
                  <SelectProjectSizeSection projData={projData} setProjData={setProjData} setStep={setStep} />
                ) : null}
                {step == 3 ? (
                  <SelectCollectionSection projData={projData} setProjData={setProjData} setStep={setStep} />
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
