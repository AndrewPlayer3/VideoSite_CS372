import Image from 'next/image';
import Link from 'next/link';
import def from '../public/placeholder.jpeg'


export default function Thumbnail({result}){
    return(
        <div className='block m-3 cursor-pointer'>
            {/* Each Video Thumbnail display/ Display default thumbnail if there is none in db */}
            <div className='relative'>
                <Link href={{pathname: '/video', query: {"loc": result['location']}}}>
                    <Image 
                        layouts='fill'
                        src={result['thumbnail']}
                        height={1080}
                        width={1920}
                    />
                </Link>
                <p className='absolute bottom-1 right-0 text-white text-xs bg-black'>{result['metadata'].length}</p>
            </div>
            <div>
                <p>{result['title']}</p>
            </div>
        </div>
    )
}