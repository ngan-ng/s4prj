package com.aptech.apiv1.dto.paypal;

import lombok.Data;

@Data
public class PayPalExecuteDto {
    private String paymentId;
    private String payerId;
}
