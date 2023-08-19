"use client"

import { store } from '@/store/store';
import { Provider } from 'react-redux'

export const metadata = {
  title: "AllFreeChips",
  description:
    "AllFreeChips is the biggest community with over 30,038+ active members bringing the best online casino bonuses. Latest casino bonus codes of 2022",
  icons: ["/favicon.ico"],
  keywords:
    "Online Casino Guide, 2022 online casinos, Online Casinos, casino bonus codes, Casino Guide, Casino Reviews",
};

export interface AuthContextProps {
  children: React.ReactNode,
}

export default function AuthContext({ 
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
        <Provider store={store}>
          {children}
        </Provider>
  );
}