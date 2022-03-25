import connectDB from '../../middleware/mongodb';
import Video from '../../models/video';

const handler = async (req, res) => {
    if (req.method === 'POST') {   // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.
        const { rating, id } = req.body;
        try {
            const like_video = await Video.updateOne({_id: id}, { $inc: { 'analytics.total_rating': rating } });
            const inc_likes  = await Video.updateOne({_id: id}, { $inc: { 'analytics.num_ratings' : 1 } });
            return res.status(200).send({"Like": like_video, "Inc": inc_likes});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
};

export default connectDB(handler);
