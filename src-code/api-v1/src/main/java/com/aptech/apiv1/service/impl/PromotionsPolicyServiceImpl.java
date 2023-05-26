package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.enums.PromotionType;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.model.PromotionsPolicy;
import com.aptech.apiv1.model.admin.User;
import com.aptech.apiv1.repository.PromotionPolicyRepository;
import com.aptech.apiv1.service.PromotionsPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PromotionsPolicyServiceImpl implements PromotionsPolicyService {
    private final PromotionPolicyRepository promoteRepository;
    @Autowired
    public PromotionsPolicyServiceImpl(PromotionPolicyRepository promoteRepository) {
        this.promoteRepository = promoteRepository;
    }

    @Override
    public PromotionsPolicy createPromotion(PromotionsPolicy promotionsPolicy) {
        return promoteRepository.save(promotionsPolicy);
    }
    public double getDiscountRate(Booking booking){
        List<PromotionsPolicy> promotions = promoteRepository.findAllByDateEndAfter(LocalDateTime.now());
        if(promotions == null){
            return 0;
        }
        double rate = 0;
        for (PromotionsPolicy p : promotions){
            switch (PromotionType.valueOf(p.getPromotionType())){
                case POINTS -> {
                    User member = booking.getMember();
                    if(member != null){
                        long currentPoints = member.getPoints();
                        if(currentPoints >= p.getPointCondition()){
                            rate = rate + p.getApplyRate();
                        }
                    }
                }
            }
        }
        return rate;
    }
}
