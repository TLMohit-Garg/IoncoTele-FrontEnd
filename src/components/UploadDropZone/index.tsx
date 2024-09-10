import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import ControlPointIcon from '@mui/icons-material/ControlPoint';
import styles from "../../Styles/customFileupload.module.css";
import { Grid } from '@mui/material';

interface FileWithPreview extends File {
  preview: string;
}
function Dropzone({className}:any) {
    const [files, setFiles] = React.useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedFiles: any) => {
             console.log(acceptedFiles);

             if (acceptedFiles?.length) {
              setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map((file: any) =>
                  Object.assign(file, { preview: URL.createObjectURL(file) })
                )
              ])
            }
           }, []);
        
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,
      accept: {
        'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/svg+xml': ['.svg'],
    'image/webp': ['.webp']
      },
     });

    const removeFile =(name:any)=> {
      setFiles(files => files.filter(file => file.name !== name))
    }
    React.useEffect(() => {
      // Revoke the data uris to avoid memory leaks
      return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])
  return (
    <>
         <div {...getRootProps({className:className})}>
           <input {...getInputProps()} />
          {isDragActive ? (
            <Grid>Drop the files here ...</Grid>
          ) : (
            <Grid className={styles.DragText}>Drag 'n' drop some files here, or click to select files</Grid>
            // <Grid className={styles.DragText}><ControlPointIcon/></Grid>
          )}
        </div>

        {/* Accepted files */}

          <Grid xs={12} sm={12} md={12} lg={12} xl={12} container item>
          {files.map(file => (
            <Grid  item xs={3} sm={3} md={3} lg={3} xl={3} key={file.name} >
              <img
                src={file.preview}
                // alt={file.name}
                width={30}
                height={30}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
              />
              <button
                type='button'
                className={styles.btn}
                onClick={() => removeFile(file.name)}
              >
                <HighlightOffIcon className={styles.closeBtn}/>
              </button>
              <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name.split(".").pop()?.toLowerCase()}
              </p>
            </Grid>
          ))}
          </Grid>
        
    </>
  )
}

export default Dropzone