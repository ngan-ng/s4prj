package com.aptech.apiv1.dto;

import jakarta.validation.Valid;
import lombok.Getter;

import java.util.List;
@Getter
public class CheckinRequestDtos {
    @Valid
    private List<CheckinDto> checkinRequestDtos;
}
