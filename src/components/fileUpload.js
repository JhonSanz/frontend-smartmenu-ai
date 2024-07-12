"use client";

import { forwardRef, useState, useImperativeHandle } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uploadImageToS3 from '@/aws/s3';
import moment from 'moment-timezone';
import { useParams } from 'next/navigation';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


function TextDisplaying({ text, isError }) {
  return (
    <small style={{
      color: isError && "red",
      width: "178px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    }}
    >{text}</small>
  )
}

const InputFileUpload = forwardRef(function InputFileUpload({ fieldName, display }, ref) {
  const [imageFile, setImageFile] = useState(null);
  const [errorFileType, setErrorFileType] = useState(null);
  const { company } = useParams();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) {
          setErrorFileType(null);
          setImageFile(file);
        } else {
          setErrorFileType('La imagen seleccionada es demasiado grande. Por favor, selecciona una imagen más pequeña.');
          setImageFile(null);
        }
      } else {
        setErrorFileType('Por favor selecciona un archivo de imagen.');
        setImageFile(null);

      }
    }
  };

  const handleUpload = async () => {
    if (imageFile) {
      try {
        const fileName = `${company}/${moment().unix()}_${imageFile.name}`;
        const imageUrl = await uploadImageToS3(imageFile, fileName);
        return { ...imageUrl, fieldName };
      } catch (error) {
        return { ...error, fieldName };
      }
    } else {
      return {
        ok: true,
        fieldName,
        data: 'No se ha seleccionado ningún archivo.'
      };
    }
  };

  useImperativeHandle(ref, () => {
    return {
      async handleUploadFile() {
        return await handleUpload();
      },
    };
  }, [imageFile]);

  return (
    <Box sx={{ paddingTop: "10px" }}>
      <Grid container>
        {
          display && (
            <Grid item alignItems="center" display="flex">
              <img
                style={{ width: "50px", marginRight: "5px", cursor: "pointer" }}
                src={display}
                alt={display}
                loading="lazy"
                onClick={() => window.open(display, "_blank")}
              />
            </Grid>
          )
        }
        {
          !display && (
            <Grid item alignItems="center" display="flex">
              <div style={{ height: "100%", marginRight: "5px", backgroundColor: "#dadada" }}>
                <small>
                  Sin imagen
                </small>
              </div>
            </Grid>
          )
        }
        <Grid item alignItems="center" display="flex">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          <br />
          {
            !errorFileType && imageFile && <TextDisplaying text={imageFile.name} isError={false} />
          }
          {
            errorFileType && <TextDisplaying text={errorFileType} isError={true} />
          }
        </Grid>
      </Grid>
    </Box>
  );
})

export default InputFileUpload;
