package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.AdminDto;
import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.model.admin.Admin;

import java.util.List;

public interface AdminService {

    AdminDto signup(AdminDto user);
    AdminDto login(LoginRequest loginRequest);
    AdminDto findAdminByEmail(String email);
    List<Admin> getAllAdmin();
}
