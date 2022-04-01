import Results from '../components/Results.js'
import Layout   from "../components/Layout.js"

export async function getServerSideProps(context) {

    let url = "http://localhost:3000/api/video";
    
    if (context.query.title) {
        url += "?text_query=" + context.query.title;
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    return {
        props: {
            videos: data
        },
    }
}


export default function Home({ videos }) {

    console.log("Videos: ", videos);

    if (videos.length === 0) {
        return (
            <div className='flex w-full h-full mt-8 items-center justify-center'>
                <h1 className="text-2xl">Sorry, we couldn't find any videos matching that search.</h1>
            </div>
        )
    }

    return (
        <>
            <Results result={ videos } classes={'h-auto px-5 mt-4 text-white sm:grid md:grid-cols-2 lg:grid-cols-4'}/>{/* Result is the json file of video data/ */}
        </>
    )
}

Home.layout = Layout