import { useState } from 'react';
import { signUp, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export default function SignUpForm({ csrfToken }) {
    const router = useRouter();
    const [error, setError] = useState(null);

    return (
        <>
            <Formik
                initialValues={{ username: '', password: '', email: '', content_editor: false, content_manager: false}}
                validationSchema={Yup.object({
                    email: Yup.string().required('Please enter your email   '),
                    username: Yup.string().required('Please enter a username   '),
                    password: Yup.string().required('Please enter a password   '),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    const res = await fetch('http://localhost:3000/api/user', {
                        method: 'POST',
                        body: JSON.stringify({
                            redirect: false,
                            username: values.username,
                            email: values.email,
                            password: values.password,
                            roles: {
                                content_editor: values.content_editor,
                                content_manager: values.content_manager
                            },
                            callbackUrl: `${window.location.origin}`,
                        })
                    });
                    if (res?.error) {
                        setError(res.error);
                    } else {
                        setError(null);
                    }
                    if (res.url) router.push(res.url);
                    setSubmitting(false);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col items-center justify-center py-2">
                            <div className="px-8 pt-6 pb-8 mb-4">
                                <input
                                    name="csrfToken"
                                    type="hidden"
                                    defaultValue={csrfToken}
                                />

                                <div className="text-red-400 text-md text-center rounded p-2">
                                    {error}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        username
                                        <Field
                                            name="username"
                                            aria-label="enter your username"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        email
                                        <Field
                                            name="email"
                                            aria-label="enter your email"
                                            aria-required="true"
                                            type="email"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        password
                                        <Field
                                            name="password"
                                            aria-label="enter your password"
                                            aria-required="true"
                                            type="password"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                <label
                                    htmlFor="confirmPassword"
                                    className="uppercase text-sm text-gray-600 font-bold"
                                >
                                    re-type password
                                    <Field
                                    name="confirmPassword"
                                    aria-label="enter your password"
                                    aria-required="true"
                                    type="password"
                                    className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    />
                                </label>

                                <div className="text-red-600 text-sm">
                                    <ErrorMessage name="confirmPassword" />
                                </div>
                                </div>
                                <div className="flex-row mb-4" role="group" aria-labelledby="checkbox-group">
                                    <div>
                                        <label className='text-[#223843]'>
                                            <Field type="checkbox" name="viewer" value="viewer" />
                                            Viewer
                                        </label>
                                    </div>
                                    <div>
                                        <label className='text-[#223843]'>
                                            <Field type="checkbox" name="content_editor" value="content_editor" />
                                            Content Editor
                                        </label>
                                    </div>
                                    <div>
                                        <label className='text-[#223843]'>
                                            <Field type="checkbox" name="content_manager" value="content_manager" />
                                            Content Manager 
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="uppercase text-sm font-bold tracking-wide bg-[#D77A61] text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
                                    >
                                        {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}