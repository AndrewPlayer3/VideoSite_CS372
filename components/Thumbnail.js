import Image from 'next/image';
import def from '../public/placeholder.jpeg'

export default function Thumbnail({result}){
    return(
        <div className='group cursor-pointer mx-6'>
            {/* Each Video Thumbnail display/ Display default thumbnail if there is none in db */}
            <div className='relative'>
                <Image 
                    layouts='fill'
                    src={def}
                    height={1080}
                    width={1920}
                />
                <p className='absolute bottom-1 right-0 text-white text-xs bg-black'>{result['metadata'].length}</p>
            </div>
            <div>
                <p>{result['title']}</p>
            </div>
        </div>
    )
}