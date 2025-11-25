import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { switchMap, catchError } from 'rxjs/operators';
import { from } from 'rxjs';

// Interceptor que obtiene el token de Keycloak de forma asíncrona
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    // Log muy temprano para asegurar que el interceptor se ejecuta
    console.log('[Interceptor] 🔍 START - URL:', req.url, '| Method:', req.method, '| Full URL:', req.urlWithParams || req.url);
    
    // Solo interceptar peticiones a nuestra API
    const isApiRequest = req.url.includes('/api/');
    console.log('[Interceptor] 📍 Is API request?', isApiRequest, '| URL contains /api/:', req.url.includes('/api/'));
    
    if (!isApiRequest) {
        console.log('[Interceptor] ⏭️ Skipping non-API request:', req.url);
        return next(req);
    }

    console.log('[Interceptor] 🔑 Injecting KeycloakService...');
    const keycloakService = inject(KeycloakService);
    console.log('[Interceptor] ✅ KeycloakService injected successfully');
    
    try {
        // Verificar si el usuario está autenticado (isLoggedIn retorna boolean directamente)
        const isLoggedIn = keycloakService.isLoggedIn();
        
        console.log('[Interceptor] Request to:', req.url, '| isLoggedIn:', isLoggedIn);
        
        if (!isLoggedIn) {
            // Si no está logueado, hacer la petición sin token
            console.warn('[Interceptor] User not authenticated, making request without token to:', req.url);
            return next(req);
        }
        
        // Obtener el token (getToken retorna Promise<string> y actualiza el token si es necesario)
        return from(keycloakService.getToken()).pipe(
            switchMap(token => {
                console.log('[Interceptor] Token obtained, length:', token?.length || 0);
                
                if (!token || token.trim() === '') {
                    console.warn('[Interceptor] No token available, making request without token to:', req.url);
                    return next(req);
                }
                
                // Si hay token, agregarlo al header
                // Preservar todas las opciones originales de la petición
                const clonedReq = req.clone({ 
                    setHeaders: { 
                        Authorization: `Bearer ${token}` 
                    }
                });
                
                // Log detallado para debugging
                console.log('[Interceptor] ✅ Token added to request:', req.url);
                console.log('[Interceptor] Authorization header preview:', `Bearer ${token.substring(0, 20)}...`);
                console.log('[Interceptor] Full Authorization header exists:', clonedReq.headers.has('Authorization'));
                
                return next(clonedReq);
            }),
            catchError(error => {
                console.error('[Interceptor] ❌ Error getting token for', req.url, ':', error);
                // En caso de error, hacer la petición sin token
                return next(req);
            })
        );
    } catch (error) {
        console.error('[Interceptor] ❌ Error in token interceptor:', error);
        return next(req);
    }
};
