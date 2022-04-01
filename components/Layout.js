import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    return(
        <div className='flex h-screen max-w-screen w-screen'> 
            <div className="fixed top-0 w-screen drop-shadow-lg z-40">
                <NavBar liveSearch = { true } />
            </div>
            <div className='mb-16 mt-14'>
                <main>{children}</main>
            </div>
            <div className="fixed bottom-0">
                <Footer />
            </div>
        </div>
    )
}