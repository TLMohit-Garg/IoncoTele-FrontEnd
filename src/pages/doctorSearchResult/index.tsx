// ResultsPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

interface DoctorType {
    id: number;
    title: string;
    speciality: string;
    description: string;
    exploredescription: string;
    imageUrl: string;
    buttonText: string;
    charges: string;
    country: string;
    qualification: string;
    workExperience: string;
  }

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { filteredDoctors } = location.state as { filteredDoctors: DoctorType[] };

  return (
    <div>
      <h1>Search Results</h1>
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <div key={doctor.id}>
            <h2>{doctor.title}</h2>
            <p>{doctor.speciality}</p>
            <p>{doctor.country}</p>
          </div>
        ))
      ) : (
        <p>No doctors found for the selected criteria.</p>
      )}
    </div>
  );
};

export default ResultsPage;
