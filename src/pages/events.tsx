import { Link } from "react-router-dom";

function EventsPage() {
  const all_events = [1];
  return (
    <div>
      {all_events.length == 0 ? (
        <div className="w-full pt-[200px] flex items-center justify-center flex-col gap-4">
          <p>You dont have any events</p>
          <Link
            to={""}
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
              to={""}
              className="bg-primary-400 text-white px-5 py-3 text-center"
            >
              Create Event
            </Link>
          </div>
          <div className="event-card bg-primary-100 p-4">
            <div className="flex justify-between">
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
