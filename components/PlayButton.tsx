"use client";

import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { setShow } from '@/store/slices/modalSlice';

interface props {
    title: string,
    Icon?: any
}
const PlayButton: React.FC<props> = ({title, Icon}) => {
    
    const modalState = useSelector((state: RootState) => state.modalShow);
    const authState = useSelector((state: RootState) => state.auth.authState);
    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            const { Animate,  initTE } = await import("tw-elements");
            initTE({ Animate });
          }
          init();
    },[])

    const _onClick = (e) => {
        e.preventDefault();
        if(authState) {
            window.location.href = "https://democasino.betsoftgaming.com/cwguestlogin.do?gameId=295&amp;lang=en";
        }
        else {
            dispatch(setShow(true));
        }
    }
    return (
            <button
                data-te-animation-init
                data-te-animation-start="onLoad"
                data-te-animation-reset="false"
                data-te-animation="[fade-in-left_1s_ease-in-out]"
                data-te-animation-delay="900"
                onClick={(e) => _onClick(e)}
                className="flex items-center justify-center lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out mt-6">
                {title}
                {Icon}
            </button>
  )
}

export default PlayButton;
