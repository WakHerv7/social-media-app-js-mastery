import { useUserContext } from '@/context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
    {isAuthenticated ? (
      <>
        <Navigate to="/" />
      </>
    ) : (
      <div className='flex justify-center items-center'>
        <section className='flex flex-1 justify-center py-10 items-center flex-col min-h-screen'>
          <Outlet />
        </section>

        <img
          src='/assets/images/side-img.svg'
          alt='logo'
          className="hidden xl:block h-screen object-cover w-1/2 bg-no-repeat"
        />
      </div>
    )}
    </>
  )
}

export default AuthLayout;