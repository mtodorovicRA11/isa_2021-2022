package rs.ac.uns.ftn.isa.isa.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import rs.ac.uns.ftn.isa.isa.model.User;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtils {

    private static final int TOKEN_VALID_FOR_DAYS = 365;
    private static final String SECRET_KEY = "ISA2021BOATCOTTAGE1234567890";
    private static final String AUTHORITIES_KEY = "auth";

    public static String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim(AUTHORITIES_KEY, user.getRole())
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setExpiration(Date.from(ZonedDateTime.now(ZoneId.of("UTC")).plusDays(TOKEN_VALID_FOR_DAYS).toInstant()))
                .compact();
    }

    public static Authentication getAuthentication(String token) {
        final Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        final UUID userId = UUID.fromString(claims.getSubject());
        final String role = claims.get(AUTHORITIES_KEY).toString();

        return new PreAuthenticatedAuthenticationToken(userId, null, Collections.singletonList(new SimpleGrantedAuthority(role)));
    }

}
