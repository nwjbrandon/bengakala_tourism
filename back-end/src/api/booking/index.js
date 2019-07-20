import _ from 'lodash';
import { eachDay } from 'date-fns';
import { wrapAsync } from '../../middleware/errorHandling';
import db from '../../storage/db';
import { TABLE_EXCLUDED_DATES, TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';

// obtained information for the booking page
const bookingInfo = [
  wrapAsync(async (req, res) => {
    // obtain the cost of items for payment
    const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    const cost = _.map(services, service => ({ [service.title]: service.pricesString }));

    // obtain the excluded dates for booking calendar
    const excludedDatesData = await db.fetchData(TABLE_EXCLUDED_DATES);
    const excludedDates = _.map(excludedDatesData, data => data.date);

    // obtain the number of people at the village on that day
    const transactions = await db.fetchData(TABLE_TRANSACTIONS);
    const listOfDates = _.flatten(_.map(transactions, t => eachDay(t.dateFrom, t.dateTo)));
    const booked = _.map(_.countBy(listOfDates), (counts, date) => ({ date, counts }));

    // obtain the images of accommodation
    const bookingImagesData = await db.fetchData(TABLE_INFORMATION, { type: 'booking' });
    const bookingImages = _.orderBy(_.map(bookingImagesData, bookingImage => ({
      title: bookingImage.title,
      imgUrl: bookingImage.imgUrl,
      createdAt: bookingImage.createdAt,
    })), ['createdAt'], ['desc']);

    return res.json({
      data: {
        cost,
        excludedDates,
        booked,
        bookingImages,
      }
    });
  }),
];

export default {
  info: bookingInfo,
};
