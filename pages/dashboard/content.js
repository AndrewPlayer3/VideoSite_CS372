import Sidebar from "../../components/common/Sidebar/Sidebar";
import Layout  from "../../components/Layout.js"
import UploadForm from "../../components/UploadForm"
import Image from 'next/image';
import { ModalWrap } from "react"

export async function getServerSideProps(context) {

    let url = "http://localhost:3000/api/video";
    
    if (context.query.title) {
        url += "?text_query=" + context.query.title;
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    return {
        props: {
            videos: data
        },
    }
}

export default function Content({videos}) {

    function fancyTimeFormat(duration)
    {   
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    return (
        <>
            <div className="flex flex-col h-full md:flex-row">
                <Sidebar />
                <div className="flex flex-col items-center h-auto w-screen">
                    <div className="m-5">
                        <UploadForm />
                    </div>
                    {videos.length !== 0 ? 
                            <div className="relative w-5/6 bg-slate-200 my-16 overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full  divide-y divide-slate-700 text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead>
                                    <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Video
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Views
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Rating
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Date
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Delete forever
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {videos.map((video, i) => (
                                        <tr key={video._id} >
                                            <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap">
                                                {i+1}
                                            </td>
                                            <td className="text-sm max-w-xs text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                                <div className="flex justify-between items-start">
                                                    <div className="relative w-1/3">
                                                        <Image 
                                                            layouts='fill'
                                                            src={video.thumbnail}
                                                            height='1080'
                                                            width='1920'
                                                            className="rounded-md"
                                                        />
                                                        <div className='absolute bottom-1 right-0'>
                                                            <p className='w-full text-xs bg-black font-bold text-[#C8C8C8]'>{fancyTimeFormat(video.metadata.length)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-2/3 ml-1 pl-2">
                                                        <h3 className="font-medium text-black">{video.title}</h3>
                                                        <p className="text-ellipsis overflow-hidden">{video.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                                                {video.analytics.views}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                                            {video.analytics.total_rating/video.analytics.num_ratings}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap ">
                                            {video.created_at.substring(0, 10)}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                                                <a href="#" className="flex items-center text-red-600  hover:underline">
                                                <svg xmlns="http://www.w3.org/2000/svg" key={video._id} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> </svg>
                                                    <span>Delete</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                                </table>
                    </div>
                    : <h1 className="mt-12 text-2xl">No videos to display.</h1>}
                </div>
            </div>
        </>
    )
}

Content.layout = Layout