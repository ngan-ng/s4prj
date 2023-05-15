package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.AdminDto;
import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.dto.RoleDto;
import com.aptech.apiv1.model.admin.Admin;
import com.aptech.apiv1.model.admin.AdminRole;
import com.aptech.apiv1.model.admin.Role;
import com.aptech.apiv1.repository.AdminRepository;
import com.aptech.apiv1.repository.RoleRepository;
import com.aptech.apiv1.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AdminDto signup(AdminDto adminDto) {
        Role adminRole = new Role();
        Optional<Admin> admin = adminRepository.findByEmail(adminDto.getEmail());
        if (admin.isEmpty()) {
            adminRole = roleRepository.findByRole(AdminRole.ADMIN);

            Admin newAdmin = new Admin()
                    .setEmail(adminDto.getEmail())
                    .setPassword(passwordEncoder.encode(adminDto.getPassword()))
                    .setRoles(Arrays.asList(adminRole));

            adminRepository.save(newAdmin);
            adminDto.setPassword("");
        }
        return adminDto;
    }

    @Override
    public AdminDto findAdminByEmail(String email) {
        Optional<Admin> admin = Optional.ofNullable(adminRepository.findByEmail(email).get());
        if (admin.isPresent()) {
            return modelMapper.map((admin.get()), AdminDto.class);
        }
        return null;
    }

    @Override
    public AdminDto login(LoginRequest loginRequest) {
        Admin admin = adminRepository.findByEmail(loginRequest.getUsername()).get();
        AdminDto adminDto = new AdminDto();
        if(admin != null){
            Boolean checkPass = passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword());
            if(checkPass) {
                List<RoleDto> roles = new ArrayList<>();
                admin.getRoles().forEach(role -> {
                    RoleDto roleDto = new RoleDto().setRole(role.getRole().toString());
                    roles.add(roleDto);
                });
                adminDto.setEmail(admin.getEmail())
                        .setRoles(roles);

                return adminDto;
            }
        }
        return adminDto;
    }

    @Override
    public List<Admin> getAllAdmin() {
        return (List<Admin>) adminRepository.findAll();
    }
}
