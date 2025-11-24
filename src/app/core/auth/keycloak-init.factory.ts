//arrancar key antes de Angular

import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return async () => {
        try {
            await keycloak.init({
                config: {
                    url: 'http://localhost:8080',
                    realm: 'materiapp',
                    clientId: 'materiapp-web'
                },
                initOptions: {
                    // Use 'check-sso' so the app does NOT force a login at startup.
                    // This allows the public `AppHome` to render without redirecting to Keycloak.
                    onLoad: 'check-sso',
                    checkLoginIframe: true,
                    pkceMethod: 'S256',
                    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html' //ruta fija para el silent check sso
                },
                enableBearerInterceptor: false
            });
            console.log('Keycloak initialized');
        } catch (error) {
            console.error('Keycloak initialization failed', error);
        }
    };
}