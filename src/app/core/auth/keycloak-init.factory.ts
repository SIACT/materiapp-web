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
                    onLoad: 'login-required',
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