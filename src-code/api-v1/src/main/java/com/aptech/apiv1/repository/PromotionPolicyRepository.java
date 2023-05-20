package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.PromotionsPolicy;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.time.LocalDateTime;
import java.util.List;

public interface PromotionPolicyRepository extends JpaRepositoryImplementation<PromotionsPolicy, Long> {

    List<PromotionsPolicy> findAllByDateEndAfter(LocalDateTime now);
}
