function BuyEventsPage() {
  return (
    <div className="py-10 px-4 md:px-10 lg:px-16">
      <h4 className="text-base font-medium mb-6 md:text-lg flex justify-between items-center">
        Buy Events Package
      </h4>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-primary-100 min-h-[300px] p-5 flex flex-col">
          <h6>Title</h6>
          <p>
            Start by creating a new Vite project if you dont have one set up
            already. The most common approach is to use Create Vite.
          </p>
          <div className="mt-auto flex justify-between">
            <p>
              $300 <span className="text-xs">monthly</span>
            </p>
            <button>Buy now</button>
          </div>
        </div>
        <div className="bg-primary-100 min-h-[300px]"></div>
        <div className="bg-primary-100 min-h-[300px]"></div>
        <div className="bg-primary-100 min-h-[300px]"></div>
        <div className="bg-primary-100 min-h-[300px]"></div>
      </div>
    </div>
  );
}

export default BuyEventsPage;
