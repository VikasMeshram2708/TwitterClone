import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <form className="w-full max-w-md p-8 rounded-lg shadow-lg border-2 border-[--acc]">
        <h1 className="text-center text-lg sm:text-[2rem] mb-10">Login</h1>
        <div className="mb-6">
          <label htmlFor="email" className="block text-aqua font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full px-3 py-2 input input-bordered rounded-md bg-black/30 text-aqua focus:outline-none focus:ring-2 focus:ring-aqua"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-aqua font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-3 py-2 rounded-md input input-bordered bg-black/30 text-aqua focus:outline-none focus:ring-2 focus:ring-aqua"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-aqua border-2 border-[--acc] font-bold py-2 px-4 rounded-md hover:bg-[--acc]  transition hover:text-black"
          >
            Login
          </button>
          <p className="text-aqua">
            Not a User ?{" "}
            <span>
              <Link to="/signup" className="text-aqua underline">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
