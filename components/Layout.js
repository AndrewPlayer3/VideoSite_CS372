import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children}){
    return(
        <>
            <NavBar />
            <div>
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}