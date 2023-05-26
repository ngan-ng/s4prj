package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.admin.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AdminRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
