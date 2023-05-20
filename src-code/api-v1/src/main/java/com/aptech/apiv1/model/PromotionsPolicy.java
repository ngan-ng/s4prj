package com.aptech.apiv1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class PromotionsPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;
    private String promotionCode; // E.g: EVENT97
    private String promotionType;
    private long pointCondition;
    private String description;
    private double applyRate; // 0.05: 5%
    private long createdBy;
    private long updatedBy;
}
