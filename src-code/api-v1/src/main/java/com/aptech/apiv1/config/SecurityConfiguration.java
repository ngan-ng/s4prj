package com.aptech.apiv1.config;

import com.azure.spring.cloud.autoconfigure.implementation.aad.security.AadJwtGrantedAuthoritiesConverter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration(proxyBeanMethods = false)
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
    public static final String[] ENDPOINTS_WHITELIST = {

            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/api-v1/user/login",
            "/api-v1/user/signup",
            "/api-v1/user/refreshtoken",
            "/api-v1/guest/**",
            "/write/allow"
            //"/**"
    };
//    public final AadB2cOidcLoginConfigurer configurer;
//
//
//    public SecurityConfiguration(AadB2cOidcLoginConfigurer configurer) {
//        this.configurer = configurer;
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setJwtGrantedAuthoritiesConverter(new AadJwtGrantedAuthoritiesConverter());
        http
                // by default uses a Bean by the name of corsConfigurationSource
                .cors(withDefaults()).csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> {
                    try {
                        authorize
                                .requestMatchers(ENDPOINTS_WHITELIST).permitAll()
                                .anyRequest().authenticated().and().exceptionHandling(handling -> handling
                                .authenticationEntryPoint(
                                        (req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED)))
                                .oauth2ResourceServer()
                                .jwt()
                                .jwtAuthenticationConverter(authenticationConverter);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }).sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

