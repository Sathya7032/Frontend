import React, { useEffect, useState } from 'react';
import Base1 from "./Base1";
import { jwtDecode } from "jwt-decode";
import useAxios from '../utils/useAxios';
import { TextField, Button, Typography, Box } from '@mui/material';
import Swal from "sweetalert2";

const Profile = () => {
    const token = localStorage.getItem("authTokens");
    const axiosInstance = useAxios();
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

    if (token) {
        const decode = jwtDecode(token);
        var user_id = decode.user_id;
        var username = decode.username;
    }

    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [role, setRole] = useState('');
    const [gitlink, setGitlink] = useState('');
    const [image, setImage] = useState(null);  // Change from URL string to file object

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get(`${baseUrl}/api/profile/`);
            console.log(res.data);
            // You might want to set the state with the received data here
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Update state with the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('full_name', fullName);
            formData.append('bio', bio);
            formData.append('role', role);
            formData.append('gitlink', gitlink);
            if (image) {
                formData.append('image', image); // Append the file to the form data
            }

            await axiosInstance.post(`${baseUrl}/profile-post/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            Swal.fire({
                title: "Profile updated successfully",
                icon: "success",
                toast: true,
                timer: 2000,
                timerProgressBar: true,
                position: 'center',
                showConfirmButton: false,
            });

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div>
            <Base1>
                <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
                    <Typography variant="h4 text-center text primary" gutterBottom>You can edit your profile here {username} and your user Id is {user_id}</Typography>
                    <Typography variant="h2" gutterBottom>Edit Profile</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="full_name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Bio"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            variant="outlined"
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="GitHub Link"
                            name="gitlink"
                            value={gitlink}
                            onChange={(e) => setGitlink(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <Typography variant="body1" gutterBottom>
                            Profile Image
                        </Typography>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            style={{ marginBottom: '16px' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Save Changes
                        </Button>
                    </form>
                </Box>
            </Base1>
        </div>
    );
};

export default Profile;