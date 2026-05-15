import { Outlet } from 'react-router-dom'
import AdminHeader from '../../../components/admin/AdminHeader';
import { useEffect } from 'react';
import { setBodyClass } from '../../../others/utils';

export default function AdminLayout() {
    useEffect(() => {
      setBodyClass(["vertical", "light"]);

      return () => {
        document.body.className = "";
      };
    }, []);
    
    return (
      <div className="wrapper">
        <AdminHeader></AdminHeader>
        <main role="main" className="main-content mt-5">
          <div className='container mt-5'>
          {/* <div> */}
            <Outlet />
          </div>
        </main>
      </div>
    )
}