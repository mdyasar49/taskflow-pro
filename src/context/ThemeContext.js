import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }) => {
  // Check local storage or default to 'light' as requested
  const [mode, setMode] = useState(() => {
     const savedMode = localStorage.getItem('themeMode');
     return savedMode || 'light'; 
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#6366f1', // Indigo
          },
          secondary: {
            main: '#a855f7', // Purple
          },
          ...(mode === 'light'
            ? {
                // Light mode palette
                background: {
                  default: '#f1f5f9', // Slate 100
                  paper: '#ffffff',
                  subtle: '#e2e8f0'
                },
                text: {
                  primary: '#0f172a', // Slate 900
                  secondary: '#64748b', // Slate 500
                  inverse: '#ffffff'
                },
                action: {
                    hover: 'rgba(99, 102, 241, 0.08)',
                    selected: 'rgba(99, 102, 241, 0.12)'
                }
              }
            : {
                // Dark mode palette
                background: {
                  default: '#020617', // Slate 950
                  paper: '#0f172a', // Slate 900
                  subtle: '#1e293b'
                },
                text: {
                  primary: '#f8fafc', // Slate 50
                  secondary: '#94a3b8', // Slate 400
                  inverse: '#0f172a'
                },
                action: {
                    hover: 'rgba(99, 102, 241, 0.1)',
                    selected: 'rgba(99, 102, 241, 0.15)'
                }
              }),
        },
        typography: {
           fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
           h4: { fontWeight: 900 },
           h6: { fontWeight: 800 },
           subtitle2: { fontWeight: 700 }
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'none',
                        fontWeight: 700
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.5)' : '#ffffff',
                            '& fieldset': {
                                borderColor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : '#e2e8f0',
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary,
                        },
                        '& .MuiInputBase-input': {
                            color: theme.palette.text.primary,
                        }
                    })
                }
            }
        }
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
