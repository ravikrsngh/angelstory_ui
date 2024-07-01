export default function EventsSetupPage() {
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-2xl mt-10 mb-5">
        Congratulations your event is created.
      </h4>
      <span className="text-sm">
        Let’s get started by setting up your event.
      </span>

      <div className="w-full max-w-[500px] p-5 border border-slate-300 rounded-md mt-10">
        <span className="block text-center">STEP 1/3</span>
        <div className="mt-4">
          <label htmlFor="" className="block mb-2 text-primary-400 text-sm">
            Date
          </label>
          <input
            type="date"
            className="w-full py-2 px-4 border border-slate-200"
          />
        </div>
      </div>
    </div>
  );
}
