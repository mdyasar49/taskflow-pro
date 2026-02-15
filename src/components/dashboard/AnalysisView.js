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
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, background: 'linear-gradient(45deg, #10b981 30%, #06b6d4 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          System Intelligence
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 400, opacity: 0.8 }}>
          Real-time metrics and task distribution analysis.
        </Typography>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Inventory" value={stats.total} icon={<TotalIcon sx={{ fontSize: 18 }}/>} color="#10b981" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Initial Phase" value={stats.pending} icon={<OpenIcon sx={{ fontSize: 18 }}/>} color="#0ea5e9" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="In Execution" value={stats.progress} icon={<PendingIcon sx={{ fontSize: 18 }}/>} color="#f59e0b" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Goal Reached" value={stats.done} icon={<DoneIcon sx={{ fontSize: 18 }}/>} color="#10b981" />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                textAlign: 'center', 
                bgcolor: 'rgba(15, 23, 42, 0.4)', 
                minHeight: 350, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                border: '1px solid rgba(16, 185, 129, 0.1)',
                background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.05) 0%, rgba(15, 23, 42, 0) 100%)'
              }}
            >
              <Box sx={{ position: 'relative', mb: 2 }}>
                  <StatsIcon sx={{ fontSize: 100, color: '#e2e8f0' }} />
                  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                     <CircularProgress variant="determinate" value={stats.total > 0 ? (stats.done / stats.total) * 100 : 0} size={120} thickness={2} sx={{ color: '#10b981' }} />
                  </Box>
              </Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 900, color: 'white' }}>
                  {stats.total > 0 ? `${Math.round((stats.done / stats.total) * 100)}% Completed` : 'No Tasks Yet'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3, maxWidth: 500, fontSize: '1rem' }}>
                Your productivity is calculated based on completed milestones vs open initiatives.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => setView('table')}
                sx={{ 
                  borderRadius: 3, 
                  px: 6, 
                  py: 1.5, 
                  fontWeight: 800, 
                  textTransform: 'none', 
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.4)',
                  '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 30px -10px rgba(16, 185, 129, 0.5)',
                  }
                }}
              >
                Access Operations Center
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                  p: 3, 
                  borderRadius: 4, 
                  bgcolor: '#0f172a', 
                  color: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(16, 185, 129, 0.1)',
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>Control Panel</Typography>
              <Stack spacing={2} sx={{ flex: 1, justifyContent: 'center' }}>
                <Box>
                    <Typography variant="caption" sx={{ opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>Initiate New</Typography>
                    <Button 
                      fullWidth
                      variant="contained" 
                      startIcon={<AddIcon />} 
                      onClick={() => setOpenForm(true)}
                      sx={{ mt: 1, py: 1.5, borderRadius: 2, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, fontWeight: 800 }}
                    >
                      DEPLOY TASK
                    </Button>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>System Sync</Typography>
                    <Button 
                      fullWidth
                      variant="outlined" 
                      startIcon={<RefreshIcon />}
                      onClick={fetchTasks}
                      sx={{ mt: 1, py: 1.5, borderRadius: 2, color: 'white', borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' }, fontWeight: 800 }}
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
