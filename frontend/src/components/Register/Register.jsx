import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation
import { registerUser } from '../redux/authSlice';
import { getCoordinates } from '../utils/geocode'; // Function to fetch coordinates
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    location: '',
    metro: '',
    profileImage: null,
  });

  const { name, email, password, college, location, metro, profileImage } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data on submit:', formData);

    try {
      // Fetch coordinates for location
      const locationCoords = await getCoordinates(location);
      if (!locationCoords || locationCoords.length !== 2) {
        console.error('Error fetching coordinates for location');
        return;
      }
      console.log('Location Coordinates:', locationCoords);

      // Fetch coordinates for metro
      const metroCoords = await getCoordinates(metro);
      if (!metroCoords || metroCoords.length !== 2) {
        console.error('Error fetching coordinates for metro');
        return;
      }
      console.log('Metro Coordinates:', metroCoords);

      // Prepare data with coordinates
      const dataWithCoordinates = {
        name,
        email,
        password,
        college,
        location: {
          type: 'Point',
          coordinates: locationCoords,
        },
        metro: {
          name: metro,
          coordinates: {
            type: 'Point',
            coordinates: metroCoords,
          },
        },
      };

      console.log('Data with coordinates:', dataWithCoordinates);

      // Create FormData object to handle file upload
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', name);
      formDataWithImage.append('email', email);
      formDataWithImage.append('password', password);
      formDataWithImage.append('college', college);
      formDataWithImage.append('location', JSON.stringify(dataWithCoordinates.location));
      formDataWithImage.append('metro', JSON.stringify(dataWithCoordinates.metro));
      if (profileImage) {
        formDataWithImage.append('profileImage', profileImage);
      }

      const resultAction = await dispatch(registerUser(formDataWithImage));
      if (registerUser.fulfilled.match(resultAction)) {
        console.log('User registered successfully:', resultAction.payload);
        navigate('/metromap'); // Navigate to MetroMap on successful registration
      } else {
        console.error('Error registering user:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={onSubmit} className="register-form">
        <h2 className="register-title">Register</h2>
        <div className="register-input-group">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="register-input-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="register-input-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div className="register-input-group">
          <label>College</label>
          <input type="text" name="college" value={college} onChange={onChange} required />
        </div>
        <div className="register-input-group">
          <label>Location</label>
          <input type="text" name="location" value={location} onChange={onChange} required />
        </div>
        <div className="register-input-group">
          <label>Metro</label>
          <input type="text" name="metro" value={metro} onChange={onChange} required />
        </div>
        <div className="register-input-group">
          <label>Profile Image</label>
          <input type="file" name="profileImage" onChange={onFileChange} />
        </div>
        <button type="submit" className="register-button">Register</button>
        <Link to='/login' className="register-login-link">Login</Link>
      </form>
    </div>
  );
};

export default Register;

