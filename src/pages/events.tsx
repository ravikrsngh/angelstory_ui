import { Link } from "react-router-dom";

function EventsPage() {
  const all_events = [1];
  return (
    <div>
      {all_events.length == 0 ? (
        <div className="w-full pt-[200px] flex items-center justify-center flex-col gap-4">
          <p>You dont have any events</p>
          <Link
            to={"/events-package"}
            className="bg-primary-400 text-white px-5 py-3 text-center"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="py-10 px-4 md:px-10 lg:px-16">
          <div className="events-page-header flex justify-between items-center">
            <h4 className="text-base font-medium mb-6 md:text-lg flex justify-between items-center">
              All Events
            </h4>
            <Link
              to={"/events-package"}
              className="bg-primary-400 text-white px-5 py-3 text-center"
            >
              Create Event
            </Link>
          </div>
          <br />
          <div className="event-card bg-primary-100 p-4 rounded-md hover:shadow-md">
            <div className="event-card-header flex justify-between">
              <div className="">
                <div className="flex justify-between items-center gap-10">
                  <h3 className="text-2xl">Event Title</h3>
                  <div className="text-xs">
                    <span className="bg-primary-700 text-white py-2 px-4 rounded-md mr-2">
                      Basic
                    </span>
                    <Link to={""}>Upgrade</Link>
                  </div>
                </div>
                <div className="text-sm mt-2 flex flex-col gap-1">
                  <span>3 Folders</span>
                  <span>28/150 files</span>
                </div>
              </div>
              <div>
                <span>10th March, 2024</span>
              </div>
            </div>
            <div className="flex justify-end items-end gap-2 text-sm">
              <button className="bg-primary-400 py-2 px-4 text-white rounded-full">
                Magic Link
              </button>
              <div className="flex flex-col items-center">
                <span>PIN:1234</span>
                <button className="bg-primary-400 py-2 px-4 text-white rounded-full">
                  Protected Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
