"use client";

import Button from '@mui/material/Button';
import { useState } from "react";


function Confirmation({
  title,
  description,
  onConfirm,
  onCancel,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="d-flex">
        <Button size="small" variant="outlined" color="error" sx={{ marginRight: "10px" }} onClick={onCancel}>Cancelar</Button>
        <Button size="small" variant="contained" disabled={isSubmitting} onClick={()=>{setIsSubmitting(true); onConfirm()}}>Aceptar</Button>
      </div>
    </div>
  )
}

export default Confirmation;
