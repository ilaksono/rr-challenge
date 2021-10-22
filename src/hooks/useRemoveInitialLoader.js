import {useEffect} from 'react';
const useRemoveInitialLoader = () => {
  useEffect(() => {
    document.getElementById('load-overlay')
    ?.remove();
  }, [])
}
export default useRemoveInitialLoader;