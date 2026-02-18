import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  MenuItem,
  Box,
  Typography,
  IconButton,
  Stack,
  Slide,
  Divider,
  useTheme,
  Grid
} from '@mui/material';
import { 
  Close as CloseIcon, 
  AddCircleOutline as AddIcon,
  Description as DescIcon,
  Flag as StatusIcon,
  Title as TitleIcon
} from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TaskForm = ({ onTaskCreated, onClose, task = null }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'Open');
  const [priority, setPriority] = useState(task ? task.priority : 'MEDIUM');
  const [dueDate, setDueDate] = useState(task && task.dueDate ? task.dueDate.slice(0, 16) : '');
  const theme = useTheme();

  const isReadOnly = task && (task.status === 'Done' || task.status === 'Canceled');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReadOnly || !title.trim()) return;
    
    const taskData = { 
      title, 
      description, 
      status, 
      priority, 
      dueDate: dueDate ? new Date(dueDate).toISOString().slice(0, 19) : null 
    };

    if (task) {
        onTaskCreated({ ...taskData, id: task.id });
    } else {
        onTaskCreated(taskData);
    }
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
        }
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: 'background.default',
            color: 'text.primary',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <AddIcon sx={{ color: '#6366f1' }} />
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  {isReadOnly ? 'View Specifications' : task ? 'Update Objective' : 'Initiate New Task'}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  {isReadOnly ? 'ReadOnly mode for historical records' : task ? 'Modify existing task specifications' : 'Add a new objective to the operations center'}
                </Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.primary', opacity: 0.6, '&:hover': { opacity: 1 } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent 
          sx={{ 
            p: 4, 
            bgcolor: 'background.paper',
            maxHeight: '65vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'rgba(255,255,255,0.02)',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '10px',
              border: '2px solid',
              borderColor: 'background.paper',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              bgcolor: 'rgba(99, 102, 241, 0.2)',
            }
          }}
        >
          <Stack spacing={3.5} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1, display: 'block', letterSpacing: 1 }}>
                TASK IDENTIFIER
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Enter a descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                disabled={isReadOnly}
                slotProps={{
                  input: {
                    startAdornment: <TitleIcon sx={{ color: '#6366f1', mr: 1, fontSize: 18 }} />,
                    sx: { borderRadius: '12px', bgcolor: 'action.hover', fontWeight: 800, fontSize: '0.9rem', color: 'text.primary', '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }, '& .MuiInputBase-input.Mui-disabled': { color: 'text.primary', '-webkitTextFillColor': 'text.primary' } }
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1, display: 'block', letterSpacing: 1 }}>
                SPECIFICATIONS
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Detailed objectives and requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isReadOnly}
                slotProps={{
                  input: {
                    startAdornment: <DescIcon sx={{ color: '#6366f1', mr: 1, mt: 1, alignSelf: 'flex-start', fontSize: 18 }} />,
                    sx: { borderRadius: '12px', bgcolor: 'action.hover', fontWeight: 800, fontSize: '0.9rem', color: 'text.primary', '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }, '& .MuiInputBase-input.Mui-disabled': { color: 'text.primary', '-webkitTextFillColor': 'text.primary' } }
                  }
                }}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1, display: 'block', letterSpacing: 1 }}>
                  OPERATIONAL PHASE
                </Typography>
                <TextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={isReadOnly}
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: <StatusIcon sx={{ color: '#6366f1', mr: 1, fontSize: 18 }} />,
                      sx: { borderRadius: '12px', bgcolor: 'action.hover', fontWeight: 800, fontSize: '0.85rem', color: 'text.primary', '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }, '& .MuiInputBase-input.Mui-disabled': { color: 'text.primary', '-webkitTextFillColor': 'text.primary' } }
                    }
                  }}
                >
                  <MenuItem value="Open" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem' }}>PENDING</MenuItem>
                  <MenuItem value="In Progress" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#3b82f6' }}>RUNNING</MenuItem>
                  <MenuItem value="In Review" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#a855f7' }}>REVIEW</MenuItem>
                  <MenuItem value="On Hold" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#f59e0b' }}>ON HOLD</MenuItem>
                  <MenuItem value="Done" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#6366f1' }}>COMPLETED</MenuItem>
                  <MenuItem value="Canceled" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#ef4444' }}>CANCELED</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1, display: 'block', letterSpacing: 1 }}>
                  PRIORITY LEVEL
                </Typography>
                <TextField
                  select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={isReadOnly}
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: <StatusIcon sx={{ color: priority === 'HIGH' ? '#ef4444' : priority === 'MEDIUM' ? '#f59e0b' : '#3b82f6', mr: 1, fontSize: 18 }} />,
                      sx: { borderRadius: '12px', bgcolor: 'action.hover', fontWeight: 800, fontSize: '0.85rem', color: 'text.primary', '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }, '& .MuiInputBase-input.Mui-disabled': { color: 'text.primary', '-webkitTextFillColor': 'text.primary' } }
                    }
                  }}
                >
                  <MenuItem value="HIGH" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#ef4444' }}>HIGH PRIORITY</MenuItem>
                  <MenuItem value="MEDIUM" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#f59e0b' }}>MEDIUM</MenuItem>
                  <MenuItem value="LOW" sx={{ py: 1, fontWeight: 700, fontSize: '0.8rem', color: '#3b82f6' }}>LOW</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1, display: 'block', letterSpacing: 1 }}>
                  TARGET DEADLINE
                </Typography>
                <TextField
                  fullWidth
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isReadOnly}
                  slotProps={{
                    input: {
                      sx: { 
                        borderRadius: '12px', 
                        bgcolor: 'action.hover', 
                        fontWeight: 800, 
                        fontSize: '0.85rem', 
                        color: 'text.primary', 
                        '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' }, 
                        '& .MuiInputBase-input.Mui-disabled': { color: 'text.primary', '-webkitTextFillColor': 'text.primary' },
                        '& ::-webkit-calendar-picker-indicator': {
                            filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                            cursor: 'pointer'
                        }
                      }
                    },
                    inputLabel: {
                      shrink: true
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <Divider sx={{ opacity: 0.5 }} />

        <DialogActions sx={{ p: 3, bgcolor: 'background.default' }}>
          <Button 
            onClick={onClose} 
            sx={{ 
                color: 'text.secondary', 
                fontWeight: 700, 
                px: 3, 
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } 
            }}
          >
            Cancel
          </Button>
          {!isReadOnly && (
            <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                    borderRadius: 3, 
                    px: 4, 
                    py: 1.2, 
                    fontWeight: 900, 
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 15px rgba(99, 102, 241, 0.4)',
                    }
                }}
            >
                {task ? 'Modify Task' : 'Deploy Task'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
