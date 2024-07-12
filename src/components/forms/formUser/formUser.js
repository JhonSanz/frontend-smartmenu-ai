// import { useState, useRef, useEffect, useContext } from 'react';
// import DynamicForm from '@/components/dynamicForm';
// import * as Yup from 'yup';
// import { useMutation } from '@apollo/client';
// import {
//   ALL_USERS_QUERY,
//   CREATE_USER_MUTATION,
//   UPDATE_USER_MUTATION,
//   DELETE_USER_MUTATION,
// } from '@/graphql/users/users';
// import Confirmation from '@/components/confirmation';
// import Button from '@mui/material/Button';
// import Tablefilters from '@/components/tableFilters';
// import USER_FILTERS from '@/graphql/users/filters';
// import moment from 'moment';
// import { formatDatetimePicker } from '@/utils/dateFormats';
// import { GENRES, ROLES_SELECTOR } from '@/utils/constant';
// import { ThemeContext } from '@/components/providers';
// import { getCookie } from 'cookies-next';
// import BasicTable from '@/components/basicTable';
// import { config } from 'dotenv'; config();
// import world from '@/utils/world';

// const NEXT_REPORTS_URL = process.env.NEXT_PUBLIC_ENV_MODE === "development" ?
//   process.env.NEXT_PUBLIC_REPORTS_URL : process.env.NEXT_PUBLIC_REPORTS_URL_PRODUCTION;

// function CreateUserForm({
//   setIsModalOpen,
//   updateInterface,
// }) {
//   const { setAlertContent } = useContext(ThemeContext);
//   const [createUser] = useMutation(CREATE_USER_MUTATION);
//   const ref = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const triggerSubmit = () => {
//     if (!ref || !ref.current) return;
//     if (!ref.current.isValid()) return;
//     ref.current.submit();
//   }

//   const handleSubmitForm = async (bodyValues) => {
//     const phone = `${bodyValues["country"]["phone"]}%${bodyValues["phone"]}`
//     delete bodyValues["country"];

//     const { data } = await createUser({
//       variables: {
//         input: {
//           ...bodyValues,
//           gender: bodyValues.gender.value,
//           role: bodyValues.role.value,
//           phone
//         }
//       }
//     });

//     if (data.createUser.statusCode !== 200) {
//       setAlertContent(data.createUser.message)
//     }
//     setIsModalOpen(false);
//     updateInterface();
//   }

//   const fields = [
//     {
//       "alias": "Nombre",
//       "name": "name",
//       "type": "string",
//       "default": "",
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Contraseña",
//       "name": "password",
//       "type": "password",
//       "default": "",
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Rol",
//       "name": "role",
//       "type": "choices",
//       "choices": ROLES_SELECTOR,
//       "default": ROLES_SELECTOR.filter(r => r.value === "client")[0],
//       "validators": Yup.object().required("required")
//     },
//     {
//       "alias": "Identificación",
//       "name": "identification",
//       "type": "string",
//       "default": "",
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Email",
//       "name": "email",
//       "type": "string",
//       "default": "",
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "País",
//       "name": "country",
//       "type": "countryPicker",
//       "default": world.find(item => item.name === "CO"),
//       "choices": world,
//       "validators": Yup.object().required("required")
//     },
//     {
//       "alias": "Celular",
//       "name": "phone",
//       "type": "string",
//       "default": "",
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Fecha nacimiento",
//       "name": "birthday",
//       "type": "datetime",
//       "default": moment(),
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Genero",
//       "name": "gender",
//       "type": "choices",
//       "choices": GENRES,
//       "default": GENRES.filter(g => g.value === "F")[0],
//       "validators": Yup.object().required("required")
//     },
//   ]
//   return (
//     <div>
//       <h3>Crear usuario</h3>
//       <DynamicForm ref={ref} fields={fields} submitFunction={handleSubmitForm} setIsSubmitting={setIsSubmitting} />
//       <br />
//       <Button size="small" variant="contained" type='submit' disabled={isSubmitting} onClick={() => triggerSubmit()}>Crear</Button>
//     </div>
//   )
// }

// export default CreateUserForm;


// function UpdateUserForm({
//   setIsModalOpen,
//   currentRow,
//   updateInterface,
//   updateOwnUser = false
// }) {
//   const { setAlertContent } = useContext(ThemeContext);
//   const [updateUser] = useMutation(UPDATE_USER_MUTATION);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const ref = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const triggerSubmit = () => {
//     if (!ref || !ref.current) return;
//     if (!ref.current.isValid()) return;
//     ref.current.submit();
//   }

//   const handleSubmitForm = async (bodyValues) => {
//     console.log(bodyValues)
//     const newData = {...bodyValues};
//     const phone = `${newData["country"]["phone"]}%${newData["phone"]}`
//     delete newData["country"];

//     const { data } = await updateUser({
//       variables: {
//         input: {
//           ...newData,
//           id: parseInt(currentRow.id),
//           gender: newData.gender.value,
//           role: updateOwnUser ? currentRow.role : newData.role.value,
//           token: getCookie("token"),
//           phone
//         }
//       }
//     });
//     if (data.updateUser.statusCode !== 200) {
//       setAlertContent(data.updateUser.message)
//     }
//     setIsModalOpen(false);
//     updateInterface();
//   }

//   let fields = [
//     {
//       "alias": "Nombre",
//       "name": "name",
//       "type": "string",
//       "default": currentRow.name,
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Identificación",
//       "name": "identification",
//       "type": "string",
//       "default": currentRow.identification.split("%")[0],
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Rol",
//       "name": "role",
//       "type": "choices",
//       "choices": ROLES_SELECTOR,
//       "default": ROLES_SELECTOR.filter(r => r.value === currentRow.role)[0],
//       "validators": Yup.object().required("required")
//     },
//     {
//       "alias": "Email",
//       "name": "email",
//       "type": "string",
//       "default": currentRow.email,
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "País",
//       "name": "country",
//       "type": "countryPicker",
//       "default": world.find(item => item.phone === currentRow.phone.split("%")[0]),
//       "choices": world,
//       "validators": Yup.object().required("required")
//     },
//     {
//       "alias": "Celular",
//       "name": "phone",
//       "type": "string",
//       "default": currentRow.phone.split("%")[1],
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Fecha nacimiento",
//       "name": "birthday",
//       "type": "datetime",
//       "default": formatDatetimePicker(currentRow.birthday),
//       "validators": Yup.string().required("required")
//     },
//     {
//       "alias": "Genero",
//       "name": "gender",
//       "type": "choices",
//       "choices": GENRES,
//       "default": GENRES.filter(g => g.value === currentRow.gender)[0],
//       "validators": Yup.object().required("required")
//     },
//   ];

//   if (updateOwnUser) {
//     const fieldsToExclude = ["role"];
//     fields = fields.filter(field => !fieldsToExclude.includes(field.name));
//     // fields = fields.filter(item => item.name !== "role");
//   }

//   return (
//     <div>
//       <h3>Actualizar usuario</h3>
//       <DynamicForm ref={ref} fields={fields} submitFunction={handleSubmitForm} setIsSubmitting={setIsSubmitting} />
//       <br />
//       <Button size="small" variant="contained" type='submit' disabled={isSubmitting} onClick={() => triggerSubmit()}>Aceptar</Button>
//     </div>
//   )
// }

// export { UpdateUserForm };


// function DeleteUser({
//   currentRow,
//   setIsModalOpen,
//   updateInterface
// }) {
//   const { setAlertContent } = useContext(ThemeContext);
//   const [deleteUser] = useMutation(DELETE_USER_MUTATION);

//   async function handleDeleteUser(userId) {
//     const { data } = await deleteUser({
//       variables: { deleteUserId: parseInt(userId) }
//     });
//     if (data.deleteUser.statusCode !== 200) {
//       setAlertContent(data.deleteUser.message)
//     }
//     setIsModalOpen(false);
//     updateInterface();
//   }

//   return (
//     <Confirmation
//       title="Eliminar usuario"
//       description="¿Estás seguro de borrar este usuario?, esto se eliminará toda su información subyacente"
//       onConfirm={() => {
//         handleDeleteUser(currentRow.id);
//         setIsModalOpen(false);
//       }}
//       onCancel={() => setIsModalOpen(false)}
//     />
//   )
// }

// export { DeleteUser };


// function FilterUserForm({
//   filters,
//   handleSetFilters,
//   setIsModalOpen,
// }) {
//   const [fieldsForm, setFieldsForm] = useState([]);

//   function interceptValues(filterValues, clear = false) {
//     if (clear) {
//       handleSetFilters(filterValues);
//       return;
//     }
//     const intercepted = {
//       "filter": {
//         ...filterValues.filter,
//         role: filterValues.filter.role.value
//       }
//     }
//     handleSetFilters(intercepted);
//   }

//   useEffect(() => {
//     async function initialize() {
//       setFieldsForm(
//         [
//           {
//             alias: "Nombre",
//             name: "name",
//             type: "string",
//             default: filters.name || "",
//             validators: Yup.string()
//           },
//           {
//             alias: "Email",
//             name: "email",
//             type: "string",
//             default: filters.email || "",
//             validators: Yup.string()
//           },
//           {
//             alias: "Identificación",
//             name: "identification",
//             type: "string",
//             default: filters.identification || "",
//             validators: Yup.string()
//           },
//           {
//             "alias": "Rol",
//             "name": "role",
//             "type": "choices",
//             "choices": ROLES_SELECTOR,
//             "default": filters.role ? ROLES_SELECTOR.filter(r => r.value === filters.role)[0] : { name: "", value: "" },
//             "validators": Yup.object().required("required")
//           },
//         ]
//       )
//     }
//     initialize();
//   }, []);

//   return (
//     <>
//       {
//         fieldsForm.length > 0 && <Tablefilters
//           filters={fieldsForm}
//           handleSetFilters={interceptValues}
//           setIsModalOpen={setIsModalOpen}
//           defaultTableValues={USER_FILTERS}
//         />
//       }
//     </>
//   )
// }

// export { FilterUserForm };

// //---
// function UpdateImageUser({
//   setIsModalOpen,
//   currentRow,
//   updateInterface
// }) {

//   const [updateUser] = useMutation(UPDATE_USER_MUTATION);
//   const ref = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const triggerSubmit = () => {
//     if (!ref || !ref.current) return;
//     if (!ref.current.isValid()) return;
//     ref.current.submit();
//   }

//   const handleSubmitForm = async (bodyValues) => {
//     const { data } = await updateUser({
//       variables: {
//         input: {
//           id: parseInt(currentRow.id),
//           media_url: bodyValues.logo.data.Location,
//           token: getCookie("token")
//         }
//       }
//     });
//     setIsModalOpen(false);
//     updateInterface();
//   }


//   let fields = [
//     {
//       "name": "logo",
//       "type": "fileUpload",
//       "display": currentRow.images?.find(i => i.type === "logo")?.url
//     }
//   ];

//   return (
//     <div>
//       <h3>Actualizar Imagen</h3>
//       <DynamicForm ref={ref} fields={fields} submitFunction={handleSubmitForm} setIsSubmitting={setIsSubmitting} />
//       <br />
//       <Button size="small" variant="contained" type='submit' disabled={isSubmitting} onClick={() => triggerSubmit()}>Aceptar</Button>
//     </div>
//   )
// }

// export { UpdateImageUser };

// function DisplayDataError({ data, msg }) {
//   const columns = data.length === 0 ? null : Object.keys(data[0]);
//   return (
//     <div>
//       <h4>{msg}</h4>
//       {
//         data.length > 0 && columns && (
//           <BasicTable
//             cols={columns}
//             rows={data}
//           />
//         )
//       }
//     </div>
//   )
// }


// function ImportUsersFromFile({
//   updateInterface,
//   setIsModalOpen
// }) {
//   const { setAlertContent } = useContext(ThemeContext);
//   const ref = useRef(null);
//   const [disableButton, setDisableButton] = useState(false);

//   const triggerSubmit = () => {
//     if (!ref || !ref.current) return;
//     if (!ref.current.isValid()) return;
//     ref.current.submit();
//   }

//   const handleSubmitForm = async (bodyValues) => {
//     setDisableButton(true);
//     if (!bodyValues["file"]) return;
//     const formData = new FormData();
//     formData.append('file', bodyValues["file"]);

//     let response = await fetch(`${NEXT_REPORTS_URL}/import-users`, {
//       method: "POST",
//       headers: {
//         'Authorization': `Bearer ${getCookie("token")}`
//       },
//       body: formData
//     });
//     response = await response.json()
//     if (!response.ok) {
//       const data = JSON.parse(response.data.replaceAll("'", "\""));
//       setAlertContent(<DisplayDataError data={data.data} msg={data.msg} />)
//       setIsModalOpen(false);
//       return;
//     }
//     updateInterface();
//     setIsModalOpen(false);
//     setDisableButton(false);
//   }

//   const fields = [
//     {
//       "name": "file",
//       "type": "genericfilepicker",
//     }
//   ]

//   return (
//     <>
//       <h3>Importar Usuarios</h3>
//       <p>Aqui puedes crear <b>rápidamente</b> tus usuarios a partir de un archivo de excel. Sigue estas instrucciones:</p>
//       <ol>
//         <li>Descarga el formato que tenemos preparados para ti: <a href="https://yoxdo-assets.s3.amazonaws.com/utils/users_format.xlsx" target='_blank'>formato.xlsx</a></li>
//         <li>Abre el archivo con cualquier editor de hojas de cálculo</li>
//         <li>Rellena la información de tus usuarios en cada fila</li>
//       </ol>
//       <h3 style={{ color: "red" }}>Importante</h3>
//       <div style={{ border: "1px dotted gray", borderRadius: 10, padding: 20 }}>
//         <p>Para que todo funcione es necesario cumplir las siguentes reglas:</p>
//         <ol>
//           <li>El nombre de las columnas <b>no se puede modificar</b>, rellena solo la información de los usuarios</li>
//           <li>Todos los campos son requeridos</li>
//           <li>Las fechas deben tener el siguiente formato Año-Mes-Dia, por ejemplo: <b>1991-01-28</b></li>
//           <li>Los correos electrónicos deben ser válidos</li>
//           <li>El género admite las opciones <b>F, M, X</b></li>
//         </ol>
//       </div>
//       <p>Una vez hayas completado toda la información de los usuarios haz click en el botón <b>Upload File</b> y luego en el botón <b>Aceptar</b>.</p>
//       <DynamicForm
//         ref={ref}
//         fields={fields}
//         submitFunction={handleSubmitForm}
//       />
//       <br />
//       <Button
//         size="small"
//         variant="contained"
//         type='submit'
//         disabled={disableButton}
//         onClick={() => triggerSubmit()}
//       >Aceptar</Button>
//     </>
//   )
// }

// export { ImportUsersFromFile };