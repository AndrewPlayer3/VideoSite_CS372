
import testuser from '../pages/api/testuser.json'
import { PencilIcon } from '@heroicons/react/solid'

{/* Get info from login session */}
export default function profile(){
    return(
        <div className='container flex h-auto content-center'>
            <div className="mx-auto my-16 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{testuser[0]['username']}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{testuser[0]['email']}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{testuser[0]['role']['viewer']}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Password</dt>
                    <dd className="flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ************
                        <PencilIcon className="flex-shrink-0 ml-16 h-5 w-5 text-gray-600" aria-hidden="true" />
                    </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Your Stats</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Maybe we will store user watchtime, history, liked/disliked and so on.
                    </dd>
                </div>
                </dl>
            </div>
            </div>
        </div>
    )
}