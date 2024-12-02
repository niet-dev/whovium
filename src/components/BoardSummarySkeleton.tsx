const BoardSummarySkeleton = () => (
  <div className="w-[300px] mx-auto border rounded-lg shadow-2xl md:w-9/12 md:h-[300px] md:flex md:max-w-4xl animate-pulse">
    <section className="relative h-[300px] w-[300px] bg-gray-300 md:flex-none"></section>
    <section className="p-6 md:px-8 flex flex-col justify-around gap-4 w-full">
      <div className="space-y-2">
        <div className="w-4/12 h-8 rounded bg-gray-300"></div>
        <div className="w-6/12 h-6 rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-6 rounded bg-gray-300"></div>
        <div className="w-full h-6 rounded bg-gray-300"></div>
      </div>
      <div className="flex justify-end">
        <div className="h-12 rounded-full bg-gray-300 align-right w-32 py-2 px-4"></div>
      </div>
    </section>
  </div>
);

export default BoardSummarySkeleton;
