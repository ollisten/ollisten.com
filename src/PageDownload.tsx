import React, {ReactNode} from "react";
import {Alert, Box, Button, Tooltip, Typography} from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import LinuxIcon from "./icons/LinuxIcon";
import WindowsIcon from "./icons/WindowsIcon";
import DownloadIcon from '@mui/icons-material/Download';

type Platform = 'win' | 'macos' | 'linux';
const PlatformAssets: {
    [platform: string]: {
        installer: {
            filename: string;
            size: string;
        }
        uninstaller?: {
            filename: string;
            size: string;
        }
    }
} = {
    // win: {
    //     installer: {
    //         filename: 'ollisten.exe',
    //         size: 'XX.XMB'
    //     },
    // },
    macos: {
        installer: {
            filename: 'ollisten.dmg',
            size: 'XX.XMB'
        },
        uninstaller: {
            filename: 'ollisten-uninstaller.dmg',
            size: 'XX.XMB'
        }
    },
    // linux: {
    //     installer: {
    //         filename: 'ollisten.deb',
    //         size: 'XX.XMB'
    //     }
    // },
};

export const PageDownload = () => {
    const [platform, setPlatform] = React.useState<Platform>(Object.keys(PlatformAssets)[0] as Platform);
    const assets = PlatformAssets[platform];
    return (
        <>
            <Alert severity='warning'>
                <b>Alpha release</b>
                <div>May contain software defects</div>
            </Alert>
            <Box display="flex" gap={3} alignItems='flex-start' margin={3}>
                <DownloadLink platform='win' onSelect={setPlatform} selected={platform}/>
                <DownloadLink platform='macos' onSelect={setPlatform} selected={platform}/>
                <DownloadLink platform='linux' onSelect={setPlatform} selected={platform}/>
            </Box>
            <Box display='flex' flexDirection='column'>
                <Box display="flex" flexDirection='column' alignItems='center' justifyContent='center'
                     gap={0.5}
                     margin={3}>
                    <Button variant='contained' size='large' startIcon={<DownloadIcon/>}
                            href={`/download/${assets.installer.filename}`}>
                        Download Installer
                    </Button>
                    <Typography variant='caption'>{assets.installer.filename} ({assets.installer.size})</Typography>
                </Box>
                {assets.uninstaller && (
                    <Box display="flex" flexDirection='column' alignItems='center' justifyContent='center'
                         gap={0.5}
                         margin={3}>
                        <Button variant='text' size='small' startIcon={<DownloadIcon/>}
                                href={`/download/${assets.uninstaller.filename}`}>
                            Download Uninstaller
                        </Button>
                        <Typography
                            variant='caption'>{assets.uninstaller.filename} ({assets.uninstaller.size})</Typography>
                    </Box>
                )}
            </Box>
        </>
    );
};

const DownloadLink = (props: {
    platform: Platform;
    selected: Platform;
    onSelect: (platform: Platform) => void;
}) => {
    const comingSoon = !PlatformAssets[props.platform];
    const selected = props.platform === props.selected;
    let label: string;
    let icon: ReactNode;
    switch (props.platform) {
        case 'linux':
            label = 'Linux';
            icon = <LinuxIcon/>;
            break;
        case 'macos':
            label = 'macOS';
            icon = <AppleIcon/>;
            break;
        case 'win':
            label = 'Windows';
            icon = <WindowsIcon/>;
            break;
        default:
            return null;
    }
    let button = (
        <Button onClick={() => props.onSelect(props.platform)} disabled={comingSoon}
                color={selected ? 'primary' : 'inherit'}
                variant='text' sx={{textTransform: 'none'}}>
            <Box display='flex' flexDirection='column' alignItems='center' gap={1} margin={2} minWidth={40}>
                {icon}
                {label}
            </Box>
        </Button>
    );
    if (comingSoon) {
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
