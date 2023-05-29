package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.UserDto;
import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.model.user.User;

import java.util.List;

public interface UserService {

    UserDto signup(UserDto user) throws Exception;
    UserDto login(LoginRequest loginRequest);
    UserDto findUserByEmail(String email);
    List<User> getAllUsers();
}
