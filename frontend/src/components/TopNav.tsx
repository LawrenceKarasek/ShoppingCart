import CustomButton from '../ui/CustomButton'

export type authParam = {
  authenticated: boolean
  logout: () => void
}

const TopNav = ({ authenticated, logout }: authParam) => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-100 text-white shadow-md">
      <div className="px-6 py-4 flex justify-between items-center">
        <div></div>
        {authenticated && (
          <div className="ml-auto flex items-center gap-4">
            <CustomButton type="submit" text="Logout" onClick={logout} />
          </div>
        )}
      </div>
    </nav>
  )
}

export default TopNav
