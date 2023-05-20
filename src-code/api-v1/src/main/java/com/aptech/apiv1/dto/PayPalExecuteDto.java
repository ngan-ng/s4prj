package com.aptech.apiv1.dto;

import lombok.Data;

@Data
public class PayPalExecuteDto {
    private String paymentId;
    private String payerId;
}
