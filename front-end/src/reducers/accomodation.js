const initialState = {
  personalDetails: {
    firstName: "",
    lastName:"",
    email: "",
    country: "",
  },
  tripDetails:{
    checkIn: new Date(),
    checkOut: new Date(),
    breakfast: false,
    lunch :false ,
    dinner :false,
    numberMales: 0,
    numberFemales: 0,
    numberVans: 0,
    numberCars: 0,
    numberBikes: 0
  },
  excludeDates:[]

}

const reducer = (state =initialState ,action) => {

  if(action.type === 'FIRST_NAME'){
    const tempcpyPersonal = {...state.personalDetails};
    tempcpyPersonal.firstName = action.payload;
    return {
      personalDetails: {...tempcpyPersonal},
      tripDetails: {...state.tripDetails},
    }
  }else if(action.type === 'LAST_NAME'){
      const tempcpyPersonal = {...state.personalDetails};
      tempcpyPersonal.lastName = action.payload;
      return {
        personalDetails: {...tempcpyPersonal},
        tripDetails: {...state.tripDetails},
      }
  }else if(action.type === 'EMAIL'){
      const tempcpyPersonal = {...state.personalDetails};
      tempcpyPersonal.email = action.payload;
      return {
        personalDetails: {...tempcpyPersonal},
        tripDetails: {...state.tripDetails},
      }
  }else if(action.type === 'COUNTRY'){
        const tempcpyPersonal = {...state.personalDetails};
        tempcpyPersonal.country = action.payload;
        return {
          personalDetails: {...tempcpyPersonal},
          tripDetails: {...state.tripDetails},
        }
  }else if(action.type === 'MALES'){
        const tempcpyTrip = {...state.tripDetails};
        tempcpyTrip.numberMales = action.payload;
        return {
          personalDetails: {...state.personalDetails},
          tripDetails: {...tempcpyTrip},
        }
  }else if(action.type === 'FEMALES'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.numberFemales = action.payload;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }else if(action.type === 'CARS'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.numberCars = action.payload;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }else if(action.type === 'VANS'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.numberVans = action.payload;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }else if(action.type === 'BIKES'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.numberBikes = action.payload;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }
  else if(action.type === 'BREAKFAST'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.breakfast = !tempcpyTrip.breakfast;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }else if(action.type === 'LUNCH'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.lunch = !tempcpyTrip.lunch;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }else if(action.type === 'DINNER'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.dinner = !tempcpyTrip.dinner;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }else if(action.type === 'CHECK_IN'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.checkIn = action.payload;
      if(action.payload > state.tripDetails.checkOut){
        tempcpyTrip.checkOut = action.payload;
      }
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }else if(action.type === 'CHECK_OUT'){
      const tempcpyTrip = {...state.tripDetails};
      tempcpyTrip.checkOut = action.payload;
      return {
        personalDetails: {...state.personalDetails},
        tripDetails: {...tempcpyTrip},
      }
  }
  return state;
};

export default reducer;
