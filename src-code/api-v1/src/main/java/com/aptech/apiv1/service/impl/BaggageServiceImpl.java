package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.AddBagDtos;
import com.aptech.apiv1.enums.BagStatus;
import com.aptech.apiv1.enums.IataCode;
import com.aptech.apiv1.model.Baggage;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.repository.BaggageRepository;
import com.aptech.apiv1.service.BaggageService;
import com.aptech.apiv1.utils.business.BagTagGenerator;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BaggageServiceImpl implements BaggageService {
    final BaggageRepository baggageRepository;

    @Autowired
    public BaggageServiceImpl(BaggageRepository baggageRepository) {
        this.baggageRepository = baggageRepository;
    }

    @Override
    public Iterable<Baggage> addBaggage(AddBagDtos addBagDtos) {
        List<Baggage> baggages = new ArrayList<>();
        addBagDtos.getBaggages().forEach(dto -> {
            Baggage bag = new Baggage() // status default = "CHECKED" due to add-bag feature
                    .setBooking(new Booking().setId(dto.getBookingId()))
                    .setTagNo(BagTagGenerator.getBagTagNo(dto.getDest()))
                    .setPiece(dto.getPiece()).setWeight(dto.getWeight());
//            try {
//                bag.setBarcode(BagTagGenerator.genQRBagTag(bag));
                baggages.add(bag);
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            } catch (WriterException e) {
//                throw new RuntimeException(e);
//            }
        });
        return baggageRepository.saveAll(baggages);
    }

    @Override
    public List<Baggage> getBagsByBookingId(String id) {
        return null;
    }
}
