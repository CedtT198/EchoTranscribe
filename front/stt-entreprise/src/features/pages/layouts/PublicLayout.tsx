import { Outlet } from 'react-router-dom'
import PublicHeader from '../../../components/layouts/PublicHeader'
import PublicFooter from '../../../components/layouts/PublicFooter'
import { useEffect, useState } from 'react';
import { setBodyClass } from '../../../others/utils';

export default function PublicLayout() {
    // const [headerContent, setHeaderContent] = useState(null);
    // const [headerContent, setHeaderContent] = useState(<span className="badge badge-pill badge-primary">Upgrade</span>);

    useEffect(() => {
      // setBodyClass(["horizontal", "light"]);
      setBodyClass(["vertical", "light"]);

      return () => {
        document.body.className = "";
      };
    }, []);

    return (
      <div className="wrapper">
        <PublicHeader />
        <main role="main" className="main-content mt-5">
          <div className='container mt-5'>
            <Outlet />
          </div>
          <PublicFooter/>
        </main>
      </div>
    )
}