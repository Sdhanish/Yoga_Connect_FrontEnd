import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import { useUser } from '../../hooks/useUser';
import DashboardNavigate from '../../routes/DashboardNavigate';
import { HashLoader } from 'react-spinners';
const Dashboard = () => {

    useTitle("Dashboard | Yoga Connect - Connect With your Inner Peace");

    const { currentUser, isLoading } = useUser();

    const role = currentUser?.role;


    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>
        <HashLoader
            color="#48b875"
            size={50}
        />
    </div>
    }
    return <DashboardNavigate />;
};

export default Dashboard;