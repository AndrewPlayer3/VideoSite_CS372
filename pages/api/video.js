import connectDB from '../../middleware/mongodb';
import Video from '../../models/video';

const handler = async (req, res) => {
    if (req.method === 'POST') {   // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.
        const { title, storage_location, length, resolution, description, tags } = req.body;  
        try {            
            var video = new Video({
                title: title,
                location: storage_location,
                description: description,
                tags: tags,
                metadata: {
                    length: length,
                    resolution: resolution
                },
                analytics: {
                    total_rating: 0,
                    num_ratings: 0,
                    views: 0
                }
            });
            // Create new video entry
            var videocreated = await video.save();
            return res.status(200).send(videocreated);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else if (req.method === 'GET') {  // Retrieve Video Information | TODO: Restrict these requests to any logged-in user.

    }
};

export default connectDB(handler);