import Alert from '@mui/material/Alert';
import { getCookie } from 'cookies-next';


export default function CriticalErrorMessage({ paymentId, criticalError }) {
  return (
    <Alert severity="warning" sx={{ textAlign: "center" }}>
      <div>
        Si tu dinero fue descontado y la compra no fue procesada satisfactoriamente, contacta la linea de soporte de {getCookie("companyName")} {paymentId ? `y <b>presenta el id del pago ${paymentId}</b> . Asegúrate de que los productos que compraste hayan sido creados en tu cuenta correctamente` : ""}
        <br /><br />
        <small>Este error se presenta por un comportamiento inesperado en el servicio externo de la pasarela de pagos</small><br />
        <small>{typeof criticalError === "string" ? criticalError : JSON.stringify(criticalError)}</small>
      </div>
    </Alert>
  )
}
