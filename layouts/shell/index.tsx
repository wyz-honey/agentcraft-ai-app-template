import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';


type MainProps = {
    children: any
}
function hasNoNavbar(pathname: string) {
    const noNavbarPaths = ['/login', '/register', '/config'];
    for (let i = 0; i < noNavbarPaths.length; i++) {
        if (pathname.indexOf(noNavbarPaths[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function Shell(props: any) {


    useEffect(() => {
    
    }, []);

    return <AppShell
        padding="md"
        navbar={<div />}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], paddingLeft: 0, overflow: 'hidden' },
        })}
    >
        <div style={{padding: 20}}>
            {props.children}
        </div>
    </AppShell>
}

export function Main(props: MainProps) {
    const router = useRouter();
    const { pathname } = router;
    const hiddenNavBar = hasNoNavbar(pathname);
    const { children } = props;
    return <>
        {
            hiddenNavBar ? <>{children}</> : <Shell {...props} />
        }
    </>
}