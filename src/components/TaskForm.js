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
  useTheme
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

const TaskForm = ({ onTaskCreated, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onTaskCreated({ title, description, status });
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
          bgcolor: '#0a0f1e',
          color: 'white',
          border: '1px solid rgba(16, 185, 129, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
        }
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box 
          sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <AddIcon sx={{ color: '#10b981' }} />
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>Initiate New Task</Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>Add a new objective to the operations center</Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} size="small" sx={{ color: 'white', opacity: 0.6, '&:hover': { opacity: 1 } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 4, bgcolor: '#0a0f1e' }}>
          <Stack spacing={3.5} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', mb: 1, display: 'block', letterSpacing: 1 }}>
                TASK IDENTIFIER
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Enter a descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                InputProps={{
                  startAdornment: <TitleIcon sx={{ color: '#10b981', mr: 1, fontSize: 18 }} />,
                  sx: { borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.02)', fontWeight: 800, fontSize: '0.9rem', color: 'white', '& fieldset': { borderColor: 'rgba(16, 185, 129, 0.2)' } }
                }}
              />
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', mb: 1, display: 'block', letterSpacing: 1 }}>
                SPECIFICATIONS
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Detailed objectives and requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                  startAdornment: <DescIcon sx={{ color: '#10b981', mr: 1, mt: 1, alignSelf: 'flex-start', fontSize: 18 }} />,
                  sx: { borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.02)', fontWeight: 800, fontSize: '0.9rem', color: 'white', '& fieldset': { borderColor: 'rgba(16, 185, 129, 0.2)' } }
                }}
              />
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', mb: 1, display: 'block', letterSpacing: 1 }}>
                OPERATIONAL PHASE
              </Typography>
              <TextField
                select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <StatusIcon sx={{ color: '#10b981', mr: 1, fontSize: 18 }} />,
                  sx: { borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.02)', fontWeight: 800, fontSize: '0.9rem', color: 'white', '& fieldset': { borderColor: 'rgba(16, 185, 129, 0.2)' } }
                }}
              >
                <MenuItem value="Open" sx={{ py: 1.5, fontWeight: 900, fontSize: '0.8rem', color: '#94a3b8' }}>PENDING INITIATIVE</MenuItem>
                <MenuItem value="In Progress" sx={{ py: 1.5, fontWeight: 900, fontSize: '0.8rem', color: '#10b981' }}>ACTIVE RUNTIME</MenuItem>
                <MenuItem value="Done" sx={{ py: 1.5, fontWeight: 900, fontSize: '0.8rem', color: '#10b981' }}>COMPLETED MISSION</MenuItem>
              </TextField>
            </Box>
          </Stack>
        </DialogContent>

        <Divider sx={{ opacity: 0.5 }} />

        <DialogActions sx={{ p: 3, bgcolor: '#020617' }}>
          <Button 
            onClick={onClose} 
            sx={{ 
                color: '#64748b', 
                fontWeight: 700, 
                px: 3, 
                textTransform: 'none',
                '&:hover': { bgcolor: '#f1f5f9' } 
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disableElevation
            sx={{ 
                borderRadius: '10px', 
                px: 5, 
                py: 1.2, 
                fontWeight: 800,
                textTransform: 'none',
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.4)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    transform: 'translateY(-1px)'
                }
            }}
          >
            Deploy Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
