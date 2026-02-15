import React from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Box, 
  Avatar, 
  Typography, 
  TextField, 
  IconButton, 
  Stack, 
  Button, 
  Divider, 
  LinearProgress 
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Save as SaveIcon, 
  Cancel as CancelIcon, 
  Security as SecurityIcon, 
  Assessment as StatsIcon, 
  VpnKey as PasswordIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { USERNAME_KEY } from '../../config';

const UserProfile = ({ 
  isEditingProfile, 
  setIsEditingProfile, 
  editUsername, 
  setEditUsername, 
  handleUpdateProfile, 
  setIsEditingPassword, 
  showPassword, 
  setShowPassword, 
  stats, 
  setView, 
  handleLogout 
}) => {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
      <Container maxWidth="lg" className="animate-fade-in" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column: Essential ID Card */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 8, 
                bgcolor: 'rgba(15, 23, 42, 0.8)', 
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(16, 185, 129, 0.1)',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-block', mx: 'auto', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 160, 
                    height: 160, 
                    bgcolor: '#10b981', 
                    fontSize: '4.5rem', 
                    fontWeight: 900,
                    boxShadow: '0 0 0 12px rgba(16, 185, 129, 0.05), 0 20px 40px -10px rgba(0,0,0,0.5)',
                    border: '4px solid rgba(16, 185, 129, 0.2)'
                  }}
                >
                  {(localStorage.getItem(USERNAME_KEY) || 'U').charAt(0).toUpperCase()}
                </Avatar>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 5, 
                    right: 5, 
                    bgcolor: '#10b981', 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    border: '4px solid #1e293b',
                    boxShadow: '0 0 10px #10b981'
                  }} 
                />
              </Box>

              {isEditingProfile ? (
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="IDENTITY_ID"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    autoFocus
                    InputLabelProps={{ sx: { color: 'rgba(16, 185, 129, 0.4)', fontWeight: 800 } }}
                    InputProps={{
                      sx: { 
                        color: 'white', 
                        fontWeight: 900, 
                        fontSize: '1.2rem', 
                        textAlign: 'center',
                        bgcolor: 'rgba(0,0,0,0.2)',
                        borderRadius: 3,
                        '& fieldset': { borderColor: 'rgba(16, 185, 129, 0.2)' }
                      }
                    }}
                    sx={{ mb: 3 }}
                  />
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton onClick={handleUpdateProfile} sx={{ bgcolor: '#10b981', color: 'white', '&:hover': { bgcolor: '#059669' } }}><SaveIcon fontSize="small" /></IconButton>
                    <IconButton onClick={() => setIsEditingProfile(false)} sx={{ bgcolor: '#ef4444', color: 'white', '&:hover': { bgcolor: '#dc2626' } }}><CancelIcon fontSize="small" /></IconButton>
                  </Stack>
                </Box>
              ) : (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: 'white', mb: 0.5, letterSpacing: -1 }}>
                    {localStorage.getItem(USERNAME_KEY)}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#10b981', fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.75rem' }}>
                    Master Administrator
                  </Typography>
                  <Button 
                    startIcon={<EditIcon />} 
                    onClick={() => setIsEditingProfile(true)}
                    sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 700, '&:hover': { color: 'white' } }}
                  >
                    Modify Identity
                  </Button>
                </>
              )}

              <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.05)' }} />

              <Stack spacing={2}>
                <Box sx={{ px: 2, py: 1.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SecurityIcon sx={{ color: '#10b981' }} />
                  <Box textAlign="left">
                     <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>Access Tier</Typography>
                     <Typography variant="body2" sx={{ fontWeight: 800, color: 'white' }}>Level 04 - Root</Typography>
                  </Box>
                </Box>
                <Box sx={{ px: 2, py: 1.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StatsIcon sx={{ color: '#f59e0b' }} />
                  <Box textAlign="left">
                     <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>Status</Typography>
                     <Typography variant="body2" sx={{ fontWeight: 800, color: 'white' }}>Operational</Typography>
                  </Box>
                </Box>
                <Box sx={{ px: 2, py: 1.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
                  <PasswordIcon sx={{ color: '#ec4899' }} />
                  <Box textAlign="left" sx={{ flex: 1 }}>
                     <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>Security Matrix</Typography>
                     <Typography variant="body2" sx={{ fontWeight: 800, color: 'white' }}>
                      {showPassword ? 'Admin@2026' : '••••••••••••'}
                     </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: 'white' } }}
                  >
                    {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                  </IconButton>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column: Detailed Analytics & Control */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Stats Matrix */}
              <Paper 
                 elevation={0}
                 sx={{ 
                   p: 4, 
                   borderRadius: 8, 
                   bgcolor: 'rgba(15, 23, 42, 0.8)', 
                   backdropFilter: 'blur(30px)',
                   border: '1px solid rgba(16, 185, 129, 0.1)',
                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'white', mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StatsIcon sx={{ color: '#10b981' }} /> Neural Link Performance
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 3, borderRadius: 6, bgcolor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                      <Typography variant="h2" sx={{ fontWeight: 900, color: '#10b981', mb: 1 }}>{stats.total}</Typography>
                      <Typography variant="overline" sx={{ color: '#94a3b8', fontWeight: 900, letterSpacing: 2 }}>Total Data Nodes</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 3, borderRadius: 6, bgcolor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                      <Typography variant="h2" sx={{ fontWeight: 900, color: '#10b981', mb: 1 }}>{stats.done}</Typography>
                      <Typography variant="overline" sx={{ color: '#94a3b8', fontWeight: 900, letterSpacing: 2 }}>Nodes Terminated</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ p: 3, borderRadius: 6, bgcolor: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                        <Typography variant="overline" sx={{ color: '#94a3b8', fontWeight: 900, letterSpacing: 2 }}>Sync Completion</Typography>
                        <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 900, lineHeight: 1 }}>{stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={stats.total > 0 ? (stats.done / stats.total) * 100 : 0} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5, 
                          bgcolor: 'rgba(255,255,255,0.05)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)'
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Session Actions */}
              <Paper 
                 elevation={0}
                 sx={{ 
                   p: 4, 
                   borderRadius: 8, 
                   bgcolor: 'rgba(15, 23, 42, 0.8)', 
                   backdropFilter: 'blur(30px)',
                   border: '1px solid rgba(16, 185, 129, 0.1)',
                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'white', mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LogoutIcon sx={{ color: '#ef4444' }} /> System Override
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => setView('analysis')}
                      sx={{ py: 2, borderRadius: 4, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontWeight: 900 }}
                    >
                      RESUME
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={() => setIsEditingPassword(true)}
                      startIcon={<PasswordIcon />}
                      sx={{ py: 2, borderRadius: 4, borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10b981', fontWeight: 900 }}
                    >
                      KEYS
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={handleLogout}
                      sx={{ py: 2, borderRadius: 4, borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444', fontWeight: 900 }}
                    >
                      EXIT
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserProfile;
