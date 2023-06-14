package com.aptech.apiv1.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class SearchRequestDto implements Serializable {
    private String origin;
    private String destination;
    private LocalDate departDate;
    private LocalDate returnDate;
    private String tripType;
}
