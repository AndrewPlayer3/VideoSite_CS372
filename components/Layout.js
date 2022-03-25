import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    let login = (children.type.name === "SignIn") || (children.type.name === "SignUp")
    if(!login){
        return(
            <>
                <NavBar user={pageProps}/>
                <div className='min-h-screen bg-[#EFF1F3]'>
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