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
  Logout as LogoutIcon,
  AdminPanelSettings as ShieldIcon
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
    <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
      <Container maxWidth="xl" className="animate-fade-in">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Neural Identity Profile
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 400, opacity: 0.8 }}>
            Core operator credentials and operational performance metrics.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column: Essential ID Card */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 8, 
                bgcolor: 'background.paper', 
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.7)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  boxShadow: '0 40px 80px -15px rgba(99, 102, 241, 0.1)'
                }
              }}
            >
              {/* Decorative Glow */}
              <Box sx={{ 
                position: 'absolute', 
                top: -50, 
                right: -50, 
                width: 150, 
                height: 150, 
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }} />

              <Box sx={{ position: 'relative', display: 'inline-block', mx: 'auto', mb: 3, animation: 'float 6s infinite ease-in-out' }}>
                <Avatar 
                  sx={{ 
                    width: 160, 
                    height: 160, 
                    bgcolor: '#6366f1', 
                    fontSize: '4.5rem', 
                    fontWeight: 900,
                    boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)',
                    border: '4px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {(localStorage.getItem(USERNAME_KEY) || 'U').charAt(0).toUpperCase()}
                </Avatar>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 15, 
                    right: 15, 
                    bgcolor: '#6366f1', 
                    width: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    border: '4px solid',
                    borderColor: 'background.paper',
                    boxShadow: '0 0 15px #6366f1',
                    animation: 'pulse 2s infinite'
                  }} 
                >
                   <ShieldIcon sx={{ color: 'white', fontSize: 14, mt: 0.2 }} />
                </Box>
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
                    slotProps={{
                      inputLabel: { sx: { color: 'rgba(99, 102, 241, 0.6)', fontWeight: 800 } },
                      input: {
                        sx: { 
                          color: 'text.primary', 
                          fontWeight: 900, 
                          fontSize: '1.2rem', 
                          textAlign: 'center',
                          bgcolor: 'action.hover',
                          borderRadius: 3,
                          '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.4)' },
                          '&:hover fieldset': { borderColor: '#6366f1' }
                        }
                      }
                    }}
                    sx={{ mb: 3 }}
                  />
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button 
                      variant="contained" 
                      onClick={handleUpdateProfile} 
                      startIcon={<SaveIcon />}
                      sx={{ 
                        bgcolor: '#6366f1', 
                        fontWeight: 900, 
                        px: 4, 
                        py: 1.2,
                        borderRadius: 3,
                        boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
                        '&:hover': { bgcolor: '#4f46e5' }
                      }}
                    >
                      COMMIT
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => setIsEditingProfile(false)} 
                      sx={{ 
                        color: '#f87171', 
                        borderColor: 'rgba(248, 113, 113, 0.3)', 
                        fontWeight: 900, 
                        px: 3,
                        borderRadius: 3,
                        '&:hover': { borderColor: '#f87171', bgcolor: 'rgba(248, 113, 113, 0.05)' }
                      }}
                    >
                      ABORT
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary', mb: 0.5, letterSpacing: -1 }}>
                    {localStorage.getItem(USERNAME_KEY)}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#6366f1', fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.75rem' }}>
                    AUTHORIZED MASTER OPERATOR
                  </Typography>
                  <Button 
                    startIcon={<EditIcon />} 
                    onClick={() => setIsEditingProfile(true)}
                    sx={{ 
                      color: '#6366f1', 
                      textTransform: 'uppercase', 
                      fontWeight: 800, 
                      letterSpacing: 1,
                      fontSize: '0.7rem',
                      bgcolor: 'rgba(99, 102, 241, 0.05)',
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      '&:hover': { color: 'white', bgcolor: 'rgba(99, 102, 241, 0.2)', transform: 'scale(1.02)' },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Modify Neural Identity
                  </Button>
                </>
              )}

              <Divider sx={{ my: 4, borderColor: 'rgba(99, 102, 241, 0.1)' }} />

              <Stack spacing={2.5}>
                <Box sx={{ 
                  px: 2.5, 
                  py: 2, 
                  borderRadius: 4, 
                  bgcolor: 'rgba(99, 102, 241, 0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }
                }}>
                  <SecurityIcon sx={{ color: '#6366f1', fontSize: 24 }} />
                  <Box textAlign="left">
                     <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1, fontWeight: 800, letterSpacing: 1 }}>ACCESS PRIVILEGE</Typography>
                     <Typography variant="body2" sx={{ fontWeight: 900, color: 'text.primary', fontSize: '0.9rem' }}>LEVEL 04 - ROOT CONTROL</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  px: 2.5, 
                  py: 2, 
                  borderRadius: 4, 
                  bgcolor: 'rgba(245, 158, 11, 0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.4)' }
                }}>
                  <StatsIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
                  <Box textAlign="left">
                     <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1, fontWeight: 800, letterSpacing: 1 }}>SYNCHRONIZATION</Typography>
                     <Typography variant="body2" sx={{ fontWeight: 900, color: 'text.primary', fontSize: '0.9rem' }}>ACTIVE_OPERATIONAL</Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  px: 2.5, 
                  py: 2, 
                  borderRadius: 4, 
                  bgcolor: 'rgba(236, 72, 153, 0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  border: '1px solid rgba(236, 72, 153, 0.2)', 
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: 'rgba(236, 72, 153, 0.1)', borderColor: 'rgba(236, 72, 153, 0.4)' }
                }}>
                  <PasswordIcon sx={{ color: '#ec4899', fontSize: 24 }} />
                  <Box textAlign="left" sx={{ flex: 1 }}>
                     <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1, fontWeight: 800, letterSpacing: 1 }}>ENCRYPTION KEY</Typography>
                     <Typography variant="body2" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: 3, fontSize: '0.9rem' }}>
                      {showPassword ? 'Admin@2026' : '••••••••••••'}
                     </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: 'action.active', '&:hover': { color: 'text.primary', bgcolor: 'action.hover' } }}
                  >
                    {showPassword ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
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
                   bgcolor: 'background.paper', 
                   backdropFilter: 'blur(30px)',
                   border: '1px solid rgba(99, 102, 241, 0.15)',
                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                   <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1.5, letterSpacing: 0.5 }}>
                     <StatsIcon sx={{ color: '#6366f1' }} /> SYSTEM PERFORMANCE MATRIX
                   </Typography>
                   <Box sx={{ bgcolor: 'rgba(99, 102, 241, 0.15)', px: 2, py: 0.8, borderRadius: 2, border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                      <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 900, letterSpacing: 1.5 }}>LIVE_TELEMETRY</Typography>
                   </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 4, borderRadius: 6, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', textAlign: 'center', transition: 'all 0.3s ease', '&:hover': { border: '1px solid rgba(255,255,255,0.1)', transform: 'translateY(-4px)' } }}>
                      <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: -2 }}>{stats.total}</Typography>
                      <Typography variant="overline" sx={{ color: '#94a3b8', fontWeight: 900, letterSpacing: 2, opacity: 0.8 }}>TOTAL DEPLOYMENTS</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 4, borderRadius: 6, bgcolor: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center', transition: 'all 0.3s ease', '&:hover': { borderColor: '#6366f1', bgcolor: 'rgba(99, 102, 241, 0.12)', transform: 'translateY(-4px)' } }}>
                      <Typography variant="h2" sx={{ fontWeight: 900, color: '#6366f1', mb: 1, letterSpacing: -2 }}>{stats.done}</Typography>
                      <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 900, letterSpacing: 2 }}>SUCCESSFUL EXECUTIONS</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 4, borderRadius: 6, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', position: 'relative', overflow: 'hidden' }}>
                      {/* Scanning Effect */}
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: '-100%', 
                        width: '50%', 
                        height: '100%', 
                        background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)', 
                        animation: 'shimmer 3s infinite' 
                      }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                        <Typography variant="overline" sx={{ color: '#94a3b8', fontWeight: 900, letterSpacing: 3 }}>EFFICIENCY RATING</Typography>
                        <Box sx={{ textAlign: 'right' }}>
                           <Typography variant="h4" sx={{ color: '#6366f1', fontWeight: 900, lineHeight: 1 }}>{stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}%</Typography>
                           <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1 }}>AUTO_TUNED</Typography>
                        </Box>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={stats.total > 0 ? (stats.done / stats.total) * 100 : 0} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 6, 
                          bgcolor: 'action.hover',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 6,
                            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                            boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)'
                          }
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>

              {/* Session Actions */}
              <Paper 
                 elevation={0}
                 sx={{ 
                   p: 4, 
                   borderRadius: 8, 
                   bgcolor: 'background.paper', 
                   backdropFilter: 'blur(30px)',
                   border: '1px solid rgba(99, 102, 241, 0.15)',
                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LogoutIcon sx={{ color: '#ef4444' }} /> EMERGENCY OVERRIDE CONTROLS
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => setView('analysis')}
                      sx={{ 
                        py: 2, 
                        borderRadius: 3, 
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                        fontWeight: 900,
                        letterSpacing: 1.5,
                        '&:hover': { transform: 'scale(1.02)', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)' }
                      }}
                    >
                      RESUME FEED
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={() => setIsEditingPassword(true)}
                      startIcon={<PasswordIcon />}
                      sx={{ 
                        py: 2, 
                        borderRadius: 3, 
                        borderColor: 'rgba(99, 102, 241, 0.4)', 
                        color: '#6366f1', 
                        fontWeight: 900,
                        letterSpacing: 1,
                        '&:hover': { borderColor: '#6366f1', bgcolor: 'rgba(99, 102, 241, 0.05)' }
                      }}
                    >
                      UPDATE KEYS
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={handleLogout}
                      sx={{ 
                        py: 2, 
                        borderRadius: 3, 
                        borderColor: 'rgba(239, 68, 68, 0.4)', 
                        color: '#ef4444', 
                        fontWeight: 900,
                        letterSpacing: 1.5,
                        '&:hover': { borderColor: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.05)' }
                      }}
                    >
                      EXIT SYSTEM
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
