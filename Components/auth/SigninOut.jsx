'use client'
import Link from "next/link";
import { useAuth } from "../../app/hooks/useAuth"
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInOut = () => {
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        setAuth(null);
        router.push('/login')
    }

    return (
        <div>
            {
                auth ? (
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-1 text-[#9C9C9C] hover:text-white transition-colors duration-300 focus:outline-none"
                        >
                            Hello, {auth?.name}
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg py-2 z-50">
                                <a
                                    onClick={logout}
                                    className="block px-4 py-2 text-sm text-white hover:bg-neutral-800 cursor-pointer"
                                >
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/login">Login</Link>
                )
            }
        </div>
    )
}

export default SignInOut