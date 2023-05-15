package com.aptech.apiv1.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
public class LoginRequest implements Serializable {
    private String username;
    private String password;
}
