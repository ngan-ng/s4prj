package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.AdminDto;
import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.dto.RoleDto;
import com.aptech.apiv1.model.admin.User;
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
    public AdminDto signup(AdminDto adminDto) throws Exception {
        Optional<User> admin = adminRepository.findByEmail(adminDto.getEmail());
        if (admin.isEmpty()) {

            List<Role> roles = new ArrayList<>();
            AdminRole adminRole = AdminRole.valueOf(adminDto.getRoles().get(0).getRole());
            Role role = roleRepository.findByRole(adminRole);
            roles.add(role);
            User newUser = new User()
                    .setEmail(adminDto.getEmail())
                    .setPassword(passwordEncoder.encode(adminDto.getPassword()))
                    .setRoles(roles);

            adminRepository.save(newUser);
            adminDto.setPassword("");
        }else{
            throw new Exception("Account existed!");
        }
        return adminDto;
    }

    @Override
    public AdminDto findAdminByEmail(String email) {
        Optional<User> admin = Optional.ofNullable(adminRepository.findByEmail(email).get());
        if (admin.isPresent()) {
            return modelMapper.map((admin.get()), AdminDto.class);
        }
        return null;
    }

    @Override
    public AdminDto login(LoginRequest loginRequest) {
        User user = adminRepository.findByEmail(loginRequest.getUsername()).get();
        AdminDto adminDto = new AdminDto();
        if(user != null){
            Boolean checkPass = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
            if(checkPass) {
                List<RoleDto> roles = new ArrayList<>();
                user.getRoles().forEach(role -> {
                    RoleDto roleDto = new RoleDto().setRole(role.getRole().toString());
                    roles.add(roleDto);
                });
                adminDto.setEmail(user.getEmail())
                        .setRoles(roles);

                return adminDto;
            }
        }
        return adminDto;
    }

    @Override
    public List<User> getAllAdmin() {
        return (List<User>) adminRepository.findAll();
    }
}
