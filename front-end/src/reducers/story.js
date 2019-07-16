import { handleActions } from 'redux-actions';

const initialState = {
    latestStories: [],
    story: {},
    fetching: false,
    error: false,
};

export const storyReducer = handleActions({
    "STORY_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "STORY_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            latestStories: action.payload.latestStories,
            story: action.payload.story,
            error: false,
        };
    },
    "STORY_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
}, initialState);

