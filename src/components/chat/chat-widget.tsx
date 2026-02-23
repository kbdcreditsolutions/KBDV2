'use client';

import Script from 'next/script';
import { useCallback } from 'react';

export function ChatWidget() {
    const initBotpress = useCallback(() => {
        if (typeof window !== 'undefined') {
            type BotpressWindow = {
                botpress?: { init: (config: unknown) => void };
                botpressWebChat?: { init: (config: unknown) => void };
            };
            const win = window as unknown as BotpressWindow;

            // Check for both possible global objects depending on version
            const bp = win.botpress || win.botpressWebChat;

            if (bp) {
                console.log('Initializing Botpress with:', bp);
                bp.init({
                    "botId": "c4ba8391-19b1-400d-ad09-a90df25088af",
                    "configuration": {
                        "botName": "KBD Finance Assistant",
                        "botAvatar": "https://files.bpcontent.cloud/2026/02/19/07/20260219072116-79HGTIZW.png",
                        "website": {},
                        "email": {},
                        "phone": {},
                        "termsOfService": {},
                        "privacyPolicy": {},
                        "color": "#FCA311",
                        "themeMode": "dark",
                        "radius": 2
                    },
                    "clientId": "3047bcb9-46a5-434a-b9b6-baf67ae92745"
                });
            } else {
                console.error('Botpress global object not found after script load');
            }
        }
    }, []);

    return (
        <Script
            src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
            strategy="lazyOnload"
            onLoad={initBotpress}
        />
    );
}
