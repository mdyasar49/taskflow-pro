import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  IconButton, 
  Typography,
  Tooltip,
  Box,
  Stack
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Sync as SyncIcon,
  CheckCircle as DoneIcon,
  Schedule as ProgressIcon,
  RadioButtonUnchecked as OpenIcon
} from '@mui/icons-material';
import { formatDate } from '../utils/dateUtils';

const TaskList = ({ tasks, onUpdateStatus, onDeleteTask }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Done':
        return { 
          bg: 'rgba(16, 185, 129, 0.1)', 
          color: '#10b981', 
          icon: <DoneIcon sx={{ fontSize: 14 }} />,
          label: 'COMPLETED'
        };
      case 'In Progress':
        return { 
          bg: 'rgba(16, 185, 129, 0.1)', 
          color: '#10b981', 
          icon: <ProgressIcon sx={{ fontSize: 14 }} />,
          label: 'RUNNING'
        };
      default:
        return { 
          bg: 'rgba(148, 163, 184, 0.1)', 
          color: '#94a3b8', 
          icon: <OpenIcon sx={{ fontSize: 14 }} />,
          label: 'PENDING'
        };
    }
  };

  return (
    <TableContainer component={Box} sx={{ height: '100%', overflow: 'auto' }}>
      <Table stickyHeader sx={{ minWidth: 900 }} aria-label="premium task table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#10b981', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
              TASK DETAILS
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#10b981', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
              CURRENT STATUS
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#10b981', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
              CREATED BY
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#10b981', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
              LAST MODIFIED
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#10b981', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(16, 185, 129, 0.1)' }}>
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 12, borderBottom: 'none' }}>
                <Box sx={{ opacity: 0.3, textAlign: 'center' }}>
                   <OpenIcon sx={{ fontSize: 80, mb: 1, color: '#475569' }} />
                   <Typography variant="h5" sx={{ fontWeight: 900, color: '#94a3b8' }}>CLEAR DECK</Typography>
                   <Typography variant="body2" sx={{ letterSpacing: 1, color: '#64748b' }}>No active initiatives in the current queue.</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => {
              const statusStyle = getStatusStyle(task.status);
              return (
                <TableRow 
                  key={task.id} 
                  sx={{ 
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
                    transition: 'all 0.2s ease',
                    '& td': { borderBottom: '1px solid rgba(255,255,255,0.03)' }
                  }}
                >
                  <TableCell sx={{ py: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                       <Box sx={{ width: 4, height: 40, bgcolor: statusStyle.color, borderRadius: 2, opacity: 0.5 }} />
                       <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>
                            {task.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block', maxWidth: 250 }} noWrap>
                            {task.description || 'No additional specification.'}
                          </Typography>
                       </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Cycle Initiative Phase" arrow>
                      <Box 
                        onClick={() => onUpdateStatus(task)}
                        sx={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '6px',
                          bgcolor: statusStyle.bg,
                          color: statusStyle.color,
                          cursor: 'pointer',
                          fontWeight: 900,
                          fontSize: '0.65rem',
                          letterSpacing: 1,
                          border: `1px solid ${statusStyle.color}20`,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            bgcolor: statusStyle.bg
                          }
                        }}
                      >
                        {statusStyle.icon}
                        {statusStyle.label}
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ px: 1.5, py: 1, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', display: 'inline-block' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>
                        {task.createdBy || 'SYSTEM'}
                      </Typography>
                      <Typography sx={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 700, mt: 0.5, letterSpacing: 0.5 }}>
                        {formatDate(task.createdOn)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ px: 1.5, py: 1, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.05)', display: 'inline-block' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>
                        {task.modifiedBy || 'SYSTEM'}
                      </Typography>
                      <Typography sx={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, mt: 0.5, letterSpacing: 0.5, opacity: 0.8 }}>
                        {formatDate(task.modifiedOn)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="CYCLE PHASE">
                        <IconButton 
                          size="small"
                          onClick={() => onUpdateStatus(task)} 
                          sx={{ color: '#10b981', '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.1)' } }}
                        >
                          <SyncIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="DELETE DATA">
                        <IconButton 
                          size="small"
                          onClick={() => onDeleteTask(task.id)} 
                          sx={{ color: '#ef4444', '&:hover': { bgcolor: '#ef444410' } }}
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
