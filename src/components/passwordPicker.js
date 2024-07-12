"use client";

import Box from "@mui/material/Box"
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


function PasswordPicker({
  formik
}) {
  return (
    <Box>
      <TextField
        margin='dense'
        required={true}
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Escribe tu contraseña"
        onChange={formik.handleChange}
        value={formik.values["password"]}
        fullWidth
      />
      <TextField
        margin='dense'
        required={true}
        type="password"
        label="Confirmación de contraseña"
        name="passwordConfirmation"
        placeholder="Escribe de nuevo tu contraseña"
        onChange={formik.handleChange}
        value={formik.values["passwordConfirmation"]}
        fullWidth
      />
      {
        (formik.errors["password"] || formik.errors["passwordConfirmation"]) &&
        <Alert severity="error">{formik.errors["password"] || formik.errors["passwordConfirmation"]}</Alert>
      }
    </Box>
  )
}

export default PasswordPicker;
