package com.aptech.apiv1.dto;

import com.aptech.apiv1.enums.Gender;
import com.aptech.apiv1.model.Flight;
import com.aptech.apiv1.model.Infant;
import com.aptech.apiv1.model.Member;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BookingPaymentDto {
    private LoadSeatDto loadSeatDto;
    private long id;
    private String pnr;
    private Flight flight;
    private String dob;
    private String status = "CONFIRMED";
    private int seq = 0;
    private String title = "Mr.";
    @NotBlank(message = "Firstname is required")
    private String firstName;
    @NotBlank(message = "Lastname is required")
    private String lastName;
    private Infant infant;
    private String gender = Gender.ADL.toString();
    private int bagAllowance = 0;
    private String mobile;
    @Email(message = "Invalid email format")
    private String email;
    private Member member;
}
