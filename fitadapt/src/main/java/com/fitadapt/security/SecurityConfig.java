package com.fitadapt.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    /*@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Deshabilitado por ser API Stateless
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. Rutas Públicas (Autenticación y Registro)
                        .requestMatchers("/api/auth/**").permitAll()

                        // 2. Rutas del Administrador (Gestión del catálogo maestro de ejercicios)
                        .requestMatchers("/api/admin/**").hasRole(AppRole.ADMINISTRADOR.name())
                        .requestMatchers(HttpMethod.POST, "/api/ejercicios/**").hasRole(AppRole.ADMINISTRADOR.name())

                        // 3. Rutas del Profesional (Camino Guiado: Creación de PLANES)
                        .requestMatchers("/api/planes/**").hasRole(AppRole.PROFESIONAL.name())

                        // 4. Rutas del Usuario (Camino Automático e Historial/Gamificación)
                        .requestMatchers("/api/rutinas/automatica/**").hasRole(AppRole.USUARIO.name())
                        .requestMatchers("/api/historial/**").hasRole(AppRole.USUARIO.name())

                        // Cualquier otra petición requiere estar autenticado
                        .anyRequest().authenticated()
                )
                // Añadimos nuestro filtro JWT antes del filtro de autenticación nativo
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}