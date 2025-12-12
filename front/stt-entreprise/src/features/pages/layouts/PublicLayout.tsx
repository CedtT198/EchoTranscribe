import { Outlet } from 'react-router-dom'
import PublicHeader from '../../../components/PublicHeader'
import PublicFooter from '../../../components/PublicFooter'

function PublicLayout() {
    return (
      <div className="wrapper">
        <PublicHeader></PublicHeader>
        <main role="main" className="main-content mt-5 pt-5">
          <div className='container-fluid container mt-5'>
          {/* <div> */}
            <Outlet />
            <PublicFooter></PublicFooter>
          </div>
        </main>
      </div>
    )
}

export default PublicLayout;