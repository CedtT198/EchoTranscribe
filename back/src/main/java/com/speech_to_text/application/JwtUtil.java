package com.speech_to_text.application;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import com.speech_to_text.domain.model.User;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long ACCESS_TOKEN_VALIDITY = 15 * 60 * 1000; // 15min
    private final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000; // 7j

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(user.getId()) 
                .claim("nom", user.getName())
                .claim("prenom", user.getFirst_name())
                .claim("mail", user.getMail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
                .signWith(secretKey)
                .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts.builder()
                .setSubject(user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY))
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getId(String token) {
        return getClaims(token).getSubject();
    }

    public String getNom(String token) {
        return getClaims(token).get("nom", String.class);
    }

    public String getPrenom(String token) {
        return getClaims(token).get("prenom", String.class);
    }

    public String getMail(String token) {
        return getClaims(token).get("mail", String.class);
    }

    public String getRole(String token) {
        return getClaims(token).get("role", String.class);
    }
}
