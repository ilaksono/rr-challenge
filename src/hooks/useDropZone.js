import { useState } from 'react';


const init = {
  on: false,
  type: 'driver',
  id: 0
}
const useDropZone = () => {

  const [dropZone, setDropZone] = useState(init)

  const handleDragDropZone = (e, type, id) => {
    // e.preventDefault()
    console.log(e);
    // if(e.type === 'dragenter')
    if (e.buttons) {
      // console.log(e, type)
      setDropZone(prev => ({
        // ...prev,
        on: e.type === 'dragenter' ? true : false,
        type,
        id
      }))

    }
  }

  const handleDragOverZone = (e, type, id) => {
    if (dropZone.on)
      return;
    setDropZone(() => ({
      on: true,
      type,
      id
    }))
  }

  return {
    dropZone,
    handleDragDropZone,
    handleDragOverZone
  }

}
export default useDropZone;