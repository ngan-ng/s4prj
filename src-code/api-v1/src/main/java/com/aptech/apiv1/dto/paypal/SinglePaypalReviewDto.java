package com.aptech.apiv1.dto.paypal;

import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.model.Payment;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
public class SinglePaypalReviewDto {
    Booking booking;
    List<Payment> payments;
}
