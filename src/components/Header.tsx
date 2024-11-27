import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-[200px] bg-slate-500 rounded h-screen flex justify-start gap-10 flex-col pl-5 items-start">
      <div>
        <img src="/logofan.png" alt="logo" className=" w-[80%]  py-3 " />
      </div>
      <div>
        <ul>
          <li>
            <Link
              to="/books"
              className="text-yellow-300 text-[20px] bg-amber-700 py-3 px-5 rounded-md"
            >
              Books
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
