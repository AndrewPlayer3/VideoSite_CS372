import Thumbnail from './Thumbnail'

export default function Results({result}){
    return(
        <>
            {/* Map each video data AKA display each video thmbnail */}
            <div className='h-auto mb-screen px-5 bg-gray-700 text-white sm:grid md:grid-cols-2 lg:grid-cols-4'>
                {result.map((result) => (
                    <Thumbnail key={result.id} result={result} />
                ))}
            </div>
        </>
    )
}