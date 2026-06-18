//package com.saurabh.config;
//
//import java.io.IOException;
//import java.util.List;
//
//import javax.crypto.SecretKey;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//
//public class JwtTokenValidator extends OncePerRequestFilter {
//
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		String path = request.getRequestURI();
//		if (path.startsWith("/auth")) {
//	        filterChain.doFilter(request, response);
//	        return;
//	    }
//		String jwt = request.getHeader("Authorization");
//		if(jwt!=null) {
//			jwt=jwt.substring(7);
//			try {
//				SecretKey key = Keys.hmacShaKeyFor(JWT_CONSTANT.SECRET_KEY.getBytes());
//				Claims claims= Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
//				
//				String email = String.valueOf(claims.get("email"));
//				String authorities=String.valueOf(claims.get("authorities"));
//				
//				List<GrantedAuthority>auths=AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
//				
//				Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
//				SecurityContextHolder.getContext().setAuthentication(authentication);
//				
//
//				
//			} catch (Exception e) {
//				throw new BadCredentialsException("Invalid jwt Token"+e);
//			}
//		}
//		
//		filterChain.doFilter(request, response);
//		
//		
//	}
//
//	
//	
//
//}/


package com.saurabh.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        if (path.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String jwt = header.substring(7);

            try {
                SecretKey key = Keys.hmacShaKeyFor(JWT_CONSTANT.SECRET_KEY.getBytes());

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                String email = claims.get("email", String.class);
                String authorities = claims.get("authorities", String.class);

                List<GrantedAuthority> auths =
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(email, null, auths);

                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
            // ✅ EXPIRED TOKEN
            catch (ExpiredJwtException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("""
                    { "message": "JWT expired. Please login again." }
                """);
                return;
            }
            // ✅ INVALID TOKEN
            catch (JwtException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("""
                    { "message": "Invalid JWT token." }
                """);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}

