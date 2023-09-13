import { children } from 'cheerio/lib/api/traversing';
import React from 'react';

export default function MyProfileLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
    <>
        <div className="container mx-auto mt-160">
            <div className="py-6 lg:py-12 px-1">
                <div className="container mx-auto">
                    <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
                        <span>
                        Home / My Profile
                        </span>
                    </div>
                </div>
            </div>
        </div>
        {children}
      </>
    );
  }
