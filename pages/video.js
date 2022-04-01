import { useSession, getSession } from "next-auth/react"
import { title } from "process";
import ReactPlayer from 'react-player/file';
import LoginForm from "../components/LoginForm";
import Rating from '../components/Rating'
import Navbar from '../components/common/Navbar'

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
            <div className="max-h-screen h-screen max-w-screen w-screen">
                <div className='flex-col'>
                    <Navbar />
                </div>
                <div className="flex items-center justify-center">
                    <div className='player-box w-max h-max mt-4'>
                        <ReactPlayer width='100%' height='100%' controls url={location} />
                        <div className='relative mt-4 w-full h-auto rounded-lg shadow-2xl border border-opacity-10 border-[#EEF1F3]'>
                            <div className='flex h-auto w-auto title-and-rating mt-4'>
                                <div className='flex ml-4 mr-4 w-full items-start justify-start'>
                                    <h1 className='text-lg font-bold text-white'> { title } </h1>
                                </div>
                                <div className='flex mr-4 mr-4 w-full items-start justify-end'>
                                    <Rating video_id={id} />
                                </div>
                            </div>
                            <div className="mb-8">
                                <h1 className='text-[#EFF1F3] text-md ml-4 mr-4 mt-4'>{description}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-auto w-auto mt-10 flex item-center justify-center">
            <LoginForm />
        </div>
    )
}