
import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { object, string, ref } from "yup";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'


const RegisterValidation = object().shape({
  email: string()
    .required("Valid email required")
    .email("Valid email required"),
  username: string().required("Username is Required"),
  password: string().min(8, "Password must be atleast 8 chacarcters long").required("Required"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

export default function SignUp() {
  const [error, setError] = useState(null);
  const router = useRouter();
  return (
    <Formik
    initialValues={{ email:'', username: '', password: '', confirmPassword: ''}}
    validationSchema={RegisterValidation}
    onSubmit={async (values, { setSubmitting }) => {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uname: values.username,
          email: values.email,
          pwd: values.password
        })
      })
      .then(data =>{
        console.log(data);
        const res = signIn('credentials', {
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
      })
      .catch((error) => {
        setError(error);
      })
    }}
  >
    {(formik) => (
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-blue-400 flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
              <label
                htmlFor="email"
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
            <div className="mb-6">
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
            <div className="flex items-center justify-center">
            <button
                type="submit"
                className="uppercase text-sm font-bold mx-2 tracking-wide bg-blue-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
              >
                {formik.isSubmitting ? 'Please wait...' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      </form>
    )}
  </Formik>
  )
}