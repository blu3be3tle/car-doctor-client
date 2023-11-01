/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col mt-16">
      <h1 className="text-2xl font-bold mb-7 text-gray-500 dark:text-gray-400">
        SERVICES
      </h1>

      <div className="md:grid grid-cols-1 lg:grid-cols-3 gap-12 mx-auto pb-16">
        {services?.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
