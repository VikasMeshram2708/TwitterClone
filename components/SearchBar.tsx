import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <section>
      <form className="bg-gray-800 rounded-full flex items-center p-3">
        <p>
          <Search size={18} />
        </p>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 flex-grow"
        />
      </form>
    </section>
  );
}
