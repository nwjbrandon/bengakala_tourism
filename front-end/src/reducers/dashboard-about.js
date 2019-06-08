import _ from 'lodash';

const initialState = {
    originalData: {
        '1': {
            title: 'Getaway to a Kampong Living',
            type: '',
            text: 'Gallop Kranji Farm Resort is a countryside destination located in Kranji, the north-west region of Singapore. Our Resort provides a local farm stay experience with our 35 villas choosing from our Standard, Superior, Executive, Premier Villa and Family Suite, with activities for all ages starting with our in-house Fruit & Vegetable Farm Tours, Herbal Plantation Tour, Bee Farm Tour, Animal Interaction with Pony Rides, Birdnest Museum Tour, Bottle Koi Feeding, Bird Farm Tour, Prawn Fishing, and our Family friendly Beer Garden and Variety of Food Options with Indoor and Outdoor Play area for the kids.',
            edit: false,
            mode: 'about',
        }
    },
    displayedData: {
        '1': {
            title: 'Getaway to a Kampong Living',
            type: '',
            text: 'Gallop Kranji Farm Resort is a countryside destination located in Kranji, the north-west region of Singapore. Our Resort provides a local farm stay experience with our 35 villas choosing from our Standard, Superior, Executive, Premier Villa and Family Suite, with activities for all ages starting with our in-house Fruit & Vegetable Farm Tours, Herbal Plantation Tour, Bee Farm Tour, Animal Interaction with Pony Rides, Birdnest Museum Tour, Bottle Koi Feeding, Bird Farm Tour, Prawn Fishing, and our Family friendly Beer Garden and Variety of Food Options with Indoor and Outdoor Play area for the kids.',
            edit: false,
            mode: 'about',
        }
    },
};

const insert = (dest, payload) => {
    const payloadKey = _.keys(payload)[0];
    dest[payloadKey] = payload[payloadKey];
};

const auth = (state = false, action) => {
    console.log(action);
    switch (action.type) {
        case 'DASHBOARD_ABOUT_DELETE':
            return {};
        case 'DASHBOARD_ABOUT_RESET':
            return {};
        case 'DASHBOARD_ABOUT_INSERT':
            console.log(_.keys(action.payload)[0]);
            console.log(action.payload[_.keys(action.payload)[0]]);
            //const payloadKey = _.keys(action.payload)[0];
            //const payloadValue = action.payload[payloadKey];
            const { displayedData } = initialState;
            //displayedData[payloadKey] = payloadValue;
            insert(displayedData, action.payload);
            return { ...initialState, displayedData };
        case 'DASHBOARD_ABOUT_UPDATE':
            return { ...initialState };
        case 'USER_SIGN_OUT':
            return false;
        default:
            return { ...initialState }
    }
};

export default auth
