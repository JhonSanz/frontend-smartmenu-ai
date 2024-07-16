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

  const [usersData, setUsersData] = useState({
    loading: false,
    error: false,
    data: []
  })

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
        disabled={isSubmitting}
        onClick={() => triggerSubmit()}
      >Crear</Button>
    </div>
  )
}

export default CreateMediaForm;


// function UpdateMediaForm({
//   setIsModalOpen,
//   currentRow,
//   updateInterface,
// }) {
//   const { setAlertContent } = useContext(ThemeContext);
//   const apolloClient = useApolloClient();
//   const [updateMedia] = useMutation(UPDATE_PAYMENT_MUTATION);
//   const ref = useRef(null);
//   const [fieldsForm, setFieldsForm] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const triggerSubmit = () => {
//     if (!ref || !ref.current) return;
//     if (!ref.current.isValid()) return;
//     ref.current.submit();
//   }

//   const handleSubmitForm = async (bodyValues) => {
//     const { data } = await updateMedia({
//       variables: {
//         ...bodyValues,
//         id: parseInt(currentRow.id),
//         planId: parseInt(bodyValues.planId.value),
//         userId: parseInt(bodyValues.userId.value),
//         amount: bodyValues.planId.price
//       }
//     });
//     if (data.updateMedia.statusCode !== 200) {
//       setAlertContent(data.updateMedia.message)
//     }
//     setIsModalOpen(false);
//     updateInterface();
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

//   const [bundlesData, setBundlesData] = useState({
//     loading: false,
//     error: false,
//     data: []
//   })
//   async function getBundle() {
//     summaryzedGetBundle(apolloClient, setBundlesData)
//   }

//   useEffect(() => {
//     async function init() {
//       await getPlans();
//       await getBundle();
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
//             "default": {
//               name: `${currentRow.user.identification} ${currentRow.user.name} ${currentRow.user.email}`,
//               value: parseInt(currentRow.user.id)
//             },
//             "optionsGetter": getUsers,
//             "validators": Yup.object().required("required"),
//           },
//           {
//             "alias": "Plan",
//             "name": "planId",
//             "type": "choices",
//             "choices": plansData.data,
//             "default": currentRow.plan ? { name: currentRow.plan.name, value: parseInt(currentRow.plan.id) } : { name: "", value: "" },
//             "validators": Yup.object().required("required")
//           },
//           {
//             "alias": "Paquete",
//             "name": "bundleId",
//             "type": "choices",
//             "choices": bundlesData.data,
//             "default": currentRow.bundle ? { name: currentRow.bundle.name, value: parseInt(currentRow.bundle.id) } : { name: "", value: "" },
//             "validators": Yup.object().required("required")
//           },
//           {
//             "alias": "Fecha",
//             "name": "media_date",
//             "type": "datetime",
//             "default": formatDatetimePicker(currentRow.media_date),
//             "validators": Yup.string().required("required")
//           }
//         ]
//       )
//     }
//     initialize();
//   }, [usersData.data, plansData.data, bundlesData.data]);

//   return (
//     <div>
//       <h3>Actualizar pago</h3>
//       {
//         fieldsForm.length > 0 && <DynamicForm
//           ref={ref}
//           fields={fieldsForm}
//           submitFunction={handleSubmitForm}
//           setIsSubmitting={setIsSubmitting}
//         />
//       }
//       <br />
//       <Button size="small" variant="contained" type='submit' disabled={isSubmitting} onClick={() => triggerSubmit()}>Aceptar</Button>
//     </div>
//   )
// }

// export { UpdateMediaForm };


// function DeleteMedia({
//   currentRow,
//   setIsModalOpen,
//   updateInterface
// }) {
//   const { setAlertContent } = useContext(ThemeContext);
//   const [deleteMedia] = useMutation(DELETE_PAYMENT_MUTATION);

//   async function handleDeleteMedia(planId) {
//     const { data } = await deleteMedia({
//       variables: { deleteMediaId: parseInt(planId) }
//     });
//     if (data.deleteMedia.statusCode !== 200) {
//       setAlertContent(data.deleteMedia.message)
//     }
//     setIsModalOpen(false);
//     updateInterface();
//   }

//   return (
//     <Confirmation
//       title="Eliminar pago"
//       description="¿Está seguro de que desea eliminar este pago?"
//       onConfirm={() => {
//         handleDeleteMedia(currentRow.id);
//         setIsModalOpen(false);
//       }}
//       onCancel={() => setIsModalOpen(false)}
//     />
//   )
// }

// export { DeleteMedia };


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