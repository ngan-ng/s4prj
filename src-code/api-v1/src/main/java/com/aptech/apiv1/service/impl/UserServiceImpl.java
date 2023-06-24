package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.UserResponseDto;
import com.aptech.apiv1.model.user.Role;
import com.aptech.apiv1.model.user.User;
import com.aptech.apiv1.model.user.UserRole;
import com.aptech.apiv1.repository.RoleRepository;
import com.aptech.apiv1.repository.UserRepository;
import com.aptech.apiv1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserResponseDto findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        User member;
        if (user.isEmpty()) {
            Role userRole = roleRepository.findByRole(UserRole.MEMBER);
             member = new User().setEmail(email)
                    .setRoles(Arrays.asList(userRole))
                    .setLoyaltyPoints(0);
            userRepository.save(member);
        }else {
            member = user.get();
        }
        UserResponseDto response = new UserResponseDto();
        response.setEmail(member.getEmail());
        response.setLoyaltyPoint(member.getLoyaltyPoints());
        return response;
    }

    @Override
    public User addAdmin(String email) {
        Role userRole;
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            userRole = roleRepository.findByRole(UserRole.ADMIN);

            User admin = new User().setEmail(email)
                    .setRoles(Arrays.asList(userRole))
                    .setLoyaltyPoints(0);

            return userRepository.save(admin);
        }
        return null;
    }
}
