import Sidebar from "../../components/common/Sidebar/Sidebar";
import Layout  from "../../components/Layout.js"

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
            <div className="flex flex-col overflow-clip md:flex-row">
                <Sidebar />
                <div className="flex flex-col items-center pb-24 h-screen w-screen">
                    <div className="block h-2/4 w-1/2">
                        <div className="m-4">
                            <label className="inline-block mb-2 text-gray-500">Upload
                                Video</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd" />
                                        </svg>
                                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Select a video</p>
                                    </div>
                                    <input type="file" className="opacity-0" />
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center p-2 space-x-4">
                            <button className="px-4 py-2 text-white bg-red-500 rounded shadow-xl">Cannel</button>
                            <button className="px-4 py-2 text-white bg-green-500 rounded shadow-xl">Upload</button>
                        </div>
                    </div>
                    {videos == undefined ? 
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