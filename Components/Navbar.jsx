import Image from "next/image";
import Link from "next/link";
import SignInOut from "./auth/SigninOut";

const Navbar = () => {
  return (
    <nav className="bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4 px-6">
        <div className="nav-brand  ">
          <Link href="/" className="flex items-center">
            <Image
              src="/events/logo .png"
              alt="Eventry"
              width={120}
              height={40}
              className="h-20 w-auto object-contain"
            />
          </Link>
        </div>

        <ul className="flex items-center gap-8 text-[#9C9C9C] text-sm font-medium">
         
          <li className="relative group cursor-pointer transition-colors duration-300 hover:text-white">
            About
            <span className="absolute left-1/2 -bottom-1 h-[1.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
          </li>
          <li className="relative group cursor-pointer transition-colors duration-300 hover:text-white">
            Contact Us
            <span className="absolute left-1/2 -bottom-1 h-[1.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
       
          </li>
                <li>
            <SignInOut />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;