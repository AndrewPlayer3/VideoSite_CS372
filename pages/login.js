// export default function Login() {
//   return (
//     <>
//         <form action="/api/authentication" method="POST">
//             <label for="uname">Username:</label>
//             <input name="uname" type="text" placeholder="Enter Username" required></input>

//             <label for="pwd">Password:</label>
//             <input name="pwd" type="password" placeholder="Enter Password" required></input>

//             <button type="submit">Login</button>
//         </form>
//     </>
//   )
// }

import { useState } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '', }}
        validationSchema={Yup.object({
          username: Yup.string().required('Please enter your username'),
          password: Yup.string().required('Please enter your password'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn('credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
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
            <div className="bg-blue-400 flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                <div className="mb-6">
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
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="uppercase text-sm font-bold tracking-wide bg-blue-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
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