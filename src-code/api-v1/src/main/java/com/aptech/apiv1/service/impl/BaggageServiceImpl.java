package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.model.Baggage;
import com.aptech.apiv1.repository.BaggageRepository;
import com.aptech.apiv1.service.BaggageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaggageServiceImpl implements BaggageService {
    final BaggageRepository baggageRepository;
    @Autowired
    public BaggageServiceImpl(BaggageRepository baggageRepository) {
        this.baggageRepository = baggageRepository;
    }

    @Override
    public Baggage addBaggage(Baggage baggage) {
        return baggageRepository.save(baggage);
    }
}
