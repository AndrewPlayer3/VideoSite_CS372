import Thumbnail from './Thumbnail'

export default function Results({result, classes}){
    return(
        <div className='flex basis-100 shrink-0'>
            {/* Map each video data AKA display each video thmbnail */}
            <div className={classes}>
                {result.map((result) => (
                    <Thumbnail key={result.id} result={result} />
                ))}
            </div>
        </div>
    )
}