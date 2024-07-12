import { forwardRef, useState, useImperativeHandle } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


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

const GenericFilePicker = forwardRef(function GenericFilePicker({ }, ref) {
  const [pickedFile, setPickedFile] = useState(null);
  const [errorFileType, setErrorFileType] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["application/vnd.ms-excel", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

    if (file && allowedTypes.includes(file.type)) {
      setPickedFile(file);
      setErrorFileType(null);
    } else {
      setPickedFile(null);
      setErrorFileType("Please select a .xlsx or .csv file.");
    }
  };

  const handleUpload = async () => {
    if (pickedFile)
      return pickedFile;
    return null
  };

  useImperativeHandle(ref, () => {
    return {
      async handleUploadFile() {
        return handleUpload();
      },
    };
  }, [pickedFile]);

  return (
    <Box sx={{ paddingTop: "10px" }}>
      <Grid container>
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
              accept="xlsx/*"
            />
          </Button>
          <br />
          <div style={{ marginLeft: "10px" }}>
            {
              !errorFileType && pickedFile && <TextDisplaying text={pickedFile.name} isError={false} />
            }
            {
              errorFileType && <TextDisplaying text={errorFileType} isError={true} />
            }
          </div>
        </Grid>
      </Grid>
    </Box>
  );
})

export default GenericFilePicker;
