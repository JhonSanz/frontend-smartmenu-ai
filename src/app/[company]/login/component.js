"use client";

import { useRef, useEffect, useState, useContext } from 'react';
import { useRouter, useParams } from "next/navigation";
import { setCookie, deleteCookie } from 'cookies-next';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import DynamicForm from '@/components/dynamicForm';
import { ADMIN_ROLES } from "@/utils/constant";
import { ThemeContext } from '@/components/providers';


export default function Login() {
  const { setAlertContent } = useContext(ThemeContext);
  const [loginUser] = useMutation(LOGIN_MUTATION);
  const ref = useRef(null);
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentCompany, setCurrentCompany] = useState('');
  const { company } = useParams();

  useEffect(() => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("timezone");
    deleteCookie("userData");
  }, [])

  const handleSubmitForm = async (bodyValues) => {
    // TODO: CODE LOGIN
  }

  const triggerSubmit = () => {
    if (!ref || !ref.current) return;
    if (!ref.current.isValid()) return;
    ref.current.submit();
  }

  const loginFormFields = [
    {
      "alias": "Documento",
      "name": "username",
      "type": "string",
      "default": "",
      "validators": Yup.string().required("required")
    },
    {
      "alias": "Password",
      "name": "password",
      "type": "password",
      "default": "",
      "validators": Yup.string().required("required")
    }
  ]

  async function getMyCompany() {
    setIsDisabled(true);
    // TODO: CODE GET FETCH
    setIsDisabled(false);
  }

  useEffect(() => {
    async function initial() {
      await getMyCompany()
    }
    if (company) initial();
  }, [company])

  return (

    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Grid container justifyContent="center" height="100vh" alignItems="center">
        <Grid item xs={8} display="flex" flexDirection="column" textAlign="center" justifyContent="center" alignItems="center">
          {
            currentCompany && (

              <Box sx={{
                width: {
                  xs: '200px',
                  sm: '300px',
                  md: '400px',
                  lg: '500px',
                  xl: '600px',
                }
              }}>
                <img
                  src={currentCompany.images?.find(i => i.type === "logo")?.url || "https://blog.hubspot.com/hubfs/image8-2.jpg"}
                  alt="Imagen"
                  style={{
                    width: "100%",
                  }}
                />
              </Box>
            )
          }
          <DynamicForm ref={ref} fields={loginFormFields} submitFunction={handleSubmitForm} triggerSubmit={triggerSubmit} />
          <Box>

            <Button
              sx={{ margin: 1 }}
              size="small"
              variant="contained"
              type='submit'
              disabled={isDisabled}
              onClick={() => triggerSubmit()}
            >
              Entrar
            </Button>
            <Button sx={{ margin: 1 }}
              size="small"
              variant="outlined"
              type='submit'
              onClick={() => router.push(`/${company}/signup`)}
            >
              Registrarse
            </Button>

          </Box>
        </Grid>
      </Grid>



    </Box>
  );
}
