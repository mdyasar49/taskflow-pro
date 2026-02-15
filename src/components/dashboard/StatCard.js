import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';

const StatCard = ({ title, value, icon, color }) => (
  <Card 
    elevation={0} 
    sx={{ 
      height: '100%', 
      borderRadius: 4,
      background: `linear-gradient(135deg, ${color}08 0%, ${color}15 100%)`,
      border: `1px solid ${color}20`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 12px 20px -10px ${color}40`,
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography color="textSecondary" variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.2, opacity: 0.8 }}>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, color: color }}>
            {value}
          </Typography>
        </Box>
        <Avatar 
          sx={{ 
            bgcolor: color, 
            width: 40, 
            height: 40,
            ml: 2,
            boxShadow: `0 8px 16px -4px ${color}60`
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: 28, color: 'white' } })}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
