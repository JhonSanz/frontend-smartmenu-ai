import { useState, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { StatusScreen } from "@mercadopago/sdk-react";
import Button from '@mui/material/Button';
import { useRouter, useParams } from "next/navigation";
import Box from "@mui/material/Box";
import CriticalErrorMessage from "@/utils/critialErrorMercadopago";


export default function MercadoPagoPaymentStatusBrick({
  paymentId,
  mercadopagoCredentials
}) {
  const [criticalError, setCriticalError] = useState(null);
  const router = useRouter();
  const { company } = useParams();

  const initialization = {
    paymentId, // id de pago para mostrar
  };

  const customization = {
    visual: {
      style: {
        theme: 'default', // 'default' | 'dark' | 'bootstrap' | 'flat'
      }
    },
    backUrls: {
      // 'error': '<http://<your domain>/error>',
      'return': "https://google.com"
    }
  };


  const onError = async (error) => {
    if (criticalError === null) setCriticalError(error);
  };
  const onReady = async () => {
    // window.paymentBrickController && window.paymentBrickController.unmount();
    console.log("brick cargado");
  };

  useEffect(() => {
    if (mercadopagoCredentials) {
      initMercadoPago(mercadopagoCredentials, { locale: "es-CO" });
    }
  }, [mercadopagoCredentials]);


  return (
    <>
      {
        mercadopagoCredentials && <div style={{ padding: 100 }}>
          <StatusScreen
            initialization={initialization}
            customization={customization}
            onReady={onReady}
            onError={onError}
          />
          {
            criticalError && <CriticalErrorMessage paymentId={paymentId} criticalError={criticalError} />
          }
          <Box width={"100%"} justifyContent="center" display="flex" pt={3}>
            <Button
              size="small"
              variant="contained"
              type='submit'
              color="primary"
              onClick={() => router.push(`/${company}/user/pagos`)}
            >Mis pagos</Button>
            <Button
              size="small"
              variant="contained"
              type='submit'
              color="secondary"
              style={{ marginLeft: 10, marginRight: 10 }}
              onClick={() => router.push(`/${company}/user/dashboard`)}
            >Horario</Button>
            <Button
              size="small"
              variant="contained"
              type='submit'
              color="success"
              onClick={() => router.push(`/${company}/user/comprar`)}
            >Comprar</Button>
          </Box>
        </div>
      }
    </>
  );
}
