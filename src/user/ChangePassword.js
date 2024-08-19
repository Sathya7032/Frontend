import React, { useState } from 'react';
import useAxios from '../utils/useAxios';  // Adjust the path as per your file structure
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import Base1 from './Base1';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePasswordComponent = () => {
  const axiosInstance = useAxios();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {

      const response = await axiosInstance.post('https://acadamicfolios.pythonanywhere.com/auth/password/change/', {
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2
      });
      Swal.fire({
        title: "Password changed successfully",
        icon: "success",
        toast: true,
        timer: 2000,
        timerProgressBar: true,
        position: 'center',
        showConfirmButton: false,
      });
      navigate("/dashboard");

    } catch (error) {
      Swal.fire({
        title: "Error changing password",
        icon: "error",
        toast: true,
        timer: 2000,
        timerProgressBar: true,
        position: 'top-end',
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <Base1>
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Change Password
            </Typography>
            <form onSubmit={handleChangePassword}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Old Password"
                    fullWidth
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="New Password"
                    fullWidth
                    required
                    value={newPassword1}
                    onChange={(e) => setNewPassword1(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Confirm New Password"
                    fullWidth
                    required
                    value={newPassword2}
                    onChange={(e) => setNewPassword2(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Changing Password...' : 'Change Password'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Base1>
    </div>
  );
};

export default ChangePasswordComponent;