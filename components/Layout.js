import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    return(
        <div className='flex-row bg-[#EFF1F3]'>
            <NavBar />
            <div className='h-screen w-auto'>
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    )
}