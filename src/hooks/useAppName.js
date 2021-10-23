import {useState} from 'react';

const useAppName = () => {

  const [appName] = useState('Trans-It');

  return {
    appName
  }
}
export default useAppName;