"use client";

import { useRef } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DynamicForm from '@/components/dynamicForm';
import { useState } from "react";


export default function Tablefilters({
  filters,
  handleSetFilters,
  setIsModalOpen,
  defaultTableValues,
  hideButtons = false
}) {
  const ref = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmitForm(bodyValues) {
    const finalFilters = { "filter": { ...bodyValues } }
    handleSetFilters(finalFilters);
  }

  const triggerSubmit = () => {
    if (!ref || !ref.current) return;
    if (!ref.current.isValid()) return;
    ref.current.submit();
    setIsModalOpen(false);
  }

  const triggerClear = () => {
    if (!ref || !ref.current) return;
    if (!ref.current.isValid()) return;
    handleSetFilters(defaultTableValues, true);
    setIsModalOpen(false);
  }

  return (
    <Grid>
      <DynamicForm ref={ref} fields={filters} submitFunction={handleSubmitForm} />
      {
        !hideButtons && (
          <>
            <Button
              sx={{ marginTop: 2, marginRight: 2 }}
              size="small"
              variant="contained"
              type='submit'
              disabled={isSubmitting}
              onClick={() => { setIsSubmitting(true); triggerSubmit(); }}
            >Filtrar</Button>
            <Button
              sx={{ marginTop: 2 }}
              size="small"
              variant="outlined"
              type='submit'
              disabled={isSubmitting}
              onClick={() => { setIsSubmitting(true); triggerClear(); }}
            >Limpiar filtros</Button>
          </>
        )
      }
    </Grid>
  )
}
