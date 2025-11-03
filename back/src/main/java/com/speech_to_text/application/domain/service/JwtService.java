package com.speech_to_text.application.domain.service;
// package com.speech_to_text.application;

// import io.jsonwebtoken.*;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;
// import com.speech_to_text.domain.model.User;
// import java.security.Key;
// import java.util.Date;

// @Component
// public class JwtService {

//     @Value("${jwt.secret}")
//     private Key secretKey;
//     private final long ACCESS_TOKEN_VALIDITY = 15 * 60 * 1000; // 15min
//     private final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000; // 7j

//     public String generateAccessToken(User user) {
//         return Jwts.builder()
//                 .setSubject(user.getId()) 
//                 .claim("name", user.getName())
//                 .claim("first_name", user.getFirst_name())
//                 .claim("mail", user.getMail())
//                 .claim("role", user.getRole())
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
//                 .signWith(secretKey)
//                 .compact();
//     }

//     public String generateRefreshToken(User user) {
//         return Jwts.builder()
//                 .setSubject(user.getId())
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY))
//                 .signWith(secretKey)
//                 .compact();
//     }

//     public boolean validateToken(String token) {
//         try {
//             Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
//             return true;
//         } catch (JwtException e) {
//             return false;
//         }
//     }

//     public Claims getClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(secretKey)
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     public String getId(String token) {
//         return getClaims(token).getSubject();
//     }

//     public String getName(String token) {
//         return getClaims(token).get("name", String.class);
//     }

//     public String getFirstName(String token) {
//         return getClaims(token).get("first_name", String.class);
//     }

//     public String getMail(String token) {
//         return getClaims(token).get("mail", String.class);
//     }

//     public String getRole(String token) {
//         return getClaims(token).get("role", String.class);
//     }
// }
