import {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';


type FileUploaderProps = {
  fieldOnChange: (FILES: File[]) => void,
  mediaUrl: string,
}

function FileUploader({ fieldOnChange, mediaUrl }: FileUploaderProps) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldOnChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const {getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [".svg", ".jpg", ".jpeg", ".png"]
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img
              src={fileUrl}
              alt='uploaded'
              className="h-9 w-9 object-cover"
              />
          </div>
          <p className='file_uploader-label'>Click or drag to replace photo</p>
          </>
        ) : (
          <div className='file_uploader-box'>
            <img
              src='/assets/icons/file-upload.svg'
              alt='upload file'
              width={96}
              height={77}
            />
            <h3 className='base-medium text-light-2 mb-2 mt-6'>
              Drop photos here
            </h3>
            <p className='text-light-4 small-regular mb-6'>
              SVG, PNG, JPG, JPEG
            </p>
            <Button className='shad-button_dark_4'>
              Browse
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader;