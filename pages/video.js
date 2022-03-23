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

    if (session) {
        return (
            <div className='player-box w-auto h-auto'>
                <ReactPlayer width='100%' height='100%' controls url='chickens.mp4' />
            </div>
        );
    } 
    return <a href='/api/auth/signin'>Signin to Continue</a>
}