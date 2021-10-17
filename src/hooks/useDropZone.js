import { useState } from 'react';


const init = {
  on: false,
  type: 'driver',
  id: 0
}
const initDrag = {
  hide: false
}

const useDropZone = () => {

  const [dropZone, setDropZone] = useState(init)
  const [drag, setDrag] = useState(initDrag);


  const handleDragDropZone = (e, type, id) => {
    if (e.buttons) {
      setDropZone(prev => ({
        on: e.type === 'dragenter' ? true : false,
        type,
        id
      }))
    }
  }

  const handleDragOverZone = (e, type, id) => {
    e.preventDefault()
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
    handleDragOverZone,
    drag,
    setDrag
  }

}
export default useDropZone;