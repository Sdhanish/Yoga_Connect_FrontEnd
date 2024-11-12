import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import Map from './Map/Map';
import PopularClasses from './PopularClasses/PopularClasses';
import PopularInstructor from './PopularTeacher/PopularInstructor';
import HeroContainer from './Hero/HeroContainer';
import Gallary from './Gallary/Gallary';

const Home = () => {
    useTitle('Home | Yoga Connect - Unite with Your True Self');
    return (
        <section>
            <HeroContainer />
            <div className="max-w-screen-xl mx-auto">
            
                <PopularClasses />
                <PopularInstructor />
                <Gallary/>
            </div>
            <Map />
        </section>
    );
};

export default Home;