export default function Tweets() {
  return (
    <section className="min-h-screen">
      <h1 className="text-center text-4xl mt-10">Tweet</h1>

      <form className="max-w-xl mx-auto form-control grid gap-3 mt-10">
        <input
          type="text"
          placeholder="Enter your Tweet"
          className="p-3 outline-none rounded border-[--acc] border-2"
        />
        <div>
          <button type="submit" className="rounded-md px-4 py-2 bg-[--acc] text-black font-semibold">
            Tweet
          </button>
        </div>
      </form>
    </section>
  );
}
