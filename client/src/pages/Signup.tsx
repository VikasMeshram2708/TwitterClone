import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { UseUserContext } from "../context/UserState";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";

export default function SignUp() {
  const [toggleEye, setToggleEye] = useState(false);

  const { SignUpFunction } = UseUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await SignUpFunction({ name, email, password });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md p-8 rounded-lg shadow-lg border-2 border-[--acc]"
      >
        <h1 className="text-center text-lg sm:text-[2rem] mb-10">Sign Up</h1>
        <div className="mb-6">
          <label htmlFor="name" className="block text-aqua font-bold mb-2">
            Name
          </label>
          <input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            type="text"
            placeholder="Enter Name"
            className="w-full px-3 py-2 input input-bordered rounded-md bg-black/30 text-aqua focus:outline-none focus:ring-2 focus:ring-aqua"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-aqua font-bold mb-2">
            Email
          </label>
          <input
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type="email"
            placeholder="Enter Email"
            className="w-full px-3 py-2 input input-bordered rounded-md bg-black/30 text-aqua focus:outline-none focus:ring-2 focus:ring-aqua"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-aqua font-bold mb-2">
            Password
          </label>
          <input
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type={toggleEye ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full px-3 py-2 rounded-md input input-bordered bg-black/30 text-aqua focus:outline-none focus:ring-2 focus:ring-aqua"
          />
          {toggleEye && (
            <IoEye
              onClick={() => setToggleEye((prev) => !prev)}
              className="absolute right-3 bottom-4 cursor-pointer"
              size={20}
            />
          )}
          {!toggleEye && (
            <FaEyeSlash
              onClick={() => setToggleEye((prev) => !prev)}
              className="absolute right-3 bottom-4 cursor-pointer"
              size={20}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-aqua border-2 border-[--acc] font-bold py-2 px-4 rounded-md hover:bg-[--acc]  transition hover:text-black"
          >
            Sign Up
          </button>
          <p className="text-aqua">
            Already a User ?{" "}
            <span>
              <Link to="/login" className="text-aqua underline">
                Login
              </Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
