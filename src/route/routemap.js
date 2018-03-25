import Dashboard from '../view/Dashboard';
import User from '../view/User';
import StudentsCenter from '../view/StudentsCenter';
import StudentDetail from '../view/StudentDetail';

export default [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'studentsCenter',
    component: StudentsCenter
  },
  {
    path: 'studentDetail/:id',
    component: StudentDetail
  },
  {
    path: 'user',
    component: User
  }
];
