import React from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import { Typography, Box } from '@mui/material';
import styles from '../../Styles/fileUploader.module.css';
// import { Control } from 'react-hook-form';

type FileUploaderProps = {
  name: string;
  acceptedFileTypes: string[];
  maxFiles?: number;
  placeholder?: string;
  control?: any;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  name,
  acceptedFileTypes,
  maxFiles,
  placeholder = 'Drag & drop files here, or click to select',
  control: propControl
}) => {
  // const { control } = useFormContext();
  const formContext = useFormContext();
  const control = formContext ? formContext.control : propControl;

  if (!control) {
    throw new Error("FileUploader must be used within a FormProvider or receive a 'control' prop.");
  }
  // const [files, setFiles] = React.useState<File[]>([]);
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
    onDrop: (_files) => {
        // setFiles(files); 
      // Handle file drop
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={() => (
        <Box
          {...getRootProps()}
          className={styles.dropzone}
        >
          <input {...getInputProps()} />
          <Typography>{placeholder}</Typography>
          <Box>
            {acceptedFiles.map(file => (
              <Typography key={file.name}>{file.size} - {file.size} bytes</Typography>
            ))}
          </Box>
          {fileRejections.length > 0 && (
            <Typography color="error">
              {fileRejections.map(({ file, errors }: FileRejection) => (
                <Box key={file.name}>
                  {errors.map(e => (
                    <Typography key={e.code}>{file.name} - {e.message}</Typography>
                  ))}
                </Box>
              ))}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default FileUploader;
