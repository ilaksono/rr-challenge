import OrderView from 'views/OrderView'
import DriverView from 'views/DriverView';
import HomeBanner from 'components/general/HomeBanner';
import AppContext from 'context/AppContext';
import { useContext } from 'react';
import * as hf from 'utils/helperFuncs';
const MainView = () => {

  const {
    appData
  } = useContext(AppContext);
  const driverA = appData.drivers.hash[appData.view.drivers[0]] || {};
  const driverB = appData.drivers.hash[appData.view.drivers[1]] || {};
  return (
    <>
      <HomeBanner />
      <div className='main-layout'>
        <OrderView
          id={1}
        />
        <DriverView 
        id={appData.view.drivers[0]}
          driverIndex={0}
          fullName={hf.formatFullName(driverA.driver_fname, driverA.driver_lname)}
        />
        <DriverView id={appData.view.drivers[1]}
          driverIndex={1}
          fullName={hf.formatFullName(driverB.driver_fname, driverB.driver_lname)}

        />
      </div>
    </>
  )
}
export default MainView;