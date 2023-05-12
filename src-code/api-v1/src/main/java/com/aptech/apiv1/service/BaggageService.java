package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.AddBagDtos;
import com.aptech.apiv1.model.Baggage;

import java.util.List;

public interface BaggageService {
    Iterable<Baggage> addBaggage(AddBagDtos addBagDtos);
    List<Baggage> getBagsByBookingId(String id);
}
