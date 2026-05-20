package com.fitadapt.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component // Con esto Spring lo detecta automáticamente
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    // Inyección por constructor
    public JwtFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 1. Si no viene el token en el Header, dejamos pasar la petición al siguiente filtro
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extraemos el token quitando el prefijo "Bearer " (7 caracteres)
        jwt = authHeader.substring(7);

        try {
            username = jwtService.extractUsername(jwt);
            String role = jwtService.extractRole(jwt); // Sacamos el rol del token

            // 3. Si hay usuario y no está ya autenticado en el contexto de Spring
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Spring Security exige el formato "ROLE_NOMBRE" para usar .hasRole()
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                // Creamos la autenticación en memoria provisional
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(authority)
                );

                // Seteamos la autenticación en el contexto global de la petición
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception e) {
            // Si el token expiró o fue manipulado, no autentica y el SecurityConfig lo rebotará
        }

        // Continuar con el flujo
        filterChain.doFilter(request, response);
    }
}
