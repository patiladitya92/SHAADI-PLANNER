package com.exam.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

/*to declare spring configuration class - to be able to add Spring beans (@Bean)
*/
@Configuration
@EnableWebSecurity // to enable spring security
@EnableMethodSecurity // enables the customization of spring sec support at the method level.
@AllArgsConstructor
public class SecurityConfiguration {
	private final PasswordEncoder passwordEncoder;
	private CustomJwtFilter customJwtFilter;

	/*
	 * Configure a bean to customize Spring security filter chain.
	 */
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// 1. disable CSRF protection
//		http.csrf(csrf -> csrf.disable());

http
  .cors(Customizer.withDefaults())
  .csrf(csrf -> csrf.disable());
		// 2. session creation policy - stateless (i.e Spring Security will NOT create
		// HttpSession)
		http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// 4. Specify URL based authorization rules
		http.authorizeHttpRequests(req -> req
		        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**",
		                "/api/auth/login", "/api/auth/register","/api/auth/forgot-password","/api/auth/reset-password")
		        .permitAll()
		        .requestMatchers("/api/admin/**").hasRole("ADMIN")
		        .requestMatchers("/api/vendors/**").hasRole("VENDOR")
		        .requestMatchers("/api/bookings/vendor/**").hasRole("VENDOR")
		        .requestMatchers("/api/bookings/me/**", "/api/payments/booking/**").hasRole("CUSTOMER")
		        .requestMatchers("/api/listings/**", "/api/categories/**").permitAll()
		        .requestMatchers("/error").permitAll()
		        .anyRequest().authenticated()
		);
		http.addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	/*
	 * Configure AuthenticationManager as spring bean
	 * 
	 */
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	

	

}
