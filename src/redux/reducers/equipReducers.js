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

import * as actionType from '../constants/equipConstants';


export const getEquipmentsReducer = (state = { equipments: [] }, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCT_SUCCESS:
            return { equipments: action.payload }

        case actionType.GET_PRODUCT_FAIL:
            return { error: action.payload }

        default:
            return state;

    }
}


// export const getProductDetailsReducer = (state = { product: [] }, action) => {
//     switch (action.type) {
//         case actionType.GET_PRODUCT_DETAIL_SUCCESS:
//             return { product: action.payload}

//         case actionType.GET_PRODUCT_DETAIL_FAIL:
//             return { product: action.payload}

//         default:
//             return state;
//     }
// }


// export const getProductByCategoryReducer = (state = { items: [] }, action) => {
//     switch (action.type) {
//         case actionType.GET_PRODUCT_CATEGORY_SUCCESS:
//             return { items: action.payload}

//         case actionType.GET_PRODUCT_CATEGORY_FAIL:
//             return { items: action.payload}

//         default:
//             return state;
//     }
// }