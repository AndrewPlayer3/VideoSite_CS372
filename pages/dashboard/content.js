import Sidebar from "../../components/common/Sidebar/Sidebar";
import Layout  from "../../components/Layout.js"
import UploadForm from "../../components/UploadForm"
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
    console.log("Videos: ", videos);
    return (
        <>
            <div className="flex flex-col h-screen overflow-clip md:flex-row">
                <Sidebar />
                <div className="flex flex-col items-center pb-24 h-screen w-screen">
                    <div className="">
                        <UploadForm />
                    </div>
                    {videos != undefined ? 
                    <div class="block h-2/4 w-full">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full">
                                <thead class="border-b">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Video
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Views
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Rating
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Date
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {videos.map((videos) => (
                                        <tr class="border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                VIDEO WITH THUMNBAIL/LENGTH/DESCRIPTION/TITLE WILL BE HERE
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Views
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                TotalRating
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Upload Date
                                            </td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                    : <h1 className="text-2xl">No videos to display.</h1>}
                </div>
            </div>
        </>
    )
}

Content.layout = Layout