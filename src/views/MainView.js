import OrderView from 'views/OrderView'
import DriverView from 'views/DriverView';

const MainView = () => {


  return (
    <div className='main-layout'>
      <OrderView/>
      <DriverView />
      <DriverView />
    </div>
  )
}
export default MainView;