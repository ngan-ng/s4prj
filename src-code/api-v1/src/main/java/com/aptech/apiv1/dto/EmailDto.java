package com.aptech.apiv1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class EmailDto implements Serializable {
    private String firstName;
    private String lastName;
    private String pnr;
    private String email;
    private String payerEmail;
    private String paymentMethod;
}
