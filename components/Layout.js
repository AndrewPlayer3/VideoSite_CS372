import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"

export default function Layout({children, pageProps}){
    let login = (children.type.name === "SignIn") || (children.type.name === "SignUp")
    if(!login){
        return(
            <div className='flex-row bg-[#EFF1F3]'>
                <NavBar user={pageProps}/>
                <div className='h-screen w-auto'>
                    <main>{children}</main>
                </div>
                <Footer />
            </div>
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