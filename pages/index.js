import Results from '../components/Results.js'
import testjson from '../pages/api/test.json'

export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:3000/api/video', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    console.log(data);

    return {
        props: {
            videos: data
        },
    }
}


export default function Home({ videos }) {
    return (
        <>
            <Results result={ videos } />{/* Result is the json file of video data/ */}
        </>
    )
}
