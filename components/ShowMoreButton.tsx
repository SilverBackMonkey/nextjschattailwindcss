"use client";

import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'


const ShowMoreButton = ({refresh}) => {
    const pageNumber = useRef<number>(1);


    return (
        <button
            type="submit" 
            className="text-center my-8 cursor-pointer"
            >Show More</button>
  )
}

export default ShowMoreButton
