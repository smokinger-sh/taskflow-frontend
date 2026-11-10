import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import StaffListPage from './pages/StaffListPage.jsx';
import NewStaffPage from './pages/NewStaffPage.jsx';
import StaffDetailPage from './pages/StaffDetailPage.jsx';
import EditStaffPage from './pages/EditStaffPage.jsx';
import NewTaskPage from './pages/NewTaskPage.jsx';
import TaskDetailPage from './pages/TaskDetailPage.jsx';
import EditTaskPage from './pages/EditTaskPage.jsx';
import AIChat from './pages/AIChat.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'staff', element: <StaffListPage /> },
      { path: 'staff/new', element: <NewStaffPage /> },
      { path: 'staff/:id', element: <StaffDetailPage /> },
      { path: 'staff/:id/edit', element: <EditStaffPage /> },
      { path: 'tasks/new', element: <NewTaskPage /> },
      { path: 'tasks/:id', element: <TaskDetailPage /> },
      { path: 'tasks/:id/edit', element: <EditTaskPage /> },
      { path: 'support', element: <AIChat /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
