import React, { useState, useRef, useEffect } from 'react'

type Image = {
  name: string;
  url: string;
  filename: File
}

type Props = {
  setImage: (image: File | string) => void;
  image?: string;
}

export const DragAndDropImage = ({ setImage, image }: Props) => {
  const [images, setImages] = useState<Image>({} as Image)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if(image) {
      setImages({ name: image, url: image, filename: new File([], '')})
      setImage(image)
    }
  }, [image, setImage])

  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileInputRef.current?.click()
    const files = e.target.files;
    if(files?.length === 0) return;
    let i: number;
    if(files) {
      for(i = 0; i < files?.length; i++) {
        if(files[i].type.split('/')[0] !== 'image') continue;
        if(images.name !== files[i].name) {
          setImages(
            { name: files[i].name, url: URL.createObjectURL(files[i]), filename: files[i]}
          )
          setImage(files[i])
        }
      }
      console.log(images)
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false)
    const files = e.dataTransfer.files;
    if(files?.length === 0) return;

    let i: number;

    for(i = 0; i < files.length; i++) {
      if(files[i].type.split('/')[0] !== 'image') continue;
      for(i = 0; i < files?.length; i++) {
        if(files[i].type.split('/')[0] !== 'image') continue;
        if(images.name !== files[i].name) {
          setImages(
            { name: files[i].name, url: URL.createObjectURL(files[i]), filename: files[i]}
          )
          setImage(files[i])
        }
      }
    }
  }

  const deleteImage = () => {
    setImages({} as Image)
  }

  return (
    <div className="p-3 m-3 shadow-md rounded-md overflow-hidden flex flex-col gap-4">
     <div className="h-52 border-dashed border-indigo-700 border-2 flex justify-center items-center" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      {
        !isDragging ? ( <label className='inline-block border-2 text-center border-solid border-gray-400 py-4 px-8 cursor-pointer' htmlFor="file-upload">Agregar imagen</label>)
        : (<label className='inline-block border-2 border-dashed text-center border-gray-400 text-indigo-700 font-bold py-12 px-16 cursor-pointer' htmlFor="file-upload">Agrega la imagen aqui</label>)
      }
      <input id='file-upload' type="file" name="file" className='hidden' ref={fileInputRef} onChange={selectFiles} />
     </div>
     <div className='flex flex-wrap gap-2'>
      {
        images.url && (
          <div className='relative'>
            <span onClick={() => deleteImage()} className='absolute text-red-700 text-base right-0 cursor-pointer bg-white rounded-full w-5 h-5 flex justify-center items-center'>&times;</span>
            <img className='w-28 h-28' src={images.url} alt='Imagen de propiedad' />
         </div>
        )
      }
     </div>
    </div>
  )
}
