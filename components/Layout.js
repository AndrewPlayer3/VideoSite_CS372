import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    return(
        <div className='flex-col h-screen bg-[#EFF1F3]'>
            <div className="drop-shadow-lg">
                <NavBar />
            </div>
            <div className='flex-shrink-0 h-max bg-[#EFF1F3]'>
                <main>{children}</main>
            </div>
            <div className="absolute bottom-0">
                <Footer />
            </div>
        </div>
    )
}