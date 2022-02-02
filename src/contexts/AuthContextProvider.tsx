import { HubPayload } from '@aws-amplify/core';
import { Auth, Hub } from 'aws-amplify';

import { useEffect, useState } from 'react';

export default function useAuth() {
    const [user, setUser] = useState<any>();
    const [accessToken, setAccessToken] = useState<string>();
    const [showSignUp, setShowSignUp] = useState(false);

    const handleAuth = (payload: HubPayload) => {
        switch (payload.event) {
            case 'signIn':
                setShowSignUp(false);
                return setUser(payload.data);
            case 'signOut':
                return setUser;
        }
    };

    const signIn = () => {
        setShowSignUp(true);
    };

    const signOut = () => {
        Auth.signOut();
        setUser(null);
    };

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                setUser(user);
            })
            .catch(console.error);

        Auth.currentSession().then(session => {
            const token = session.getAccessToken().getJwtToken();
            setAccessToken(token);
        })

        Hub.listen('auth', (data) => {
            handleAuth(data.payload);
        });

        return () => Hub.remove('auth', (data) => {
            const { payload } = data;
            handleAuth(payload); 
        });
    }, []);

    return {
        Auth,
        user,
        accessToken,
        showSignUp,
        signIn,
        signOut
    }
}