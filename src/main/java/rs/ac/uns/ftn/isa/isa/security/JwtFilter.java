package rs.ac.uns.ftn.isa.isa.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final String AUTHORIZATION = "Authorization";
    private final String BEARER = "Bearer ";


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            final Optional<String> jwtTokenOptional = extractToken(request);
            if (jwtTokenOptional.isPresent()) {
                final Authentication authentication = JwtUtils.getAuthentication(jwtTokenOptional.get());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch ( ExpiredJwtException e) {
            returnUnauthorizedResponse(response, "Access token is expired!");
        }
    }

    private Optional<String> extractToken(HttpServletRequest request) {
        final String bearerToken = request.getHeader(AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER)) {
            final String jwtToken = bearerToken.substring(BEARER.length());
            return Optional.of(jwtToken);
        }
        return Optional.empty();
    }

    private void returnUnauthorizedResponse(HttpServletResponse httpServletResponse, String message) throws IOException {
        httpServletResponse.addHeader("Access-Control-Allow-Origin", "*");
        httpServletResponse.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

        httpServletResponse.setContentType("application/json");
        httpServletResponse.setCharacterEncoding("UTF-8");

        httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, message);
    }
}
