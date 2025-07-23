package com.example.androidapp.data.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Date;

public class JwtDecoder {

    /**
     * Extracts the "id" claim from a JWT token.
     * @param token The JWT string.
     * @return The user ID string, or null if the token is invalid or missing the claim.
     */
    public String getUserId(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
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
            return decodedJWT.getClaim("username").asString();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Checks if a JWT token is expired.
     * @param token The JWT string.
     * @return true if the token is expired, false otherwise.
     */
    public boolean isTokenExpired(String token) {
        if (token == null) {
            return true; // No token is considered "expired" for our purposes
        }
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            // Get the expiration date from the token's payload
            Date expiresAt = decodedJWT.getExpiresAt();
            // If there's no expiration date, treat it as not expired (or handle as an error)
            if (expiresAt == null) {
                return false;
            }
            // Compare the expiration date with the current time
            return expiresAt.before(new Date());
        } catch (Exception e) {
            // If the token is malformed, treat it as expired.
            return true;
        }
    }

}
