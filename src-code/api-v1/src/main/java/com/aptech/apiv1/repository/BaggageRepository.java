package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Baggage;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface BaggageRepository extends JpaRepositoryImplementation<Baggage, Long> { }
