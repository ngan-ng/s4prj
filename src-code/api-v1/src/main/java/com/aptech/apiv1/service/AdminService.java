package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.AdminDto;
import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.model.admin.User;

import java.util.List;

public interface AdminService {

    AdminDto signup(AdminDto user) throws Exception;
    AdminDto login(LoginRequest loginRequest);
    AdminDto findAdminByEmail(String email);
    List<User> getAllAdmin();
}
