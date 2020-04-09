"use client";

import React from 'react'
import Carousel from 'better-react-carousel'

const Gallery = () => {
    const MyDot = ({ isActive }) => (
      <span
        style={{
          display: 'inline-block',
          height: isActive ? '8px' : '5px',
          width: isActive ? '8px' : '5px',
          background: '#1890ff'
        }}
      ></span>
    )
      
  return (
    <Carousel cols={2} rows={1} gap={10} loop dot={MyDot}
      >
      <Carousel.Item>
        <img width="100%" src="/1.png" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src="/1.png" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src="/1.png" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src="/1.png" />
      </Carousel.Item>
      {/* ... */}
    </Carousel>
  )
}

export default Gallery;