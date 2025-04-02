import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import {PageLanding} from "./PageLanding";
import {PageDownload} from "./PageDownload";
import {Alert, Box, createTheme, CssBaseline, Link, Theme} from "@mui/material";
import {createStyles, makeStyles, ThemeProvider} from '@mui/styles';
import {PageDocs} from "./PageDocs";

const theme = createTheme({
    palette: {primary: {main: '#939363'}}
});

const useStyles = makeStyles((theme: Theme) => createStyles({
    link: {
        color: 'inherit',
        textDecoration: 'none!important',
        borderBottom: '1px dashed #d0d0d0',
        '&:hover': {
            borderBottomStyle: 'solid',
            borderColor: 'black',
        },
    },
}));
export default () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline/>
                <ScrollToTop/>
                <Box display="flex" flexDirection='column' alignItems="center" minHeight='100vh'>
                    <Header/>
                    <Box flexGrow={1} padding={5}>
                        <Routes>
                            <Route index element={<PageLanding/>}/>
                            <Route path='/download' element={<PageDownload/>}/>
                            <Route path='/docs' element={<PageDocs/>}/>
                            <Route path="*" element={
                                <Box display='flex' justifyContent='center' alignItems='center' minHeight='30vh'>
                                    <Alert variant="outlined" severity="error">Page not found</Alert>
                                </Box>
                            }/>
                        </Routes>
                    </Box>
                    <Footer/>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

const Footer = () => {
    const classes = useStyles();
    return (
        <Box display='flex' justifyContent='center' margin={1}>
            <small>© <a href='https://smotana.com' className={classes.link}>Smotana</a>. All rights reserved.</small>
        </Box>
    );
};

const Header = () => {
    const classes = useStyles();
    return (
        <Box>
            <Box display='flex' justifyContent='center' alignItems='center' gap={5} maxWidth='lg'
                 margin={3} marginBottom={5}>
                <a href='/'>
                    <img src='/img/ollisten-logo.png' alt="logo" height='50px' width='50px'/>
                </a>
                <a className={classes.link} href='/download'>Download</a>
                <a className={classes.link} href='/docs'>Docs</a>
                <a className={classes.link} href='https://github.com/ollisten/ollisten'>Source</a>
            </Box>
        </Box>
    );
};

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
