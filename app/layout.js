import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/Navbar";
import  AuthProvider  from "./providers/AuthProvider";
import { dbConnect } from "..//services/mongo";
import { Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Eventry - Home",
  description: "A single entry to connected to all the online events from the globe.",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="py-8">
            {children}
              <Toaster position="top-center" richColors />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}