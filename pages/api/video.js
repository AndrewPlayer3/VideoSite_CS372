import connectDB from '../../middleware/mongodb';
import Video from '../../models/video';

const handler = async (req, res) => {
    if (req.method === 'POST') {   // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.

        const user_res = await fetch('http://localhost:3000/api/user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                cookie: req.headers.cookie,
            },
        });
        const user_data = await user_res.json();
        if (!user_data.role.content_editor) {
            return res.status(403).send('Only Content Editors can Upload Videos.');  
        }

        const { title, storage_location, thumbnail_location, length, resolution, description, tags } = JSON.parse(req.body);
        try {
            var video = new Video({
                title: title,
                location: storage_location,
                thumbnail: thumbnail_location,
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
        const { text_query, tag } = req.query;
        let id = "";
        if (req.query.id) {
            id = req.query.id;
        }
        if (text_query) {
            const query_results = await Video.find({ "title": { $regex: text_query, $options: 'i' } });
            if (query_results) {
                return res.status(200).send(query_results);
            } else {
                return res.status(404).send('No Videos Found.');
            }
        } else if (tag) {
            const query_results = await Video.find({ "tags": { "$in": [tag] } });
            if (query_results) {
                return res.status(200).send(query_results);
            } else {
                return res.status(404).send('No Videos Found.');
            }
        } else if (id) {
            const query_results = await Video.findById(id);
            if (query_results) {
                console.log(query_results);
                return res.status(200).send(query_results);
            } else {
                return res.status(404).send('No Videos Found.');
            }
        } else {
            const query_results = await Video.find({});
            if (query_results) {
                return res.status(200).send(query_results);
            } else {
               return res.status(500).send('No Videos Found.'); 
            }
        }
    } else {
        res.status(422).send('Invalid Request.');
    }
    // TODO: Delete Request (Based off of Mongo ID for Video)
};

export default connectDB(handler);
