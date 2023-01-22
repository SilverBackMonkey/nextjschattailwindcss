"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";

export default function LikeCasinoImage(props) {
    const defaultImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAHVJREFUKFNjrKura/j06RP/+/fvBT5+/CiATjP29/cXgCQ+fPjA/+HDBxCNghnnzp2b8OnTJ7BOZJNgChnXr18fAONgM4lx9+7dDl++fBF49+4dyAQMkxjPnz9vgG4vskmM9+/fV0BWgG4SI8hx2FwPEgOZBACHNbSCBLKzegAAAABJRU5ErkJggg==";

  const [src, setSrc] = useState(
    `https://radiumpowered.com/radiumimages/homepage/${encodeURIComponent(
      props.clean_name
    )}-homescreen.jpg`
  );
  const onError = useCallback(() => {
    setSrc(defaultImage);
  }, []);
  return (
    <div className="w-full px-8">
      <Image
        src={src}
        width={384}
        height={240}
        className="w-full object-cover aspect-[16/10]"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAHVJREFUKFNjrKura/j06RP/+/fvBT5+/CiATjP29/cXgCQ+fPjA/+HDBxCNghnnzp2b8OnTJ7BOZJNgChnXr18fAONgM4lx9+7dDl++fBF49+4dyAQMkxjPnz9vgG4vskmM9+/fV0BWgG4SI8hx2FwPEgOZBACHNbSCBLKzegAAAABJRU5ErkJggg=="
        alt={props.casinoname}
        onError={onError}
      />
    </div>
  );
}
