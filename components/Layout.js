import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    let login = (children.type.name === "profile") || (children.type.name === "SignUp")
    if(!login){
        return(
            <>
                <NavBar user={pageProps}/>
                <div>
                    <main>{children}</main>
                </div>
                <Footer />
            </>
        )
    }
    else{
        return(
        <>
            <div>
                <main>{children}</main>
            </div>
        </>
        )
    }
}