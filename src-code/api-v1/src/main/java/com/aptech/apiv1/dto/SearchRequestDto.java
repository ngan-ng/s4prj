package com.aptech.apiv1.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class SearchRequestDto implements Serializable {
    private String origin;
    private String destination;
    private LocalDateTime departDate;
    private LocalDateTime returnDate;
    private String tripType;
}
