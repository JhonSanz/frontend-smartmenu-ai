"use client";

import { useRef, useEffect, useState, useContext } from 'react';
import { useRouter, useParams } from "next/navigation";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from "@/components/table";

import fetchBackend from '@/utils/fetchBackend';
import { ThemeContext } from '@/components/providers';
import { PAGE_SIZE } from '@/utils/constant';
import CreateMediaForm, { UpdateMediaForm, DeleteMedia } from '@/components/forms/formMedia/formMedia';
import { containerButtonsStyles, buttonStyles } from '@/styles/buttonBoxStyles';
import Modal from '@/components/modal';


export default function Media() {
  const { setAlertContent } = useContext(ThemeContext);
  const ref = useRef(null);
  const router = useRouter();
  const { company } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      headerName: "id",
      field: "id",
      width: 20,
    },
    {
      headerName: "Name",
      field: "name",
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: "Url",
      field: "url",
      flex: 1,
      minWidth: 100,
    },
  ]

  const mediaRequestRes = [
    {
      id: 1,
      name: "menu 1",
      url: "http://accioneduca.org/admin/archivos/modulos/ayudanos/prueba.pdf"
    },
    {
      id: 2,
      name: "menu 2",
      url: "https://img.freepik.com/vector-gratis/tarjeta-felicitacion-dia-mundial-sonrisa-texto-o-vector-espacio-vacio_1017-46370.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1719273600&semt=ais_user"
    },
    {
      id: 3,
      name: "menu 3",
      url: "https://img.freepik.com/vector-gratis/tarjeta-felicitacion-dia-mundial-sonrisa-texto-o-vector-espacio-vacio_1017-46370.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1719273600&semt=ais_user"
    },
    {
      id: 4,
      name: "menu 4",
      url: "https://img.freepik.com/vector-gratis/tarjeta-felicitacion-dia-mundial-sonrisa-texto-o-vector-espacio-vacio_1017-46370.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1719273600&semt=ais_user"
    }
  ]

  const mediaData = {
    data: mediaRequestRes,
    count: mediaRequestRes.length
  }

  const performAction = (action, row) => {
    let formOption = null;
    switch (action) {
      case "create":
        formOption = <CreateMediaForm
          setIsModalOpen={setIsModalOpen}
          updateInterface={getMedia}
        />
        break;
      case "edit":
        formOption = <UpdateMediaForm
          setIsModalOpen={setIsModalOpen}
          currentRow={row}
          updateInterface={getMedia}
        />
        break;
      case "delete":
        formOption = <DeleteMedia
          currentRow={row}
          setIsModalOpen={setIsModalOpen}
          updateInterface={getMedia}
        />
        break;
      // case "filter":
      //   formOption = <FilterPlanForm
      //     filters={filters.filter}
      //     handleSetFilters={setFilters}
      //     setIsModalOpen={setIsModalOpen}
      //   />
      //   break;
      default:
        return;
    }
    if (formOption === null) return;
    setModalOption(formOption);
    setIsModalOpen(true);
  }

  async function getMedia() {
    setLoading(true);
    console.log("llamando al backend")
    setLoading(false);
  }

  useEffect(() => {
  }, [])

  return (
    <Box p={4}>
      <Box {...containerButtonsStyles} >
        <Button {...buttonStyles} size="small" variant="contained" onClick={() => performAction("create")}>Crear</Button>
        <Button {...buttonStyles} size="small" variant="outlined" onClick={() => performAction("filter")}>Filtrar</Button>
      </Box>
      <Table
        columns={columns}
        rowOptions={performAction}
        rows={mediaData.data || []}
        count={mediaData.count || 0}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
        loading={loading}
      />
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        children={modalOption}
      />
    </Box>
  );
}
