export default function BoardSummarySkeleton() {
  return (
    <div className="mx-auto w-[300px] animate-pulse rounded-lg border shadow-2xl md:flex md:h-[300px] md:w-9/12 md:max-w-4xl">
      <section className="relative h-[300px] w-[300px] bg-gray-300 md:flex-none"></section>
      <section className="flex w-full flex-col justify-around gap-4 p-6 md:px-8">
        <div className="space-y-2">
          <div className="h-8 w-4/12 rounded bg-gray-300"></div>
          <div className="h-6 w-6/12 rounded bg-gray-300"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-full rounded bg-gray-300"></div>
          <div className="h-6 w-full rounded bg-gray-300"></div>
        </div>
        <div className="flex justify-end">
          <div className="align-right h-12 w-32 rounded-full bg-gray-300 px-4 py-2"></div>
        </div>
      </section>
    </div>
  );
}
