import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    return(
        <div className='flex-col h-screen bg-[#EFF1F3]'>
            <div className="relative drop-shadow-lg z-10">
                <NavBar />
            </div>
            <div className='bg-[#EFF1F3] mb-16'>
                <main>{children}</main>
            </div>
            <div className="fixed bottom-0">
                <Footer />
            </div>
        </div>
    )
}