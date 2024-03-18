import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="min-h-screen text-[--acc]">
      <h1 className="text-center text-7xl mt-10">Error 404</h1>
      <p className="text-center mt-10">Requested Page Doesn't exists.</p>
      <div className="flex justify-center mt-10">
        <button type="button" className="rounded btn btn-outline btn-ghost">
          <Link to="/">Go to Home</Link>
        </button>
      </div>
    </section>
  );
}
