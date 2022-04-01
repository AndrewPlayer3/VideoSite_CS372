import { UserIcon, VideoCameraIcon, PresentationChartLineIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import Sidebar from "../components/common/Sidebar/Sidebar";
import Layout  from "../components/Layout.js"
import Profile from './profile'

export async function getServerSideProps(context) {

    const { data: session, status } = getSession()

    const res = await fetch('http://localhost:3000/api/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            cookie: context.req.headers.cookie,
        },
    });

    const data = await res.json();

    if(data.username === ''){
        return {
            redirect: {
              destination: '/login',
              permanent: false,
            },
          }
    }
    
    {/* Role Guard */}
    if(!(data.role.content_editor || data.role.content_manager)){
        return {
            redirect: {
              destination: '/profile',
              permanent: false,
            },
          }
    }
    
    const user = {
        username: data.username,
        email: data.email,
        role: data.role
    }
    return {
        props: {
            user: user
        },
    }
}

export default function Dashboard({children,user}) {
    return( 
        <div className="flex flex-col items-center justify-center md:flex-row">
            <div className="relative">
                <Sidebar />
            </div>
            <div id="myTabContent" className="absolute w-2/4 h-2/4 left-1/4 top-1/5 flex-1">
                <Profile user={user} />
            </div>
        </div>
    )
}

Dashboard.layout = Layout