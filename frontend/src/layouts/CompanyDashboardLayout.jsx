import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import CompanyDashboardSidebar from '../components/Dashboard/CompanyDashboardSidebar';

const CompanyDashboardLayout = ({ children }) => {
  const { olive } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex ${olive ? 'bg-olive-beige text-black' : 'bg-gray-50 text-gray-900'}`}>
      <CompanyDashboardSidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default CompanyDashboardLayout;
