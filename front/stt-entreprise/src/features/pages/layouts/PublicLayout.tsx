import { Outlet } from 'react-router-dom'
import PublicHeader from '../../../components/PublicHeader'
import PublicFooter from '../../../components/PublicFooter'

function PublicLayout() {
    return (
      <div className="wrapper">
        <PublicHeader></PublicHeader>
        <main role="main" className="main-content">
          <div className='container-fluid container'>
          {/* <div> */}
            <Outlet />
            <PublicFooter></PublicFooter>
          </div>
        </main>
      </div>
    )
}

export default PublicLayout;