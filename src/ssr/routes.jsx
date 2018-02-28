import App from '../components/App';
import IssuesList from '../containers/IssuesContainer';
import UsersList from '../containers/UsersContainer';
import SignIn from '../containers/SignInContainer';
import SignUp from '../containers/SignUpContainer';
import NotFound from '../components/NotFound';
import HistoryContainer from '../containers/HistoryContainer';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: SignIn,
      },
      {
        path: '/signup',
        component: SignUp,
      },
      {
        path: '/issues',
        component: IssuesList,
      },
      {
        path: '/users',
        component: UsersList,
      },
      {
        path: '/history',
        component: HistoryContainer,
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
