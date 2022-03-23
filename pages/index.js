import Results from '../components/Results.js'
import testjson from '../pages/api/test.json'

export default function Home() {
  return (
    <>
      <Results result={testjson}/>{/* Result is the json file of video data/ */}
    </>
  )
}
