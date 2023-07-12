package com.aptech.apiv1.dto;

import com.aptech.apiv1.enums.Gender;
import com.aptech.apiv1.model.Flight;
import com.aptech.apiv1.model.Infant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BookingPaymentDto implements Serializable {
    private LoadSeatDto loadSeatDto;
    private long id; // Need
    private String pnr; // Need
    private Flight flight; // Need

    @NotBlank(message = "Firstname is required")
    private String firstName; // Need
    @NotBlank(message = "Lastname is required")
    private String lastName; // Need
    private Infant infant; // Need
    private String gender = Gender.ADL.toString();
    private int bagAllowance = 0; // Need
    @Email(message = "Invalid email format")
    private String email; // Need
}
