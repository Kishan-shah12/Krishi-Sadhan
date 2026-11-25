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

import React from "react";
import './ProductItem.css';
import item1 from '../../../img/item1.png';
import { Link, useNavigate } from "react-router-dom";

const ProductItem = ({ equipment }) => {
    const navigate = useNavigate();
    return (
        
            <div className="my-6">
                <div className="mx-2 itemDiv p-4">
                    <Link to={`/product/${equipment.id}`}><img style={{ height: '220px', width: '230px', objectFit: 'cover' }} src={equipment?.image || item1} alt="" /></Link>
                    <div className="flex justify-around my-2 p-3">
                        <div>
                            <h1 className="text-2x; font-semibold text-gray-500">{equipment?.title.substring(0,10)}</h1>
                            <span className="text-xs font-semibold text-gray-700">4.5</span>
                            <span className="fa fa-star checked text-xs text-yellow-400"></span>
                            <span className="fa fa-star checked text-xs text-yellow-400 font-semibold"></span>
                            <span className="fa fa-star checked text-xs text-yellow-400 font-semibold"></span>
                            <span className="fa fa-star text-xs text-yellow-400 font-semibold"></span>
                            <span className="fa fa-star text-xs text-yellow-400 font-semibold"></span>
                        </div>
                        <p className="text-xs pl-8 font-semibold text-gray-500 pt-3">{equipment?.manufacturer}</p>
                    </div>

                    <p className="text-lg font-bold text-gray-600">Rs {equipment.daily_rental} per Day</p>
                    <p className="text-sm font-bold text-gray-500">Rs {equipment.hourly_rental} per Hour</p>
                    <button onClick={() => navigate(`/product/${equipment.id}`)} className="bg-darkgreen hover:bg-green-700 text-white font-bold py-1 text-center w-full my-4 px-8 rounded">
                        View Details
                    </button>
                </div>
            </div>
    );
};

export default ProductItem;
