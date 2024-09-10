import React, { useEffect } from 'react';
import { fetchProtectedData } from '../../utils/app.service';

const ProtectedComponent = () => {
  useEffect(() => {
    fetchProtectedData()
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error accessing protected route:', error.response.data);
      });
  }, []);

  return <div>Protected Content</div>;
};

export default ProtectedComponent;



