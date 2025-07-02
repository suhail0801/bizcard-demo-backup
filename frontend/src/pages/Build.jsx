import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card1 from "../react_components/Card_Template/card1/Card1";

const Build = () => {
  const params = useParams();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    business_name: "",
    business_address: "",
    business_description: "",
    mobile: "",
    email: "",
    website: "",
    location: "",
  });
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Test Card1 with mock props only
  return (
    <div style={{ color: "blue", fontWeight: "bold", fontSize: 24 }}>
      BUILD TEST
    </div>
  );
};

export default Build;
