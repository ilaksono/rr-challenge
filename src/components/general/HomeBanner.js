import {useContext} from 'react';
import AppContext from 'context/AppContext';

const HomeBanner = () => {
  const {
    appName
  } = useContext(AppContext) || {};

  return (
    <div className='home-banner'>
      <div
       className='title'
      >{appName}<span>&nbsp;&nbsp;|&nbsp; Organize and drive your orders</span>
      </div>
    </div>
  )
}

export default HomeBanner;