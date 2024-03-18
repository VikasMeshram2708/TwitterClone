import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <section className="min-h-screen">
      <Carousel />

      <div className="flex justify-center mt-10">
        <button type="button" className="btn btn-outline btn-base rounded-full">
          <Link to="/tweets">Get Started</Link>
        </button>
      </div>
    </section>
  );
}
