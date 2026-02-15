import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/api';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  CircularProgress,
  Stack,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  PersonAdd, 
  Visibility, 
  VisibilityOff,
  Security as StatsIcon 
} from '@mui/icons-material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Security Validation Error: Matrix Mismatch");
    }
    
    setLoading(true);
    setError('');
    try {
      await authService.register(username, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      const errorData = err.response?.data;
      let errorMessage = 'Protocol Error: Registration Terminated';
      
      if (typeof errorData === 'object') {
        errorMessage = errorData.message || errorData.error || errorMessage;
        if (errorData.details) {
          errorMessage += ` (${errorData.details})`;
        }
      } else if (typeof errorData === 'string') {
          errorMessage = errorData;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#020617',
      backgroundImage: `
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0, transparent 50%),
        radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.12) 0, transparent 50%),
        radial-gradient(at 50% 100%, rgba(99, 102, 241, 0.08) 0, transparent 50%)
      `,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Orbs */}
      <Box sx={{ position: 'absolute', width: '40vw', height: '40vw', bgcolor: 'rgba(99, 102, 241, 0.03)', borderRadius: '50%', filter: 'blur(80px)', top: -100, left: -100, animation: 'float 8s infinite ease-in-out' }} />
      <Box sx={{ position: 'absolute', width: '30vw', height: '30vw', bgcolor: 'rgba(6, 182, 212, 0.03)', borderRadius: '50%', filter: 'blur(80px)', bottom: -50, right: -50, animation: 'float 10s infinite ease-in-out reverse' }} />

      <Container maxWidth="xs" className="animate-fade-in" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
            <StatsIcon sx={{ color: '#6366f1', fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -1, color: 'white' }}>
              TASKFLOW
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, letterSpacing: 1.5, opacity: 0.8 }}>
            IDENTITY FORMATION CENTER
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            width: '100%', 
            bgcolor: 'rgba(15, 23, 42, 0.7)', 
            backdropFilter: 'blur(20px)',
            borderRadius: 6,
            border: '1px solid rgba(99, 102, 241, 0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Typography variant="h5" align="center" sx={{ color: 'white', fontWeight: 900, mb: 1 }}>
            Join the Network
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: '#64748b', mb: 4, fontWeight: 500 }}>
            Establish your neural link and start managing initiatives.
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                bgcolor: 'rgba(239, 68, 68, 0.1)', 
                color: '#ef4444', 
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 2,
                '& .MuiAlert-icon': { color: '#ef4444' }
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3, 
                bgcolor: 'rgba(99, 102, 241, 0.1)', 
                color: '#6366f1', 
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: 2,
                '& .MuiAlert-icon': { color: '#6366f1' }
              }}
            >
              Network Protocol Success! Initializing Redirect...
            </Alert>
          )}
          
          <form onSubmit={handleRegister}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="NEW_IDENTITY_ID"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ sx: { color: 'rgba(99, 102, 241, 0.4)', fontWeight: 800 } }}
              InputProps={{
                sx: { 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.2)', 
                  borderRadius: 3,
                  '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(99, 102, 241, 0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                }
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="NEURAL_MATRIX_ENCRYPTION"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ sx: { color: 'rgba(99, 102, 241, 0.4)', fontWeight: 800 } }}
              InputProps={{
                sx: { 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.2)', 
                  borderRadius: 3,
                  '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(99, 102, 241, 0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'rgba(255,255,255,0.3)' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="CONFIRM_NEURAL_MATRIX"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{ sx: { color: 'rgba(16, 185, 129, 0.4)', fontWeight: 800 } }}
              InputProps={{
                sx: { 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.2)', 
                  borderRadius: 3,
                  '& fieldset': { borderColor: 'rgba(16, 185, 129, 0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(16, 185, 129, 0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#10b981' }
                }
              }}
              sx={{ mb: 4 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || success}
              sx={{ 
                py: 1.8, 
                mb: 3, 
                borderRadius: 3, 
                fontWeight: 900,
                fontSize: '0.9rem',
                letterSpacing: 1,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 8px 20px -5px rgba(99, 102, 241, 0.4)',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 25px -5px rgba(99, 102, 241, 0.5)' }
              }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
            >
              {loading ? 'ESTABLISHING PROTOCOL...' : 'CREATE IDENTITY'}
            </Button>
            <Box textAlign="center">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: '#6366f1', fontWeight: 800, '&:hover': { color: '#818cf8' } }}>
                  EXISTING IDENTITY? SECURE SIGN IN
                </Typography>
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
