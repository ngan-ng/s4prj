package com.aptech.apiv1.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
//        String header = req.getHeader(HEADER_STRING);
//        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
//            chain.doFilter(req, res);
//            return;
//        }
//        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        chain.doFilter(req, res);
//    }
//
//    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
//        String token = request.getHeader(HEADER_STRING);
//        if (token != null) {
//            Claims claims = Jwts.parser()
//                    .setSigningKey(SECRET)
//                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
//                    .getBody();
//
//            String user = claims.getSubject();
//
//            @SuppressWarnings("unchecked")
//            ArrayList<String> roles = (ArrayList<String>) claims.get("roles");
//
//            ArrayList<GrantedAuthority> list = new ArrayList<>();
//            if (roles != null) {
//                for (String a : roles) {
//                    GrantedAuthority g = new SimpleGrantedAuthority(a);
//                    list.add(g);
//                }
//            }
//            if (user != null) {
//                return new UsernamePasswordAuthenticationToken(user, null, list);
//            }
//        }
//        return null;
//    }

}
