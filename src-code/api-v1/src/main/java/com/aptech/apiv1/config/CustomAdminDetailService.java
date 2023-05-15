package com.aptech.apiv1.config;

import com.aptech.apiv1.dto.AdminDto;
import com.aptech.apiv1.dto.RoleDto;
import com.aptech.apiv1.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomAdminDetailService implements UserDetailsService {
    @Autowired
    private AdminService adminService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AdminDto adminDto = adminService.findAdminByEmail(email);
        if (adminDto != null) {
            List<GrantedAuthority> authorities = getAdminAuthority(adminDto.getRoles());
            return buildAdminForAuthentication(adminDto, authorities);
        } else {
            throw new UsernameNotFoundException("user with email " + email + " does not exist.");
        }
    }
    private List<GrantedAuthority> getAdminAuthority(Collection<RoleDto> adminRoles) {
        Set<GrantedAuthority> roles = new HashSet<>();
        adminRoles.forEach((role) -> {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        });
        return new ArrayList<GrantedAuthority>(roles);
    }

    private UserDetails buildAdminForAuthentication(AdminDto admin, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(admin.getEmail(), admin.getPassword(), authorities);
    }

}
