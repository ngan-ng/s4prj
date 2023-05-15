package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.admin.AdminRole;
import com.aptech.apiv1.model.admin.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByRole(AdminRole role);
}
