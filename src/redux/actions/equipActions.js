/**
 * ==============================================================================
 * Copyright (c) 2026 Kishan Sah. All Rights Reserved.
 *
 * PROPRIETARY & CONFIDENTIAL NOTICE:
 * This software, source code, and associated documentation are the proprietary
 * property of Kishan Sah. Unauthorized copying, distribution, modification,
 * reproduction, or reverse engineering of this project via any medium is
 * strictly prohibited without explicit prior written permission from Kishan Sah.
 *
 * Founder & Author: Kishan Sah
 * LinkedIn: https://www.linkedin.com/in/kishan-sah-b97a73315/
 * ==============================================================================
 */

import axios from '../../api/config';
import * as action from '../constants/equipConstants';

export const getEquipments = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/equipment`);
        console.log(data, 'redux');
        dispatch({ type: action.GET_PRODUCT_SUCCESS, payload: data});

    } catch(error) {
        dispatch({ type: action.GET_PRODUCT_FAIL, payload: error.response});
    }
}


// export const getProductDetails = (id) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`${URL}/product/${id}`);
//         dispatch({ type: action.GET_PRODUCT_DETAIL_SUCCESS, payload: data });
//     } catch(error) {
//         dispatch({ type: action.GET_PRODUCT_DETAIL_FAIL, payload: error.response});
//     }
// }


// export const getProductByCategory = (category) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`${URL}/product/category/${category}`);
//         dispatch({ type: action.GET_PRODUCT_CATEGORY_SUCCESS, payload: data });
//     } catch(error) {
//         dispatch({ type: action.GET_PRODUCT_CATEGORY_FAIL, payload: error.response});
//     }
// }