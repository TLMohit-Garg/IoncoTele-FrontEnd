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
  const [preferredCurrency, setPreferredCurrency] = useState("");
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
    formData.append("preferredCurrency", preferredCurrency);
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
      {/* <div>UpdateProfile</div>
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
      </form> */}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr", // Two columns: left for headings, right for inputs
            gap: "20px",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          {/* Left column for headings */}
          <div style={{ textAlign: "right", paddingRight: "10px" }}>
            <p>Title:</p>
            <p>Speciality:</p>
            <p>Description:</p>
            <p>Explore Description:</p>
            <p>Charges:</p>
            <p>Country:</p>
            <p>Qualification:</p>
            <p>Work Experience:</p>
            <p>Preferred Currency:</p>
            <p>Upload File:</p>
          </div>

          {/* Right column for inputs */}
          <div>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <input
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <textarea
                placeholder="Explore Description"
                value={exploredescription}
                onChange={(e) => setExploreDescription(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <input
                type="text"
                placeholder="Charges"
                value={charges}
                onChange={(e) => setCharges(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <input
                type="text"
                placeholder="Qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <input
                type="text"
                placeholder="Work Experience"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              />
              <input type="file" onChange={handleFileChange} style={{ fontSize: "16px" }} />
              <label htmlFor="preferredCurrency">Select Preferred Currency:</label>
              <select
            value={preferredCurrency}
            onChange={(e) => setPreferredCurrency(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          >
            <option value="">--Select Currency--</option>
            <option value="usd">USD</option>
            <option value="eur">Euro</option>
            <option value="gbp">Pound</option>
            <option value="inr">INR</option>
          </select>
              <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
