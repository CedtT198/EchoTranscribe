import { Outlet } from 'react-router-dom'
import PublicHeader from '../../../components/layouts/PublicHeader'
import PublicFooter from '../../../components/layouts/PublicFooter'
import { useEffect } from 'react';
import { setBodyClass } from '../../../others/utils';

export default function PublicLayout() {
    useEffect(() => {
      // setBodyClass(["horizontal", "light"]);
      setBodyClass(["vertical", "light"]);

      return () => {
        document.body.className = "";
      };
    }, []);

    return (
      <div className="wrapper">
        <PublicHeader></PublicHeader>
        <main role="main" className="main-content mt-5">
          <div className='container mt-5'>
          {/* <div> */}
            <Outlet />
          </div>
        <PublicFooter></PublicFooter>
        </main>
      </div>
    )
}