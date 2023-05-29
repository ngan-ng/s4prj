package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.user.UserRole;
import com.aptech.apiv1.model.user.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByRole(UserRole role);
}
