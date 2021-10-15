import MainView from 'views/MainView';
import OrderView from 'views/OrderView';

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
  }
]

export default routes;