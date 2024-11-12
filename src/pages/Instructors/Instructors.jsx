import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import ShowInstructors from './All/ShowInstructors';

const Instructors = () => {
    useTitle('Instructors | Yoga Master - Unleashed Your Inner Self');
    return (
        <section>
            <ShowInstructors />
            <div className="mt-4 border-t border-gray-100 pt-8">
          <p className="text-center text-sm/relaxed text-gray-500">
            ©sdhanish92@gmail.com 2024. All rights reserved.
            <br />
            Created with &nbsp;
            <a className="text-secondary dark: transition hover:text-secondary dark:/75">
              Yoga Connect
            </a>
          </p>
        </div>
        </section>
    );
};

export default Instructors;