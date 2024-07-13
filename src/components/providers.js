"use client";

import { useState, useEffect, createContext } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import RoutesValidation from './routesValidation';
import { config } from 'dotenv'; config();
import { getCookie } from 'cookies-next'
import { useRouter } from "next/navigation";
import Modal from '@/components/modal';
import { usePathname } from 'next/navigation';
import ToolbarApp from "@/components/toolbarApp";
import { SnackbarProvider } from 'notistack';
import { useParams } from 'next/navigation';


const NODE_BACKEND_URL = process.env.NEXT_PUBLIC_ENV_MODE === "development" ?
  process.env.NEXT_PUBLIC_NODE_BACKEND_URL : process.env.NEXT_PUBLIC_NODE_BACKEND_URL_PRODUCTION;
export const ThemeContext = createContext(null);


export default function Providers({ children }) {
  const router = useRouter();
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alertContent, setAlertContent] = useState(null);
  const [companyName, setcompanyName] = useState("test");
  const { company } = useParams();
  const [hideComponent, setHideComponent] = useState(false);

  const valuesProvider = {
    isAlertOpened, setIsAlertOpened,
    alertContent, setAlertContent
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RoutesValidation>
        <ThemeContext.Provider value={valuesProvider}>
          <SnackbarProvider persist maxSnack={5} variant="warning" anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
            {!hideComponent && <ToolbarApp companyName={companyName} />}
            {children}
            <Modal
              isOpen={isAlertOpened}
              setIsOpen={setIsAlertOpened}
              children={alertContent}
            />
          </SnackbarProvider>
        </ThemeContext.Provider>
      </RoutesValidation>
    </LocalizationProvider>
  );
}
