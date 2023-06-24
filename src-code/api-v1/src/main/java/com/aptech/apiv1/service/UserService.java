package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.UserResponseDto;
import com.aptech.apiv1.model.user.User;

public interface UserService {
    UserResponseDto findByEmail(String email);
    User addAdmin(String email);
}
