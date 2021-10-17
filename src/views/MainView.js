import OrderView from 'views/OrderView'
import DriverView from 'views/DriverView';
import HomeBanner from 'components/general/HomeBanner';
const MainView = () => {


  return (
  <>
    <HomeBanner/>

    <div className='main-layout'>

      <OrderView 
      id={1}
      />
      <DriverView id={2}/>
      <DriverView id={3}/>
    </div>
    </>
  )
}
export default MainView;