package com.speech_to_text.application;
// package com.speech_to_text;

// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.OncePerRequestFilter;
// import com.speech_to_text.application.JwtService;
// import com.speech_to_text.domain.model.JwtAuthenticationToken;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// public class JwtFilter extends OncePerRequestFilter {

//     private final JwtService jwtService;

//     public JwtFilter(JwtService jwtService) {
//         this.jwtService = jwtService;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws java.io.IOException, ServletException {

//         String header = request.getHeader("Authorization");
//         if (header != null && header.startsWith("Bearer ")) {
//             String token = header.substring(7);
//             if (jwtService.validateToken(token)) {
//                 SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(jwtService.getId(token)));
//             }
//         }
//         filterChain.doFilter(request, response);
//     }
// }
