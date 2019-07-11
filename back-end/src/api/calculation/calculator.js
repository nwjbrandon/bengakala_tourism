import Big from 'big.js';

const dateDiffIndays = (date1, date2) => {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(),
    dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(),
    dt1.getDate())) / (1000 * 60 * 60 * 24));
};

const calculationsPost = [
  async (req, res) => {
    const tripData = req.body.data;

    const costData = req.body.data;

    const groupSize = new Big(tripData.numberMales + tripData.numberFemales);

    const numOfDays = new Big(dateDiffIndays(tripData.checkIn, tripData.checkOut));

    const itemCost = (val) => {
      const bigVal = new Big(val);
      return bigVal.mul(groupSize).mul(numOfDays);
    };
    const accomodation = itemCost(costData.accomodation);

    let breakfast, lunch, dinner;

    const calcMeal = () => {
      if (tripData.breakfast) {
        breakfast = itemCost(costData.breakfast);
      } 
      if (tripData.lunch) {
        lunch = itemCost(costData.lunch);
      } 
      if (tripData.dinner) {
        dinner = itemCost(costData.dinner);
      }
    }

    calcMeal();

    const mealPlan = breakfast.add(lunch).add(dinner);

    const subTotal = mealPlan.add(accomodation);

    const packageCost = {
      accomodation: Number(accomodation),
      breakfast: Number(breakfast),
      lunch: Number(lunch),
      dinner: Number(dinner),
      mealPlan: Number(mealPlan),
      subTotal: Number(subTotal),
    };

    res.json({
      data: packageCost,
    });
  }
];

export default {
  post: calculationsPost
};
