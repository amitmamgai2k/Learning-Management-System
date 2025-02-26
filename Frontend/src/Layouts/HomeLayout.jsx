import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, Mail, Info, LogIn, User, LayoutDashboard, LogOut,MonitorUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/AuthSlice';


const HomeLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn);
  const role = useSelector(state => state?.auth?.role);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate('/');
  };
const getProfile = (e) => {
   e.preventDefault();
   navigate('/profile');
}
  // Define base menu items
  const baseMenuItems = [
    { title: 'Home', icon: Home, path: '/' },
    { title: 'All Courses', icon: BookOpen, path: '/courses' },
    { title: 'Contact Us', icon: Mail, path: '/contact' },
    { title: 'About Us', icon: Info, path: '/about' }
  ];

  // Add role-specific menu items
  const menuItems = [...baseMenuItems];
  if (isLoggedIn && role === "ADMIN") {
    menuItems.push({
      title: 'Admin Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'

    },{
      title: 'Create Course',
      icon: MonitorUp ,
      path: '/course/create'
    });
  }
  if (isLoggedIn && role === "USER") {
    menuItems.push({
      title: 'My Courses',
      icon: BookOpen,
      path: '/my-courses'
    });
  }

  return (
    <div className="relative min-h-screen m-0 p-0 bg-gray-50">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Menu Button */}
      <div className="fixed  h-16 bg-white shadow-sm z-30 flex flex-row justify-end">

        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100 z-50 transition-all duration-200"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '240px' }}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo/Brand */}
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-800">Learnly</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-4 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="p-4 border-t space-y-2">
            {!isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full"
                >
                  <User className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                 <button
                  onClick={getProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white hover:bg-red-700 rounded-lg transition-colors w-full"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white hover:bg-red-700 rounded-lg transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
                <p className="text-sm text-gray-600 text-center">
                  © 2025 Learnly
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative pt-16">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;