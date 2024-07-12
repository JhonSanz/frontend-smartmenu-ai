"use client"

import { useRef, useEffect, useState, useContext } from 'react';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DynamicForm from '@/components/dynamicForm';
import { GENRES } from '@/utils/constant';
import moment from 'moment';
import { useRouter, useParams } from "next/navigation";
import { ThemeContext } from '@/components/providers';
import Box from '@mui/material/Box';
import world from '@/utils/world';


export default function SignUp() {
  const { setAlertContent } = useContext(ThemeContext);

  const ref = useRef(null);
  const passwordRef = useRef(null);
  const [step, setStep] = useState(1);
  const [disableButton, setDisableButton] = useState(false);
  const [userFormData, setUserFormData] = useState({});
  const router = useRouter();
  const [currentCompany, setCurrentCompany] = useState('');
  const { company } = useParams();

  const loginFormFields = [
    {
      "alias": "Nombre",
      "name": "name",
      "type": "string",
      "default": userFormData.name || "",
      "validators": Yup.string().required("required")
    },
    {
      "alias": "Identificación",
      "name": "identification",
      "type": "string",
      "default": userFormData.identification || "",
      "validators": Yup.string().required("required")
    },
    {
      "alias": "Email",
      "name": "email",
      "type": "string",
      "default": userFormData.email || "",
      "validators": Yup.string().required("required")
    },
    {
      "alias": "País",
      "name": "country",
      "type": "countryPicker",
      "default": world.find(item => item.name === "CO"),
      "choices": world,
      "validators": Yup.object().required("required")
    },
    {
      "alias": "Celular",
      "name": "phone",
      "type": "string",
      "default": userFormData.phone || "",
      "validators": Yup.string().required("required")
    },
    {
      "alias": "Fecha nacimiento",
      "name": "birthday",
      "type": "datetime",
      "default": userFormData.birthday || moment(),
      "validators": Yup.string().required("required")
    },
    {
      "alias": "Genero",
      "name": "gender",
      "type": "choices",
      "choices": GENRES,
      "default": userFormData.gender || GENRES.filter(g => g.value === "F")[0],
      "validators": Yup.object().required("required")
    },
  ]

  const passwordForm = [
    {
      "alias": "Contraseña",
      "name": "passwordPicker",
      "type": "passwordPicker",
    }
  ]

  const triggerSubmit = () => {
    if (!ref || !ref.current) return;
    if (!ref.current.isValid()) return;
    ref.current.submit();
  }

  const triggerSubmitPassword = () => {
    if (!passwordRef || !passwordRef.current) return;
    if (!passwordRef.current.isValid()) return;
    passwordRef.current.submit();
  }

  const handleSubmitForm = async (bodyValues) => {
    // TODO: CODE SIGNUP
  }

  async function getMyCompany() {
    // TODO: CODE FETCH COMPANY
  }

  useEffect(() => {
    async function initial() {
      await getMyCompany()
    }
    if (company) initial();
  }, [company])


  return (
    <Grid
      display="flex"
      container justifyContent="center" height="100vh" alignItems="center"
      alignContent="center"
      sx={{
        padding: {
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: 6,
        }
      }}
    >
      <Grid item xs={12} md={6}
        display="flex" justifyContent="center" alignItems="center" textAlign="center"
      >
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
        {/* TODO: ACTIVAR ESTO */}
        {/* <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eum autem nulla odio temporibus aut ratione, aperiam deleniti dignissimos omnis nam reiciendis, hic numquam cumque iusto dolore natus deserunt. Nesciunt?
      Illo at labore unde nam eum rerum dolore nostrum est, aliquid sint porro. Quisquam dicta maiores inventore asperiores dolorum similique. Repellat voluptates voluptatem numquam atque ipsam aliquam, corrupti excepturi fugit!
      Dolorem illo totam impedit ex voluptatibus porro cupiditate voluptatem eveniet non eaque.</p> */}
      </Grid>
      <Grid item xs={12} md={6}
        display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center"
      >
        {
          step === 1 && <>
            <DynamicForm ref={ref} fields={loginFormFields} submitFunction={handleSubmitForm} />
            <Box display="flex" flexDirection="row" >
              <Button
                sx={{ margin: 1 }}
                size="small"
                variant="outlined"
                type='submit'
                onClick={() => router.push(`/${company}/login`)}
              >Salir</Button>
              <Button
                sx={{ margin: 1 }}
                size="small"
                variant="contained"
                type='submit'
                onClick={() => triggerSubmit()}
              >Siguiente</Button>
            </Box>
          </>
        }
        {
          step === 2 && <>
            <DynamicForm ref={passwordRef} fields={passwordForm} submitFunction={handleSubmitForm} />
            <Box display="flex" flexDirection="row" >
              <Button
                sx={{ margin: 1 }}
                size="small"
                variant="outlined"
                type='submit'
                onClick={() => setStep(1)}
              >Atras</Button>
              <Button
                sx={{ margin: 1 }}
                size="small"
                variant="contained"
                type='submit'
                onClick={() => triggerSubmitPassword()}
                disabled={disableButton}
              >Registrarme</Button>
            </Box>
          </>
        }
      </Grid>
    </Grid>
  )
}
