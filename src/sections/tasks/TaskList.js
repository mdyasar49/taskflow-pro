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
  RadioButtonUnchecked as OpenIcon,
  Edit as EditIcon,
  PauseCircleOutline as HoldIcon,
  Visibility as ViewIcon,
  Block as CancelIcon,
  Replay as RestartIcon
} from '@mui/icons-material';
import { formatDate } from '../../utils/dateUtils';

const TaskList = ({ tasks, onUpdateStatus, onDeleteTask, onEditTask, onRestartTask, restartedIds = [] }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Done':
        return { bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', icon: <DoneIcon sx={{ fontSize: 14 }} />, label: 'COMPLETED' };
      case 'In Progress':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <ProgressIcon sx={{ fontSize: 14 }} />, label: 'RUNNING' };
      case 'In Review':
        return { bg: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', icon: <ViewIcon sx={{ fontSize: 14 }} />, label: 'REVIEW' };
      case 'On Hold':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', icon: <HoldIcon sx={{ fontSize: 14 }} />, label: 'ON HOLD' };
      case 'Canceled':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: <CancelIcon sx={{ fontSize: 14 }} />, label: 'CANCELED' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', icon: <OpenIcon sx={{ fontSize: 14 }} />, label: 'PENDING' };
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'HIGH':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'MEDIUM':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'LOW':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' };
    }
  };

  const isOverdue = (dateString, status) => {
    if (!dateString || status === 'Done') return false;
    return new Date(dateString) < new Date();
  };

  return (
    <TableContainer component={Box} sx={{ height: '100%', overflow: 'auto' }}>
      <Table stickyHeader sx={{ minWidth: 1250 }} aria-label="premium task table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#6366f1', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', width: 450 }}>
              TASK DETAILS
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#6366f1', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', width: 150 }}>
              CURRENT STATUS
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#6366f1', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', width: 120 }}>
              PRIORITY
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#6366f1', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', width: 180 }}>
              TARGET DEADLINE
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#6366f1', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', width: 180 }}>
              CREATED BY
            </TableCell>
            <TableCell sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#6366f1', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', width: 180 }}>
              LAST MODIFIED
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#0f172a', fontWeight: 800, color: '#6366f1', py: 2.5, fontSize: '0.7rem', letterSpacing: 2, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', width: 150 }}>
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 12, borderBottom: 'none' }}>
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
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      bgcolor: 'rgba(99, 102, 241, 0.03)',
                      '& .left-accent': {
                        opacity: 1,
                        height: '100%',
                        boxShadow: '0 0 15px #6366f1'
                      }
                    },
                    '& td': { borderBottom: '1px solid rgba(255,255,255,0.03)' }
                  }}
                >
                  <TableCell sx={{ py: 3, position: 'relative' }}>
                    <Box 
                      className="left-accent"
                      sx={{ 
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 4, 
                        height: 40, 
                        bgcolor: statusStyle.color, 
                        borderRadius: '0 4px 4px 0', 
                        opacity: 0.4,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 1 }}>
                       <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>
                            {task.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                            {task.description || 'No additional specification.'}
                          </Typography>
                       </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box 
                      sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '6px',
                        bgcolor: statusStyle.bg,
                        color: statusStyle.color,
                        fontWeight: 900,
                        fontSize: '0.65rem',
                        letterSpacing: 1,
                        border: `1px solid ${statusStyle.color}30`,
                        transition: 'all 0.2s ease',
                        animation: (task.status === 'In Progress' || task.status === 'In Review') ? 'pulse 2s infinite' : 'none'
                      }}
                    >
                      {statusStyle.icon}
                      {statusStyle.label}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box 
                      sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1,
                        py: 0.2,
                        borderRadius: '4px',
                        bgcolor: getPriorityStyle(task.priority).bg,
                        color: getPriorityStyle(task.priority).color,
                        fontWeight: 900,
                        fontSize: '0.6rem',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                        border: `1px solid ${getPriorityStyle(task.priority).color}20`
                      }}
                    >
                      {task.priority || 'MEDIUM'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ 
                      color: isOverdue(task.dueDate, task.status) ? '#ef4444' : '#94a3b8',
                      fontWeight: isOverdue(task.dueDate, task.status) ? 900 : 500
                    }}>
                      <Typography sx={{ fontSize: '0.7rem' }}>
                        {task.dueDate ? formatDate(task.dueDate) : 'NO DEADLINE'}
                      </Typography>
                      {isOverdue(task.dueDate, task.status) && (
                        <Typography sx={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', color: '#ef4444' }}>
                          OVERDUE
                        </Typography>
                      )}
                    </Box>
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
                    <Box sx={{ px: 1.5, py: 1, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.03)', border: '1px solid rgba(99, 102, 241, 0.05)', display: 'inline-block' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>
                        {task.modifiedBy || 'SYSTEM'}
                      </Typography>
                      <Typography sx={{ fontSize: '0.6rem', color: '#6366f1', fontWeight: 700, mt: 0.5, letterSpacing: 0.5, opacity: 0.8 }}>
                        {formatDate(task.modifiedOn)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      {task.status === 'Done' || task.status === 'Canceled' ? (
                        <>
                          {task.status === 'Canceled' && !task.title.startsWith('(RESTARTED)') && !restartedIds.includes(task.id) && (
                            <Tooltip title="RESTART OPERATION (CLONE)">
                              <IconButton 
                                size="small"
                                onClick={() => onRestartTask(task)} 
                                sx={{ 
                                  color: '#6366f1', 
                                  '&:hover': { 
                                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                                    transform: 'rotate(180deg)'
                                  },
                                  transition: 'all 0.4s ease'
                                }}
                              >
                                <RestartIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="VIEW SPECIFICATIONS">
                          <IconButton 
                            size="small"
                            onClick={() => onEditTask(task)} 
                            sx={{ 
                              color: '#94a3b8', 
                              '&:hover': { 
                                bgcolor: 'rgba(148, 163, 184, 0.1)',
                                transform: 'scale(1.2)',
                                color: 'white'
                              } 
                            }}
                          >
                            <ViewIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Tooltip>
                      </>
                      ) : (
                        <>
                          <Tooltip title="EDIT DATA">
                            <IconButton 
                              size="small"
                              onClick={() => onEditTask(task)} 
                              sx={{ 
                                color: '#3b82f6', 
                                '&:hover': { 
                                  bgcolor: 'rgba(59, 130, 246, 0.1)',
                                  transform: 'scale(1.2)'
                                } 
                              }}
                            >
                              <EditIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="CYCLE PHASE">
                            <IconButton 
                              size="small"
                              onClick={() => onUpdateStatus(task)}
                              sx={{ 
                                color: '#6366f1', 
                                '&:hover': { 
                                  bgcolor: 'rgba(99, 102, 241, 0.1)',
                                  '& .MuiSvgIcon-root': {
                                    animation: 'pulse 1s infinite'
                                  }
                                } 
                              }}
                            >
                              <SyncIcon sx={{ fontSize: 18, transition: 'transform 0.5s ease' }} />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {task.status !== 'Done' && (
                        <Tooltip title="DELETE DATA">
                          <IconButton 
                            size="small"
                            onClick={() => onDeleteTask(task.id)} 
                            sx={{ 
                              color: '#ef4444', 
                              '&:hover': { 
                                bgcolor: 'rgba(239, 68, 68, 0.1)',
                                transform: 'scale(1.2)'
                              } 
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Tooltip>
                      )}
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
