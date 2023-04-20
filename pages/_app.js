import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Toaster containerClassName='text-xs' />
    <Component {...pageProps} />
  </>
}

export default MyApp
