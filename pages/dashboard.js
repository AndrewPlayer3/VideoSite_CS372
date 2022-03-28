import { UserIcon, VideoCameraIcon, PresentationChartLineIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import profile from './profile'

function handleClick(index, e){
    console.log(e)
}

export default function Dashboard() {
    return( 
        <div className="flex flex-col md:flex-row">
              <nav>
                <div className="bg-gray-500 shadow-xl h-16 fixed bottom-0 md:relative md:h-screen md:w-48 w-full">
                    <div className="content-center text-left justify-between md:w-48 md:mt-12 md:fixed md:left-0 md:top-0 md:content-start">
                        <ul className= "list-reset flex flex-row pt-3 text-center md:flex-col md:py-3 md:px-2 md:text-left">
                        <li className="m-8 flex-1">
                            Hello, name
                        </li>
                        <li className="mb-4 flex-1">
                            <a href="#" onClick={profile} className="flex items-center w-full  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"> 
                                <UserIcon className="h-6 w-6" aria-hidden="true"/>
                                <span className="pb-1 ml-3 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                                    Profile
                                </span>
                            </a>
                        </li>
                        <li className="mb-4 flex-1">
                            <a href="#" onClick={handleClick('content')} className="flex items-center w-full py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                <VideoCameraIcon className="h-6 w-6" aria-hidden="true"/>
                                <span className="pb-1 ml-3 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                                    Content
                                 </span>
                            </a>
                        </li>
                        <li className="mb-4 flex-1">
                            <a href="/dashboard/analytics" className="flex items-center w-full  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-black border-b-2 border-gray-800 hover:border-purple-500">
                                <PresentationChartLineIcon className="h-6 w-6" aria-hidden="true"/>
                                <span className="pb-1 ml-3 md:pb-0 text-xs md:text-base block md:inline-block">
                                    Analytics
                                </span>
                            </a>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="flex-1 pb-24 h-screen w-screen">
            </div>
        </div>
    )
}