import connectDB from '../../middleware/mongodb';
import Video from '../../models/video';

const handler = async (req, res) => {
    if (req.method === 'POST') {   // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.
        const { rating, id } = JSON.parse(req.body);
        try {
            const like_video = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.total_rating': rating } });
            const inc_likes  = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.num_ratings' : 1 } });
            return res.status(200).send({"rated": "true"});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
};

export default connectDB(handler);
