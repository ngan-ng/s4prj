package com.aptech.apiv1.dto;

import java.io.Serializable;
import java.util.List;


import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@ToString
public class AdminDto implements Serializable {
    @Email
    private String email;
    private String password;
    private List<RoleDto> roles;
}
