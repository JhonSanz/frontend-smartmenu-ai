import React, { useState, useRef, useEffect, useContext } from 'react';
import DynamicForm from '@/components/dynamicForm';
import * as Yup from 'yup';
import Confirmation from '@/components/confirmation';
import { formatDatetimePicker } from '@/utils/dateFormats';
import Button from '@mui/material/Button';
import Tablefilters from '@/components/tableFilters';
import moment from 'moment-timezone';
import { getCookie } from 'cookies-next';
import { ThemeContext } from '@/components/providers';


const userTimezone = getCookie("timezone")


function CreateMediaForm({
  setIsModalOpen,
  updateInterface,
}) {
  const { setAlertContent } = useContext(ThemeContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  }, [])

  useEffect(() => {
    async function initialize() {
    }
    initialize();
  }, []);

  const ref = useRef(null);

  const triggerSubmit = () => {
    if (!ref || !ref.current) return;
    if (!ref.current.isValid()) return;
    ref.current.submit();
  }

  const handleSubmitForm = async (bodyValues) => {
    setIsDisabled(true);
    console.log(bodyValues)
    const res = null; // TODO: call backend
    if (res !== 200) {
    }
    setIsModalOpen(false);
    updateInterface();
  }

  const fieldsForm = [
    {
      "alias": "Nombre",
      "name": "name",
      "type": "string",
      "default": "",
      "validators": Yup.string().required("required")
    },
    {
      "name": "menu",
      "type": "fileUpload"
    }
  ]

  return (
    <div>
      <h3>Crear nuevo archivo</h3>
      {
        fieldsForm.length > 0 && <DynamicForm
          ref={ref}
          fields={fieldsForm}
          submitFunction={handleSubmitForm}
          setIsSubmitting={setIsSubmitting}
        />
      }
      <br />
      <Button
        size="small"
        variant="contained"
        type='submit'
        disabled={isSubmitting || isDisabled}
        onClick={() => triggerSubmit()}
      >Crear</Button>
    </div>
  )
}

export default CreateMediaForm;


function UpdateMediaForm({
  setIsModalOpen,
  currentRow,
  updateInterface,
}) {
  const { setAlertContent } = useContext(ThemeContext);
  const ref = useRef(null);
  const [fieldsForm, setFieldsForm] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerSubmit = () => {
    if (!ref || !ref.current) return;
    if (!ref.current.isValid()) return;
    ref.current.submit();
  }

  const handleSubmitForm = async (bodyValues) => {
    setIsDisabled(true);
    console.log(bodyValues)
    const res = null; // TODO: call backend
    if (res !== 200) {
    }
    setIsModalOpen(false);
    updateInterface();
  }

  useEffect(() => {
    async function initialize() {
      setFieldsForm(
        [
          {
            "alias": "Nombre",
            "name": "name",
            "type": "string",
            "default": currentRow.name,
            "validators": Yup.string().required("required")
          },
          {
            "name": "menu",
            "type": "fileUpload",
            "display": currentRow.url
          }
        ]
      )
    }
    initialize();
  }, []);

  return (
    <div>
      <h3>Actualizar pago</h3>
      {
        fieldsForm.length > 0 && <DynamicForm
          ref={ref}
          fields={fieldsForm}
          submitFunction={handleSubmitForm}
          setIsSubmitting={setIsSubmitting}
        />
      }
      <br />
      <Button
        size="small"
        variant="contained"
        type='submit'
        disabled={isSubmitting}
        onClick={() => triggerSubmit()}
      >Aceptar</Button>
    </div>
  )
}

export { UpdateMediaForm };


function DeleteMedia({
  currentRow,
  setIsModalOpen,
  updateInterface
}) {
  const { setAlertContent } = useContext(ThemeContext);

  async function handleDeleteMedia(planId) {
    console.log(planId)
    const res = null; // TODO: call backend
    if (res !== 200) {
      setAlertContent("pailander")
    }
    setIsModalOpen(false);
    updateInterface();
  }

  return (
    <Confirmation
      title="Eliminar archivo"
      description="¿Está seguro de que desea eliminar este archivo?"
      onConfirm={() => {
        handleDeleteMedia(currentRow.id);
        setIsModalOpen(false);
      }}
      onCancel={() => setIsModalOpen(false)}
    />
  )
}

export { DeleteMedia };


// function FilterMediaForm({
//   filters,
//   handleSetFilters,
//   setIsModalOpen,
// }) {
//   const apolloClient = useApolloClient();
//   const [fieldsForm, setFieldsForm] = useState([]);

//   function interceptValues(filterValues, clear = false) {
//     if (clear) {
//       handleSetFilters(filterValues);
//       return;
//     }
//     const intercepted = {
//       "filter": {
//         amount: filterValues.filter.amount,
//         media_date: [
//           filterValues.filter["media_date-start"],
//           filterValues.filter["media_date-end"]
//         ],
//         customerId: filterValues.filter.userId.value || null,
//         planId: filterValues.filter.planId.value || null,
//         onlyBundleOrPlan: true,
//       }
//     }
//     handleSetFilters(intercepted);
//   }

//   const [usersData, setUsersData] = useState({
//     loading: false,
//     error: false,
//     data: []
//   })
//   async function getUsers(currentText) {
//     summaryzedGetUser(apolloClient, setUsersData, currentText)
//   }

//   const [plansData, setPlansData] = useState({
//     loading: false,
//     error: false,
//     data: []
//   })
//   async function getPlans() {
//     summaryzedGetPlan(apolloClient, setPlansData)
//   }

//   const [mediaFiltersData, setMediaFiltersData] = useState({
//     loading: false,
//     error: false,
//     data: {}
//   })
//   async function getMediaFilters() {
//     const { data, loading, error } = await apolloClient.query({
//       query: FILTERS_PAYMENT_QUERY,
//       fetchPolicy: "network-only"
//     });
//     setMediaFiltersData({
//       loading,
//       error,
//       data: data.getMediaFilterValues.result
//     })
//   }

//   useEffect(() => {
//     async function init() {
//       await getPlans();
//       await getMediaFilters();
//     }
//     init();
//   }, [])

//   useEffect(() => {
//     async function initialize() {
//       setFieldsForm(
//         [
//           {
//             "alias": "Usuario",
//             "name": "userId",
//             "type": "asyncChoices",
//             "choices": usersData.data,
//             "default": filters.userId || { name: "", value: "" },
//             "optionsGetter": getUsers,
//             "validators": Yup.object().required("required"),
//           },
//           {
//             "alias": "Plan",
//             "name": "planId",
//             "type": "choices",
//             "choices": plansData.data,
//             "default": { name: "", value: "" },
//             "validators": Yup.object()
//           },
//           {
//             "alias": "Fecha",
//             "name": "media_date",
//             "type": "daterange",
//             "default": filters.media_date || [moment.tz(userTimezone).startOf("month"), moment.tz(userTimezone).endOf("month")],
//             "validators": Yup.string()
//           },
//           {
//             "alias": "Total pagado",
//             "name": "amount",
//             "type": "range",
//             "default": filters.amount || [0, mediaFiltersData.data.maxAmount],
//             "validators": Yup.number(),
//             "max": mediaFiltersData.data.maxAmount,
//             "step": 1
//           },
//         ]
//       )
//     }
//     initialize();
//   }, [mediaFiltersData, usersData.data, plansData.data]);

//   return (
//     <>
//       {
//         fieldsForm.length > 0 && <Tablefilters
//           filters={fieldsForm}
//           handleSetFilters={interceptValues}
//           setIsModalOpen={setIsModalOpen}
//           defaultTableValues={{
//             "filter": {
//               ...PAYMENT_FILTERS.filter,
//               onlyBundleOrPlan: true
//             }
//           }}
//         />
//       }
//     </>
//   )
// }

// export { FilterMediaForm };