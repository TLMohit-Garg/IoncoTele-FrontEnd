import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectDoctorUserId, selectDoctorToken } from "../../store/authDoctorSlice";


function UpdateProfile() {
  const token = useSelector(selectDoctorToken);
  const userId = useSelector(selectDoctorUserId); 

  const [title, setTitle] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [description, setDescription] = useState("");
  const [exploredescription, setExploreDescription] = useState("");
  const [charges, setCharges] = useState("");
  const [country, setCountry] = useState("");
  const [qualification, setQualification] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      } else {
        setImage(null); 
      }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userId) {
        console.error("userId is required but missing");
        return; 
      }
      
    const formData = new FormData();
    if (userId) {
        formData.append('userId', userId);
      } else {
        console.error("userId is missing");
        return; 
      }
    formData.append('userId', userId);
    formData.append("title", title);
    formData.append("speciality", speciality);
    formData.append("description", description);
    formData.append("exploredescription", exploredescription);
    formData.append("charges", charges);
    formData.append("country", country);
    formData.append("qualification", qualification);
    formData.append("workExperience", workExperience);
    // formData.append("image", image); // Append the image file
    if (image) {
        formData.append('image', image);
      }

    try {
      const response = await axios.post(
        "/api/doctorProfile/createProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Doctor profile created:", response.data);
    } catch (error) {
      console.error("Error creating doctor profile:", error);
    }
  };
  return (
    <>
      <div>UpdateProfile</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          placeholder="Explore Description"
          value={exploredescription}
          onChange={(e) => setExploreDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Charges"
          value={charges}
          onChange={(e) => setCharges(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
        <input
          type="text"
          placeholder="Work Experience"
          value={workExperience}
          onChange={(e) => setWorkExperience(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UpdateProfile;
