import * as actionTypes from '../actions/booking';

const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1)
const dayafter = new Date();
dayafter.setDate(tomorrow.getDate() + 1)


const initialState = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
  },
  tripDetails: {
    checkIn: tomorrow,
    checkOut: dayafter,
    breakfast: false,
    lunch: false,
    dinner: false,
    numberMales: 0,
    numberFemales: 0,
    numberVans: 0,
    numberCars: 0,
    numberBikes: 0,
  },
  excludeDates: [],
  cost: {
    accomodation: 100000,
    van: 50000,
    car: 50000,
    bike: 50000,
    breakfast: 20000,
    lunch: 20000,
    dinner: 20000
  },
  price: {
    accomodation: 0,
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    mealPlan: 0,
    subTotal: 0,
  },
  grossAmount: 0,
  errorMsg: "",
  numberOfDays: 0

}

const reducer = (state = initialState, action) => {

  if (action.type === actionTypes.FIRST_NAME) {
    const tempcpyPersonal = { ...state.personalDetails };
    tempcpyPersonal.firstName = action.payload;
    return {
      ...state,
      personalDetails: { ...tempcpyPersonal },
      tripDetails: { ...state.tripDetails },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.LAST_NAME) {
    const tempcpyPersonal = { ...state.personalDetails };
    tempcpyPersonal.lastName = action.payload;
    return {
      ...state,
      personalDetails: { ...tempcpyPersonal },
      tripDetails: { ...state.tripDetails },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.EMAIL) {
    const tempcpyPersonal = { ...state.personalDetails };
    tempcpyPersonal.email = action.payload;
    return {
      ...state,
      personalDetails: { ...tempcpyPersonal },
      tripDetails: { ...state.tripDetails },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.COUNTRY) {
    const tempcpyPersonal = { ...state.personalDetails };
    tempcpyPersonal.country = action.payload;
    return {
      ...state,
      personalDetails: { ...tempcpyPersonal },
      tripDetails: { ...state.tripDetails },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.MALES) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.numberMales = action.payload;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.FEMALES) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.numberFemales = action.payload;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.CARS) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.numberCars = action.payload;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.VANS) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.numberVans = action.payload;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.BIKES) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.numberBikes = action.payload;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  }
  else if (action.type === actionTypes.BREAKFAST) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.breakfast = !tempcpyTrip.breakfast;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.LUNCH) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.lunch = !tempcpyTrip.lunch;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.DINNER) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.dinner = !tempcpyTrip.dinner;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.CHECK_IN) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.checkIn = action.payload;
    if (action.payload > state.tripDetails.checkOut) {
      tempcpyTrip.checkOut = action.payload;
    }
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.CHECK_OUT) {
    const tempcpyTrip = { ...state.tripDetails };
    tempcpyTrip.checkOut = action.payload;
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...tempcpyTrip },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.EXCLUDE_DATES) {
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...state.tripDetails },
      //excludeDates: [...actionTypes.payload],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.ERR_MSG) {
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...state.tripDetails },
      errorMsg: action.payload,
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost }
    }
  } else if (action.type === actionTypes.GROSS_AMOUNT) {
    return {
      ...state,
      personalDetails: { ...state.personalDetails },
      tripDetails: { ...state.tripDetails },
      excludeDates: [...state.excludeDates],
      cost: { ...state.cost },
      grossAmount: action.payload
    }
  } else if (action.type === actionTypes.PAYMENT_CALC) {

    return {
      ...state,
      price: { ...action.payload }
    }
  } else if (action.type === actionTypes.NUMBER_OF_DAYS) {

    return {
      ...state,
      numberOfDays: action.payload
    }
  }
  return state;
};

export default reducer;
