import { useSession, getSession } from "next-auth/react"
import { title } from "process";
import ReactPlayer from 'react-player/file';
import LoginForm from "../components/LoginForm";
import Rating from '../components/Rating'

export async function getServerSideProps(context) {

    const id = context.query.id;

    const res = await fetch('http://localhost:3000/api/video?id='+id, {
            method: 'GET'
        }
    )

    const data = await res.json()


    const rating = Math.round(data.analytics.total_rating / data.analytics.num_ratings)
    console.log(rating)

    return {
        props: {
            id: id,
            title: data.title,
            location: data.location,
            description: data.description,
            rating: rating
        },
    }
}

export default function Home({ title, location, description, id, rating }) {

    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <div className='flex items-top justify-top video w-auto h-full mt-8 ml-8'>
                    <div className='flex player-box shadow-2xl border border-opacity-10 border-[#EFF1F3]'>
                        <ReactPlayer width='1280px' height='720px' controls url={location} />
                    </div>
                    <div className='w-full ml-8 mr-8 bg-[#223843] rounded-sm shadow-2xl border border-opacity-10 border-[#EEF1F3]'>
                        <div className='flex ml-4 mt-4 h-auto w-full title-and-rating'>
                            <div className='flex w-full items-start justify-start'>
                                <h1 className='flex text-2xl text-white'> { title } </h1>
                            </div>
                            <div className='flex mr-8 w-full items-start justify-end'>
                                <Rating video_id={id} />
                            </div>
                        </div>
                        <div>
                            <h1 className='text-[#EFF1F3] text-xl ml-4 mr-4 mt-4'>{description}</h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="h-auto w-auto mt-10 flex item-center justify-center">
            <LoginForm />
        </div>
    )
}