package com.aptech.apiv1.dto.paypal;

import com.paypal.api.payments.Amount;
import com.paypal.api.payments.PayerInfo;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
public class ReviewPaypalResponseDto {

    String paymentMethod;
    String status;
    String payerEmail;
    String payerFullName;
    Amount amount;
    List<SinglePaypalReviewDto> reviewDtos;
}
