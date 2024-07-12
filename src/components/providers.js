"use client";

import { useState, useEffect, createContext } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import RoutesValidation from './routesValidation';
import { config } from 'dotenv'; config();
import { getCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import Modal from '@/components/modal';
import { usePathname } from 'next/navigation';
import ToolbarApp from "@/components/toolbarApp";
import IoNotificator from './ioNotificator';
import { SnackbarProvider } from 'notistack';
import { useParams } from 'next/navigation';


const NODE_BACKEND_URL = process.env.NEXT_PUBLIC_ENV_MODE === "development" ?
  process.env.NEXT_PUBLIC_NODE_BACKEND_URL : process.env.NEXT_PUBLIC_NODE_BACKEND_URL_PRODUCTION;
export const ThemeContext = createContext(null);


export default function Providers({ children }) {
  const router = useRouter();
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alertContent, setAlertContent] = useState(null);
  const [companyName, setcompanyName] = useState(null);
  const { company } = useParams();

  const valuesProvider = {
    isAlertOpened, setIsAlertOpened,
    alertContent, setAlertContent
  }

  useEffect(() => {
    if (alertContent !== null) setIsAlertOpened(true)
  }, [alertContent]);

  useEffect(() => {
    if (isAlertOpened === false) setAlertContent(null)
  }, [isAlertOpened]);

  const [hideComponent, setHideComponent] = useState(false);
  const currentPage = usePathname();

  useEffect(() => {
    if (
      currentPage === "/" + company + '/login' ||
      currentPage === "/" + company + '/signup'
    ) {
      setHideComponent(true);
    } else {
      setHideComponent(false);
    }

    let userData = getCookie("userData");
    if (userData) {
      userData = JSON.parse(userData);
      if (userData.role === "client") {
        setcompanyName(userData.username);
      } else {
        setcompanyName(getCookie("companyName"));
      }
    }
  }, [hideComponent, currentPage, getCookie("userData")]);


  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RoutesValidation>
        <ThemeContext.Provider value={valuesProvider}>
          <SnackbarProvider persist maxSnack={5} variant="warning" anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
            <IoNotificator />
            {!hideComponent && <ToolbarApp companyName={companyName || getCookie("companyName")} />}
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
