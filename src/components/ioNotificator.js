"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Button from '@mui/material/Button';
import { closeSnackbar, useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { adminRoutes } from '@/utils/allRoutes';
import { socket } from '@/utils/socket';
import { useParams } from 'next/navigation';

function IoNotificator() {
  const { enqueueSnackbar } = useSnackbar();
  const pathname = usePathname();
  const { company } = useParams();

  const action = snackbarId => (
    <>
      <CloseIcon
        style={{ cursor: "pointer" }}
        onClick={() => { closeSnackbar(snackbarId) }}
      />
    </>
  );

  useEffect(() => {
    if (socket === null) return;
    let path = pathname.split(`/${company}/`)[1];
    if (!adminRoutes.map(url => `admin/${url}`).includes(path)) return;

    socket.emit('joinRoom', company);
    socket.on('notification', (data) => {
      enqueueSnackbar(data, { action });
    });
    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div>
      <Button onClick={() => socket.emit('ping', "Dámelo")} style={{ display: "none" }}>
        emit ping
      </Button>
    </div>
  );
};

export default IoNotificator;
