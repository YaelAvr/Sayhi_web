package com.example.androidapp.data.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
public class JwtDecoder {

    /**
     * Extracts the "id" claim from a JWT token.
     * @param token The JWT string.
     * @return The user ID string, or null if the token is invalid or missing the claim.
     */
    public String getUserId(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            // "id" must match the key you used on your server
            return decodedJWT.getClaim("id").asString();
        } catch (Exception e) {
            // This will happen if the token is malformed
            return null;
        }
    }

    /**
     * Extracts the "username" claim from a JWT token.
     * @param token The JWT string.
     * @return The username string, or null if the token is invalid or missing the claim.
     */
    public String getUsername(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            // "username" must match the key you used on your server
            return decodedJWT.getClaim("username").asString();
        } catch (Exception e) {
            return null;
        }
    }
}
