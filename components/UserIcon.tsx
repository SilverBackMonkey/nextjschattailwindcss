import React from 'react';
import Image from "next/image";
interface UserIconProps {
  image: string;
  size?: number;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ image, size = 32, className }) => {
  return (
    <Image
      src={image}
      alt="User profile"
      className={`rounded-full ${className}`}
      width={size}
      height={size}
    />
  );
};

export default UserIcon;
