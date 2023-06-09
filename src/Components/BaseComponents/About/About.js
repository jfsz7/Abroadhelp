import React from 'react';
import DashboardHeader from '../../Header/DashboardHeader/DashboardHeader';

const About = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <h3 className='text-center px-4 py-4 bg-primary text-white'>This is about page of the site!</h3>
        </div>
    );
};

export default About;