package com.speech_to_text.config;
// package com.speech_to_text;

// import org.springframework.context.annotation.Bean;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import com.speech_to_text.application.JwtService;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// public class SecurityConfig {

//     private final JwtService jwtUtil;

//     public SecurityConfig(JwtService jwtUtil) {
//         this.jwtUtil = jwtUtil;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/sign/**").permitAll()
//                 .anyRequest().authenticated()
//             )
//             .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }
// }
