import MainView from 'views/MainView';
import OrderView from 'views/OrderView';
import DriverView from 'views/DriverView';
const routes = [
  {
    name: 'Main',
    path: '/',
    component: MainView,
    exact: true
  },
  {
    name: 'Orders',
    path: '/orders',
    component: OrderView
  },
  {
    name: 'Drivers',
    path:'/drivers',
    component: DriverView
  }
]

export default routes;