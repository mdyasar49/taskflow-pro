import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  CircularProgress, 
  Stack 
} from '@mui/material';
import { 
  Assessment as StatsIcon, 
  Add as AddIcon, 
  Refresh as RefreshIcon,
  Assignment as TotalIcon,
  RadioButtonUnchecked as OpenIcon,
  PendingActions as PendingIcon,
  PlaylistAddCheck as DoneIcon 
} from '@mui/icons-material';
import StatCard from './StatCard';

const AnalysisView = ({ stats, setView, setOpenForm, fetchTasks }) => {
  return (
    <Box 
      className="animate-fade-in"
      sx={{ 
        flex: 1, 
        overflow: 'hidden', 
        p: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          System Intelligence
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 400, opacity: 0.8 }}>
          Real-time metrics and task distribution analysis.
        </Typography>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Inventory" value={stats.total} icon={<TotalIcon sx={{ fontSize: 18 }}/>} color="#6366f1" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Initial Phase" value={stats.pending} icon={<OpenIcon sx={{ fontSize: 18 }}/>} color="#0ea5e9" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="In Execution" value={stats.progress} icon={<PendingIcon sx={{ fontSize: 18 }}/>} color="#f59e0b" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Goal Reached" value={stats.done} icon={<DoneIcon sx={{ fontSize: 18 }}/>} color="#6366f1" />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                textAlign: 'center', 
                bgcolor: 'background.paper', 
                minHeight: 350, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05) 0%, rgba(15, 23, 42, 0) 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'relative', mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {/* Background Pulse Glow */}
                  <Box sx={{ 
                    position: 'absolute', 
                    width: 140, 
                    height: 140, 
                    borderRadius: '50%', 
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    filter: 'blur(20px)',
                    animation: 'pulse 3s infinite'
                  }} />
                  
                  {/* Outer Track */}
                  <CircularProgress 
                    variant="determinate" 
                    value={100} 
                    size={140} 
                    thickness={1.5} 
                    sx={{ color: 'action.hover', position: 'absolute' }} 
                  />
                  
                  {/* Primary Progress */}
                  <CircularProgress 
                    variant="determinate" 
                    value={stats.total > 0 ? (stats.done / stats.total) * 100 : 0} 
                    size={140} 
                    thickness={4} 
                    sx={{ 
                        color: '#6366f1', 
                      filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))',
                      strokeLinecap: 'round'
                    }} 
                  />
                  
                  <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', lineHeight: 1 }}>
                          {stats.total > 0 ? `${Math.round((stats.done / stats.total) * 100)}%` : '0%'}
                      </Typography>
                      <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 800, fontSize: '0.65rem' }}>SYNCED</Typography>
                  </Box>
              </Box>

              <Typography variant="h5" gutterBottom sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: -0.5 }}>
                  {stats.total > 0 ? `Mission Success Probability: ${Math.round((stats.done / stats.total) * 100)}%` : 'Neural Link Status: Awaiting Data'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 4, maxWidth: 500, fontSize: '0.95rem', opacity: 0.7, fontWeight: 500 }}>
                System-wide productivity is calculated by cross-referencing completed goals against all active operational initiatives.
              </Typography>
              
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => setView('table')}
                sx={{ 
                  borderRadius: 3, 
                  px: 6, 
                  py: 1.8, 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  fontSize: '0.85rem',
                  letterSpacing: 1.5,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.6)',
                      borderColor: 'primary.light'
                  }
                }}
              >
                ENTER OPERATIONS CENTER
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                  p: 3, 
                  borderRadius: 4, 
                  bgcolor: 'background.paper', 
                  color: 'text.primary',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>Control Panel</Typography>
              <Stack spacing={2} sx={{ flex: 1, justifyContent: 'center' }}>
                <Box sx={{ animation: 'float 4s ease-in-out infinite' }}>
                    <Typography variant="caption" sx={{ opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>Initiate New</Typography>
                    <Button 
                      fullWidth
                      variant="contained" 
                      startIcon={<AddIcon />} 
                      onClick={() => setOpenForm(true)}
                      sx={{ 
                        mt: 1, 
                        py: 1.5, 
                        borderRadius: 2, 
                        bgcolor: '#6366f1', 
                        fontWeight: 800,
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          bgcolor: '#4f46e5',
                          transform: 'scale(1.05)',
                          boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
                        } 
                      }}
                    >
                      DEPLOY TASK
                    </Button>
                </Box>
                <Box sx={{ animation: 'float 5s ease-in-out infinite', animationDelay: '0.5s' }}>
                    <Typography variant="caption" sx={{ opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>System Sync</Typography>
                    <Button 
                      fullWidth
                      variant="outlined" 
                      startIcon={<RefreshIcon />}
                      onClick={fetchTasks}
                      sx={{ 
                        mt: 1, 
                        py: 1.5, 
                        borderRadius: 2, 
                        color: '#6366f1', 
                        borderColor: 'rgba(99, 102, 241, 0.3)', 
                        fontWeight: 800,
                        '&:hover': { 
                          borderColor: '#6366f1', 
                          bgcolor: 'rgba(99, 102, 241, 0.05)',
                          transform: 'scale(1.05)'
                        } 
                      }}
                    >
                      REFRESH DATA
                    </Button>
                </Box>
              </Stack>
              <Box sx={{ mt: 'auto', pt: 2, opacity: 0.5, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>System Status: Optimal</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AnalysisView;
