import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <div className="w-full bg-black z-40 px-4">
      <div className="flex justify-center items-center max-w-screen-xl mx-auto py-2">
        <div className="text-white flex items-center gap-2 text-xs md:text-sm">
          <span>Free shipping on all orders over ₹999!</span>
          <Link to="/allProducts">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-semibold underline hover:text-blue-400 transition-colors duration-200"
            >
              Shop now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
