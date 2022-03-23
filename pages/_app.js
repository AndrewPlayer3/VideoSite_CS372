import { SessionProvider } from "next-auth/react"
import Header from "../components/common/Header"
import Layout   from "../components/Layout.js"
import '../styles/globals.css'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
        <SessionProvider session={session}>
          <Header />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
    </>
  )
}