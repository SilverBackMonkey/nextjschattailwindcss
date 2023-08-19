import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import "../styles/globals.css";
import AuthContext from "./AuthContext";
import Header from "./Header";
import { isAuthenticated } from "./lib/RegistEmail";


export const metadata = {
  title: "AllFreeChips",
  description:
    "AllFreeChips is the biggest community with over 30,038+ active members bringing the best online casino bonuses. Latest casino bonus codes of 2022",
  icons: ["/favicon.ico"],
  keywords:
    "Online Casino Guide, 2022 online casinos, Online Casinos, casino bonus codes, Casino Guide, Casino Reviews",
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body >
      <div className="leading-normal tracking-normal text-white " style={{fontFamily: "'Source Sans Pro', sans-serif", background: "linear-gradient(90deg, #170893 0%, #b23eeb 100%)"}}>

        <AuthContext>
          <Header isAuthenticated={isAuthenticated}/>
          {children}
        </AuthContext>
        <Footer />
        </div>
      </body>
    </html>
  );
}
