/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useSession, getSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({ user }) {
  console.log("User: "+ user)
  const {data: session, status} = useSession();
  const isLoggedIn = status === "authenticated";
  const [input, setInput] = useState('');
  let MenuItem;

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  }

  function onSubmit(e) {
    document.location.href = 'http://localhost:3000/?title='+input;
  }

  if(isLoggedIn){
    MenuItem = <Menu.Items className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg py-1 backdrop-blur-2xl bg-slate-900 bg-opacity-90 border border-opacity-25 border-slate-200 ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href='/dashboard'//{user.viewer ? "profile" : "dashboard"}
                      className={classNames(active ? 'bg-slate-900 bg-opacity-50 border-2 border-opacity-0 border-slate-900' : '', 'block px-4 py-2 text-sm text-[#EFF1F3]')}
                    >
                      Dashboard
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick= {() => signOut()}
                      href="/"
                      className={classNames(active ? 'bg-slate-900 bg-opacity-50 border-2 border-opacity-0 border-slate-900' : '', 'block px-4 py-2 text-sm text-[#EFF1F3]')}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
  }
  else {
    MenuItem = <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/login"
                      className={classNames(active ? 'bg-slate-900 bg-opacity-50 border border-opacity-50 border-slate-900' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Sign in
                    </a>
                  )}
                </Menu.Item>
                </Menu.Items>
  }
  return (
    <Disclosure as="nav" className="bg-slate-900 bg-opacity-90 border border-opacity-50 border-[#223843]">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto ">
            <div className="flex h-14 items-center justify-center">
              <div className="flex items-center justify-start mr-6 sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center cursor-pointer">
                  <Link href='/'>
                    <div className='flex h-auto w-auto'>
                      <div className='flex ml-1 items-center'>
                        <img
                          className="flex items-end justify-start hidden bg-slate-200 rounded-md lg:block h-6"
                          src="/movie-film.png"
                          alt="Logo"
                        />
                      </div>
                      <div className='flex items-end justify-center text-2xl text-[#EFF1F3] ml-1 mr-1'>
                        <h1 className="font-sans font-bold">Fletnix</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              {/* Search Bar and Button */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center justify-center py-10 w-full">
                  <div className="input-group relative flex items-center w-full">
                  <input type="search" value={input} onInput={e => setInput(e.target.value)} onKeyDown={onKeyDown} className="form-control relative flex items-center justify-center min-w-0 block w-full px-3 py-1.5 text-slate-200 font-normal bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 bg-clip-padding rounded-lg border border-solid border-[#0A2730] transition ease-in-out mr-1 m-0 focus:text-slate-200 focus:bg-[#EFF1F3] hover:border-slate-500 focus:outline-none" aria-label="Search" aria-describedby="button-addon2"></input>
                    <button type='submit' onClick={onSubmit} className="btn rounded-lg inline-block px-6 py-2.5 bg-slate-900 text-white font-medium text-xs leading-tight uppercase shadow-md border border-solid border-[#0A2730] hover:border hover:border-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out flex items-center" id="button-addon2">
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
              <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="text-[#EFF1F3] flex text-sm rounded-full px-2 py-2 hover:ring-1 hover:ring-slate-500">
                      <span className="sr-only">Open user menu</span>
                      <UserIcon className="h-6 w-6" aria-hidden="true"/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                  {MenuItem}
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  const res = await fetch('/api/user', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          cookie: context.req.headers.cookie,
      },
  });
  const data = await res.json();

  const user = {
      username: data.username,
      email: data.email,
      role: data.role
  }

  return { props: { user } }
}