
<<<<<<< HEAD
import NavBar from '../components/navbar.js'
import Footer from '../components/common/Footer'
import { useSession, getSession } from "next-auth/react"
import ReactPlayer from 'react-player/file';

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default function Home() {
    
    const { data: session, status } = useSession()

    console.log(JSON.stringify(session));

    if (session) {
        return (
            <div>
                <NavBar />
                <div className='player-box'>
                    <ReactPlayer controls url='chickens.mp4' />
                </div>
                <Footer />
            </div>
        );
    } 
    return <a href='/api/auth/signin'>Signin to Continue</a>
=======
import HomePage from '../components/navbar.js'

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  )
>>>>>>> 9aa08a2ae42a42ef43c8feb94b923dfefd416d37
}
