import {
  useEffect,
  useState,
  useRef
} from 'react';


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
  const [ready, setReady] = useState(true);

  const timeRef = useRef();
  useEffect(() => {
    if (!ready) {
      timeRef.current = setTimeout(() => {
        setReady(true);
      }, 20)
    }
    return () => clearTimeout(timeRef.current)
  }, [ready])

  const handleDragDropZone = (e, type, id) => {
    e.preventDefault();
    setDropZone(prev => ({
      on: e.type === 'dragenter' ? true : false,
      type,
      id
    }))
  }

  const handleDragOverZone = (e, type, id) => {
    e.preventDefault()
    // console.log('over');
    if (!ready) return;
    if (dropZone.on)
      return;
    setDropZone(() => ({
      on: true,
      type,
      id
    }))
    // setReady(false);
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