import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    return(
        <div className='flex flex-col h-screen'> 
            <div className="relative drop-shadow-lg z-10">
                <NavBar />
            </div>
            <div className="flex-grow">
                <main>{children}</main>
            </div>
            <div className=" ">
                <Footer />
            </div>
        </div>
    )
}