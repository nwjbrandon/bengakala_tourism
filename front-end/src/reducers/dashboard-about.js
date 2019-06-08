import { createAction, handleActions } from 'redux-actions';
import { insert, reset, update } from '../const/utils';

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

export const dashboardAboutReducer = (state, action) => {
    const { displayedData, originalData } = initialState;
    switch (action.type) {
        case 'DASHBOARD_ABOUT_RESET':
            const resetData = reset(originalData);
            return { ...state, ...initialState, displayedData: resetData };
        case 'DASHBOARD_ABOUT_INSERT':
            insert(displayedData, action.payload);
            return { ...state, ...initialState, displayedData };
        case 'DASHBOARD_ABOUT_UPDATE':
            update(displayedData, action.payload);
            return { ...state, ...initialState };
        default:
            return { ...state, ...initialState }
    }
};

export const dashboardAboutReducerSaga = handleActions({
    'DASHBOARD_ABOUT_ONMOUNT': (state, action) => ({
        ...state,
        ...initialState,
        displayedData: {...action.payload}
    })
}, initialState);

