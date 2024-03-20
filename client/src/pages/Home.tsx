import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Home() {
  const UserId = localStorage.getItem("userId");
  console.log("home-page-id", UserId);
  return (
    <section className="min-h-screen">
      <Carousel />

      <div className="flex justify-center mt-10">
        {UserId && (
          <button
            type="button"
            className="btn btn-outline btn-base rounded-full"
          >
            <Link to="/tweets">Go To Tweets Page</Link>
          </button>
        )}
        {!UserId && (
          <button
            type="button"
            className="btn btn-outline btn-base rounded-full"
          >
            <Link to="/tweets">Get Started</Link>
          </button>
        )}
      </div>
    </section>
  );
}
