import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserSchema, UserSchemaType } from "../Schemas/UserSchema";
import { ZodError } from "zod";
import toast from "react-hot-toast";
const BASE_URI = import.meta.env.VITE_PUBLIC_SERVER_URL;

export default function Login() {

  console.log('uri', BASE_URI)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>();

  

  const handleLoginForm: SubmitHandler<UserSchemaType> = async (data) => {
    try {
      UserSchema.parse(data);
      console.log("data", data);
      // const respnose = await fetch(`${BASE_URI}/api/login`)
      return new Promise((resolve) => {
        toast.success("User Logged In successfully.");
        resolve(data);
      });
    } catch (e) {
      const err = e as Error;
      if (e instanceof ZodError) {
        return toast.error(e?.errors[0]?.message);
      }
      return toast.error(err?.message);
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLoginForm)}
        className="w-full max-w-md p-8 rounded-lg shadow-lg border-2 border-[--acc]"
      >
        <h1 className="text-center text-lg sm:text-[2rem] mb-10">Login</h1>
        <div className="mb-6">
          <label htmlFor="email" className="block text-aqua font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full px-3 py-2 input input-bordered rounded-md bg-black/30 text-aqua focus:outline-none focus:ring-2 focus:ring-aqua"
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email && (
            <p className="text-red-500 text-[1.2rem] font-semibold">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-aqua font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-3 py-2 rounded-md input input-bordered bg-black/30 text-aqua focus:outline-none focus:ring-2 focus:ring-aqua"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password && (
            <p className="text-red-500 text-[1.2rem] font-semibold">
              {errors?.password?.message}
            </p>
          )}
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
