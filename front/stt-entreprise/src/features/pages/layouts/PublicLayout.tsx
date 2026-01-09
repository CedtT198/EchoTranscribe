import { Outlet } from 'react-router-dom'
import PublicHeader from '../../../components/layouts/PublicHeader'
import PublicFooter from '../../../components/layouts/PublicFooter'

function PublicLayout() {
    return (
      <div className="wrapper">
        <PublicHeader></PublicHeader>
        <main role="main" className="main-content mt-5 pt-5">
          <div className='container mt-5'>
          {/* <div> */}
            <Outlet />
          </div>
        </main>
        <PublicFooter></PublicFooter>
      </div>
    )
}

export default PublicLayout;