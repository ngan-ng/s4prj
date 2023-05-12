package com.aptech.apiv1.dto;

import jakarta.validation.Valid;
import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Getter
public class AddBagDtos implements Serializable {
    @Valid
    private List<AddBagDto> baggages = new ArrayList<>();
}
