"use client";

import { useState, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Payment } from "@mercadopago/sdk-react";
import { useRouter, useParams } from "next/navigation";
import CriticalErrorMessage from "@/utils/critialErrorMercadopago";


const PAYMENT_URL = process.env.NEXT_PUBLIC_ENV_MODE === "development" ?
  process.env.NEXT_PUBLIC_PAYMENT_URL : process.env.NEXT_PUBLIC_PAYMENT_URL_PRODUCTION;


const MERCADOPAGO_CALLBACK_URL = process.env.NEXT_PUBLIC_ENV_MODE === "development" ?
  process.env.NEXT_PUBLIC_MERCADOPAGO_CALLBACK_URL : process.env.NEXT_PUBLIC_MERCADOPAGO_CALLBACK_URL_PRODUCTION;


export default function MercadoPagoPaymentBrick({ productData, mercadopagoCredentials }) {
  const { company } = useParams();
  const [criticalError, setCriticalError] = useState(null);

  const router = useRouter();

  const initialization = {
    amount: productData.amount,
    payer: {
      firstName: "",
      lastName: "",
      email: "",
      entityType: "individual",
    },
  };

  const customization = {
    visual: {
      style: {
        theme: "default",
      },
    },
    paymentMethods: {
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
    },
  };


  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    return new Promise((resolve, reject) => {
      const submitRoute = `${PAYMENT_URL}/mercadopago-brick-payment/${company}`;
      try {
        formData.additional_info = {};
        formData.additional_info.ip_address = "127.0.0.1";
        formData.callback_url = `${MERCADOPAGO_CALLBACK_URL}/${company}/user/payment-callback`;
        formData.description = productData.description;
        formData.metadata = productData;
        formData.notification_url = `${PAYMENT_URL}/webhook/${company}`;

        fetch(submitRoute, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((response) => {
            router.push(`/${company}/user/payment-callback?payment_id=${response.id}`)
            resolve();
          })
          .catch((error) => {
            console.log("promise", error)
            if (criticalError === null) setCriticalError(error);
            reject();
          });
      } catch (error) {
        console.log("catch", error)
        if (criticalError === null) setCriticalError(error);
      }
    });
  };

  const onError = async (error) => {
    console.log("onError", error)
    if (criticalError === null) setCriticalError(error);

  };

  const onReady = async () => {
    console.log("brick cargado", productData);
  };

  useEffect(() => {
    if (mercadopagoCredentials) {
      initMercadoPago(mercadopagoCredentials, { locale: "es-CO" });
    }
  }, [mercadopagoCredentials]);

  return (
    <>
      {
        !mercadopagoCredentials && <h1>Los pagos no fueron habilitados en este comercio</h1>
      }
      {
        mercadopagoCredentials && (
          <>
            <Payment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
            {
              criticalError && <CriticalErrorMessage criticalError={criticalError} />
            }
          </>
        )
      }
    </>
  );
}
