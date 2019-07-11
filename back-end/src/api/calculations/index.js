import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import db from '../../storage/db';


const calculationsPost = [
    async (req, res) => {
        const tripData = req.body.data.tripDetails;
        const costData = req.body.data.cost;

        const numOfPpl = tripData.numberMales + tripData.numberFemales

        res.json({
            data: 'success',
        });
    }
];
export default {
    post: calculationsPost
};
