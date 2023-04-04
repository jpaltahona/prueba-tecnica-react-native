import { CART } from '../types';

export const cartAction = ( data ) => async (dispatch) =>{

    dispatch({
        type:  CART,
        payload: data
    });
}