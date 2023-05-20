package com.aptech.apiv1.service;

import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.model.PromotionsPolicy;

public interface PromotionsPolicyService {
    PromotionsPolicy createPromotion(PromotionsPolicy promotionsPolicy);
    double getDiscountRate(Booking booking);
}
