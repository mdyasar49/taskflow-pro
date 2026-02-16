import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { taskService, authService } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_TOKEN_KEY, USERNAME_KEY } from '../../config';
import { 
  Container,
  Typography, 
  Button, 
  Box, 
  Grid, 
  Paper, 
  TextField, 
  Alert,
  CircularProgress,
  Divider,
  Stack,
  Avatar,
  Tooltip,
  useTheme,
  Menu,
  MenuItem,
  Select,
  FormControl,
  TablePagination,
  IconButton,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Logout as LogoutIcon, 
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Assessment as StatsIcon,
  PlaylistAddCheck as DoneIcon,
  PendingActions as PendingIcon,
  Assignment as TotalIcon,
  FilterList as FilterIcon,
  RadioButtonUnchecked as OpenIcon,
  AccountCircle as ProfileIcon,
  Lock as SecurityIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  VpnKey as PasswordIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  IosShare as ExportIcon
} from '@mui/icons-material';
import TaskForm from '../../sections/tasks/TaskForm';
import TaskList from '../../sections/tasks/TaskList';
import AnalysisView from '../../components/dashboard/AnalysisView';
import UserProfile from '../../components/dashboard/UserProfile';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { view = 'analysis' } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUsername, setEditUsername] = useState(localStorage.getItem(USERNAME_KEY) || '');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const openMenu = Boolean(anchorEl);
  
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  
  const handleViewChange = (newView) => {
    navigate(`/dashboard/${newView}`);
    setIsEditingProfile(false);
    handleMenuClose();
  };

  const handleUpdateProfile = () => {
    if (editUsername.trim()) {
      localStorage.setItem(USERNAME_KEY, editUsername.trim());
      setIsEditingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
        setError("New passwords do not match.");
        return;
    }
    // Simulation of API call
    setError(null);
    setIsEditingPassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
    // Show success alert logic can be added here
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks(page, rowsPerPage, filterStatus);
      setTasks(data.content || []);
      setTotalTasks(data.totalElements || 0);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filterStatus]);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate, fetchTasks]);

  const handleCreateTask = async (taskData) => {
    const username = localStorage.getItem(USERNAME_KEY);
    try {
      if (taskData.id) {
          await taskService.updateTask(taskData.id, { ...taskData, modifiedBy: username });
      } else {
          await taskService.createTask({ ...taskData, createdBy: username, modifiedBy: username });
      }
      fetchTasks();
      handleCloseForm();
    } catch (err) {
      setError(taskData.id ? 'Failed to update task.' : 'Failed to create task.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingTask(null);
  };

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete) {
      try {
        await taskService.deleteTask(taskToDelete);
        fetchTasks();
        setDeleteConfirmationOpen(false);
        setTaskToDelete(null);
      } catch (err) {
        setError('Failed to delete task.');
      }
    }
  };

  const handleRestartTask = async (task) => {
    if (window.confirm(`Restarting this operation will create a NEW task with the same specifications. Continue?`)) {
      const username = localStorage.getItem(USERNAME_KEY);
      const clonedTask = {
        title: `(RESTARTED) ${task.title}`,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        status: 'Open',
        createdBy: username,
        modifiedBy: username
      };

      try {
        await taskService.createTask(clonedTask);
        fetchTasks();
      } catch (err) {
        setError('Failed to restart task as new entry.');
      }
    }
  };

  const handleUpdateStatus = async (task) => {
    const statusCycle = ['Open', 'In Progress', 'In Review', 'On Hold', 'Done'];
    const currentIndex = statusCycle.indexOf(task.status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    const username = localStorage.getItem(USERNAME_KEY) || 'SYSTEM';
    
    try {
      await taskService.updateTask(task.id, { 
        ...task, 
        status: nextStatus, 
        modifiedBy: username 
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleExportCSV = () => {
    if (tasks.length === 0) return;
    
    const headers = ['ID', 'Title', 'Description', 'Status', 'Priority', 'Due Date', 'Created By', 'Created On'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(t => [
        t.id,
        `"${t.title.replace(/"/g, '""')}"`,
        `"${(t.description || '').replace(/"/g, '""')}"`,
        t.status,
        t.priority || 'Medium',
        t.dueDate || 'N/A',
        t.createdBy,
        t.createdOn
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tasks_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stats = useMemo(() => {
    return {
      total: totalTasks,
      done: tasks.filter(t => t.status === 'Done').length,
      pending: tasks.filter(t => t.status === 'Open' || t.status === 'In Review').length,
      progress: tasks.filter(t => t.status === 'In Progress' || t.status === 'On Hold').length,
    };
  }, [tasks, totalTasks]);

  const filteredTasks = (tasks || []).filter(task => 
    (task.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (task.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTable = () => (
    <Container 
      maxWidth="xl" 
      className="animate-fade-in"
      sx={{ mt: 3, mb: 3, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#f8fafc' }}>Operations Console</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<ExportIcon />}
            onClick={handleExportCSV}
            sx={{ 
              borderRadius: 3, 
              px: 3, 
              fontWeight: 800, 
              color: '#94a3b8',
              borderColor: 'rgba(148, 163, 184, 0.3)',
              '&:hover': { borderColor: '#6366f1', color: '#6366f1', bgcolor: 'rgba(99, 102, 241, 0.05)' }
            }}
          >
            EXPORT
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
            sx={{ 
              borderRadius: 3, 
              px: 4, 
              py: 1.2, 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
          >
            NEW TASK
          </Button>
        </Box>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
            borderRadius: 4, 
            overflow: 'hidden', 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            bgcolor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
        }}
      >
        <Box p={3} borderBottom="1px solid rgba(148, 163, 184, 0.1)" bgcolor="transparent">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <TextField
                placeholder="Lookup by title, ID or description..."
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <SearchIcon color="disabled" sx={{ mr: 1, fontSize: 22 }} />,
                  sx: { 
                    borderRadius: 3, 
                    bgcolor: 'rgba(15, 23, 42, 0.5)', 
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(99, 102, 241, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(99, 102, 241, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#6366f1',
                    }
                  }
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl size="small" fullWidth>
                <Select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setPage(0);
                  }}
                  startAdornment={<FilterIcon fontSize="small" sx={{ mr: 1, color: '#94a3b8' }} />}
                  sx={{ borderRadius: 3, bgcolor: 'rgba(15, 23, 42, 0.5)', border: 'none', color: 'white', '& fieldset': { border: 'none' } }}
                >
                  <MenuItem value="All">All Statuses</MenuItem>
                  <MenuItem value="Open">Pending Initiatives</MenuItem>
                  <MenuItem value="In Progress">Active Runtimes</MenuItem>
                  <MenuItem value="In Review">In Review</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                  <MenuItem value="Done">Completed Missions</MenuItem>
                  <MenuItem value="Canceled">Canceled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1} textAlign="right">
              <IconButton 
                onClick={fetchTasks} 
                sx={{ bgcolor: 'rgba(15, 23, 42, 0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.8)' } }}
              >
                <RefreshIcon size="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: 'transparent' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
              <CircularProgress thickness={5} size={50} sx={{ color: '#6366f1' }} />
            </Box>
          ) : (
            <>
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <TaskList 
                  tasks={filteredTasks} 
                  onUpdateStatus={handleUpdateStatus} 
                  onDeleteTask={handleDeleteTask} 
                  onEditTask={handleEditTask}
                  onRestartTask={handleRestartTask}
                />
              </Box>
              <Box sx={{ p: 1, bgcolor: 'rgba(15, 23, 42, 0.3)' }}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalTasks}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ border: 'none', color: '#94a3b8' }}
                  />
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#0f172a', color: '#f8fafc', overflow: 'hidden' }}>
      {/* Password Update Dialog */}
      <Dialog 
        open={isEditingPassword} 
        onClose={() => setIsEditingPassword(false)}
        PaperProps={{
          sx: { 
            bgcolor: '#0a0f1e', 
            backgroundImage: 'none', 
            borderRadius: 6, 
            border: '1px solid rgba(99, 102, 241, 0.1)',
            minWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 900, pb: 1 }}>Update Security Keys</DialogTitle>
        <DialogContent>
          <Typography variant="caption" sx={{ color: '#94a3b8', mb: 3, display: 'block' }}>Re-verify your neural encryption credentials.</Typography>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Current Access Key"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              InputLabelProps={{ sx: { color: 'rgba(99, 102, 241, 0.4)', fontWeight: 800 } }}
              InputProps={{
                sx: { 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.2)', 
                  borderRadius: 3,
                  '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }
                },
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'rgba(255,255,255,0.3)' }}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                )
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="New Neural Matrix"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              InputLabelProps={{ sx: { color: 'rgba(99, 102, 241, 0.4)', fontWeight: 800 } }}
              InputProps={{ 
                sx: { 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.2)', 
                  borderRadius: 3,
                  '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }
                } 
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Confirm Matrix"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              InputLabelProps={{ sx: { color: 'rgba(99, 102, 241, 0.4)', fontWeight: 800 } }}
              InputProps={{ 
                sx: { 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.2)', 
                  borderRadius: 3,
                  '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }
                } 
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsEditingPassword(false)} sx={{ color: '#94a3b8', fontWeight: 800 }}>ABORT</Button>
          <Button 
            onClick={handleUpdatePassword} 
            variant="contained"
            sx={{ bgcolor: '#6366f1', '&:hover': { bgcolor: '#4f46e5' }, fontWeight: 900, borderRadius: 3, px: 4 }}
          >
            RESTORE
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)', bgcolor: '#020617', color: '#f8fafc' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <StatsIcon sx={{ display: 'flex', mr: 2, color: '#6366f1', fontSize: 28 }} />
            <Typography 
              variant="h5" 
              onClick={() => handleViewChange('analysis')}
              sx={{ fontWeight: 900, flexGrow: 1, letterSpacing: -1, cursor: 'pointer' }}
            >
              TASKFLOW
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={handleMenuOpen}
                sx={{ 
                  textTransform: 'none', 
                  color: '#f8fafc',
                  borderRadius: 3,
                  px: 2,
                  py: 1,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, lineHeight: 1 }}>
                      {localStorage.getItem(USERNAME_KEY) || 'Root Admin'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 700 }}>VERIFIED ADMIN</Typography>
                  </Box>
                  <Avatar 
                    sx={{ 
                      bgcolor: '#6366f1', 
                      width: 38, 
                      height: 38,
                      fontSize: '1rem',
                      fontWeight: 900,
                      boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                    }}
                  >
                    {(localStorage.getItem(USERNAME_KEY) || 'U').charAt(0).toUpperCase()}
                  </Avatar>
                  <ArrowDownIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                </Stack>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                elevation={0}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    borderRadius: 4,
                    minWidth: 240,
                    bgcolor: '#0a0f1e',
                    color: '#f8fafc',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    '& .MuiMenuItem-root': {
                      py: 2,
                      px: 2.5,
                      gap: 2,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.05)', color: '#6366f1' }
                    }
                  }
                }}
              >
                <MenuItem onClick={() => handleViewChange('profile')}>
                  <ProfileIcon sx={{ fontSize: 22 }} /> Personal Data Center
                </MenuItem>
                {view !== 'analysis' && (
                  <MenuItem onClick={() => handleViewChange('analysis')}>
                    <StatsIcon sx={{ fontSize: 22 }} /> Insights Dashboard
                  </MenuItem>
                )}
                <Divider sx={{ my: 1.5, opacity: 0.1, display: 'none' }} />
                <MenuItem onClick={handleLogout} sx={{ color: '#ef4444 !important' }}>
                  <LogoutIcon sx={{ fontSize: 22 }} /> Terminate Session
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {error && (
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Alert severity="error" onClose={() => setError(null)} sx={{ borderRadius: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </Alert>
          </Container>
        )}
        {view === 'analysis' ? (
          <AnalysisView 
            stats={stats} 
            setView={handleViewChange} 
            setOpenForm={setOpenForm} 
            fetchTasks={fetchTasks} 
          />
        ) : view === 'table' ? (
          renderTable()
        ) : (
          <UserProfile 
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
            editUsername={editUsername}
            setEditUsername={setEditUsername}
            handleUpdateProfile={handleUpdateProfile}
            setIsEditingPassword={setIsEditingPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            stats={stats}
            setView={handleViewChange}
            handleLogout={handleLogout}
          />
        )}
      </Box>

      {openForm && (
        <TaskForm 
          task={editingTask}
          onTaskCreated={handleCreateTask} 
          onClose={handleCloseForm} 
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#0a0f1e',
            backgroundImage: 'none',
            borderRadius: 4,
            border: '1px solid rgba(239, 68, 68, 0.3)',
            minWidth: 400,
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#ef4444', fontWeight: 900, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CancelIcon /> CONFIRM DELETION
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#94a3b8', mb: 2 }}>
            Are you sure you want to permanently delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setDeleteConfirmationOpen(false)} sx={{ color: '#94a3b8', fontWeight: 800 }}>
            CANCEL
          </Button>
          <Button 
            onClick={confirmDeleteTask} 
            variant="contained" 
            sx={{ 
              bgcolor: '#ef4444', 
              color: 'white', 
              fontWeight: 900, 
              borderRadius: 3,
              '&:hover': { bgcolor: '#dc2626' }
            }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
