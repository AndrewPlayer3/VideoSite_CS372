import { useSession, getSession } from "next-auth/react"
import ReactPlayer from 'react-player/file';

export default function Video({ result }) {
    return (
        <div className='player-box w-auto h-auto'>
            <ReactPlayer width='100%' height='100%' controls url='chickens.mp4' />
        </div>
    );
}