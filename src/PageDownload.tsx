import React, {ReactNode} from "react";
import {Alert, Box, Button, Tooltip} from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import LinuxIcon from "./icons/LinuxIcon";
import WindowsIcon from "./icons/WindowsIcon";

export const PageDownload = () => {
    const [platform, setPlatform] = React.useState<'win' | 'macos' | 'linux'>('macos');
    const setSetPlatform = (p: typeof platform) => () => setPlatform(p);
    return (
        <>
            <Alert severity='error'>Coming soon...</Alert>
            <Box display="flex" gap={3} alignItems='flex-start' margin={3}>
                <DownloadLink label='Win' icon={<WindowsIcon/>} onClick={setSetPlatform('win')}
                              selected={'win' === platform} comingSoon/>
                <DownloadLink label='macOS' icon={<AppleIcon/>} onClick={setSetPlatform('macos')}
                              selected={'macos' === platform}/>
                <DownloadLink label='Linux' icon={<LinuxIcon/>} onClick={setSetPlatform('linux')}
                              selected={'linux' === platform} comingSoon/>
            </Box>
            <Box display="flex" justifyContent='center' margin={3}>
                <Button variant='contained' onClick={() => {

                }}>
                    Download
                </Button>
            </Box>
        </>
    );
};

const DownloadLink = (props: {
    label: string;
    icon: ReactNode;
    comingSoon?: boolean;
    selected: boolean;
    onClick: () => void;
}) => {
    let button = (
        <Button onClick={props.onClick} disabled={props.comingSoon} color={props.selected ? 'primary' : 'inherit'}
                variant='text' sx={{textTransform: 'none'}}>
            <Box display='flex' flexDirection='column' alignItems='center' gap={1} margin={2} minWidth={40}>
                {props.icon}
                {props.label}
            </Box>
        </Button>
    );
    if (props.comingSoon) {
        button = (
            <Tooltip title='Coming soon' placement='top'>
                <span>
                    {button}
                </span>
            </Tooltip>
        );
    }
    return button;
}
