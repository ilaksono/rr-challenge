import {useState} from 'react';

const useAppName = () => {

  const [appName, setAppName] = useState('Trans-It');

  return {
    appName
  }
}
export default useAppName;