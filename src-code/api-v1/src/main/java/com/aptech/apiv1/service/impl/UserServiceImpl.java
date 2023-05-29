package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.UserDto;
import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.dto.RoleDto;
import com.aptech.apiv1.model.user.User;
import com.aptech.apiv1.model.user.UserRole;
import com.aptech.apiv1.model.user.Role;
import com.aptech.apiv1.repository.UserRepository;
import com.aptech.apiv1.repository.RoleRepository;
import com.aptech.apiv1.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDto signup(UserDto userDto) throws Exception {
        Optional<User> admin = userRepository.findByEmail(userDto.getEmail());
        if (admin.isEmpty()) {

            List<Role> roles = new ArrayList<>();
            UserRole userRole = UserRole.valueOf(userDto.getRoles().get(0).getRole());
            Role role = roleRepository.findByRole(userRole);
            roles.add(role);
            User newUser = new User()
                    .setEmail(userDto.getEmail())
                    .setPassword(passwordEncoder.encode(userDto.getPassword()))
                    .setRoles(roles);

            userRepository.save(newUser);
            userDto.setPassword("");
        }else{
            throw new Exception("Account existed!");
        }
        return userDto;
    }

    @Override
    public UserDto findUserByEmail(String email) {
        Optional<User> admin = Optional.ofNullable(userRepository.findByEmail(email).get());
        if (admin.isPresent()) {
            return modelMapper.map((admin.get()), UserDto.class);
        }
        return null;
    }

    @Override
    public UserDto login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getUsername()).get();
        UserDto userDto = new UserDto();
        if(user != null){
            Boolean checkPass = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
            if(checkPass) {
                List<RoleDto> roles = new ArrayList<>();
                user.getRoles().forEach(role -> {
                    RoleDto roleDto = new RoleDto().setRole(role.getRole().toString());
                    roles.add(roleDto);
                });
                userDto.setEmail(user.getEmail())
                        .setRoles(roles);

                return userDto;
            }
        }
        return userDto;
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }
}
