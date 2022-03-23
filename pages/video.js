import { useSession, getSession } from "next-auth/react"
import ReactPlayer from 'react-player/file';

export async function getServerSideProps(context) {

  const location = context.query.loc;

  return {
    props: {
      location: location
    },
  }
}

export default function Home({ location }) {
    
    const { data: session } = useSession()

    if (session) {
        return (
            <div className='player-box w-auto h-auto mt-8 ml-8'>
                <ReactPlayer width='1280px' height='720px' controls url={ location } />
            </div>
        );
    } 
    return <a href='/api/auth/signin'>Signin to Continue</a>
}