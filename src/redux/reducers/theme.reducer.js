import { THEME_CHANGE } from "../types";

const INITIAL_STATE =  'light';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case THEME_CHANGE :
            return  action.payload;
        default: return state
    }
}