import React, { useState, useRef } from 'react'

type Image = {
  name: string;
  url: string;
  filename: File
}

type Props = {
  setImage: (image: File) => void;
}

export const DragAndDropImage = ({ setImage }: Props) => {
  const [images, setImages] = useState<Image[]>([])
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileInputRef.current?.click()
    const files = e.target.files;
    if(files?.length === 0) return;
    let i: number;
    if(files) {
      for(i = 0; i < files?.length; i++) {
        if(files[i].type.split('/')[0] !== 'image') continue;
        if(!images.some((image: Image) => image.name === files[i].name)) {
          setImages(
            [...images, { name: files[i].name, url: URL.createObjectURL(files[i]), filename: files[i]}]
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
      if(!images.some((image: Image) => image.name === files[i].name)) {
        setImages(
          [...images, { name: files[i].name, url: URL.createObjectURL(files[i]), filename: files[i]}]
        )
      }
    }
  }

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i: number) => i !== index))
  }

  return (
    <div className="p-3 m-3 shadow-md rounded-md overflow-hidden flex flex-col gap-4">
     <div className="h-52 border-dashed border-indigo-700 border-2 flex justify-center items-center" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      {
        !isDragging ? ( <label className='inline-block border-2 text-center border-solid border-gray-400 py-4 px-8 cursor-pointer' htmlFor="file-upload">Agregar imágenes</label>)
        : (<label className='inline-block border-2 border-dashed text-center border-gray-400 text-indigo-700 font-bold py-12 px-16 cursor-pointer' htmlFor="file-upload">Agrega la imagen aqui</label>)
      }
      <input id='file-upload' type="file" name="file" className='hidden' ref={fileInputRef} onChange={selectFiles} />
     </div>
     <div className='flex flex-wrap gap-2'>
      {
        images.map((image: Image, index) => (
          <div key={index} className='relative'>
            <span onClick={() => deleteImage(index)} className='absolute text-red-700 text-base right-0 cursor-pointer bg-white rounded-full w-5 h-5 flex justify-center items-center'>&times;</span>
            <img className='w-28 h-28' src={image.url} alt={image.name} />
          </div>
        ))
      }
     </div>
    </div>
  )
}
