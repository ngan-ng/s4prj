package com.aptech.apiv1.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
//@NamedNativeQuery(name = "ChessPlayer.findPlayerNameDtoById_Named",
//        query = "SELECT s.id as id, s.seat_number as seatNumber, FROM Seat s WHERE flightId = :flightId",
//        resultSetMapping = "Mapping.SeatDto")
//@SqlResultSetMapping(name = "Mapping.SeatDto",
//        classes = @ConstructorResult(targetClass = SeatDto.class,
//                columns = {@ColumnResult(name = "id"),
//                        @ColumnResult(name = "seatNumber"),
//                        @ColumnResult(name = "type"),
//                        @ColumnResult(name = "description"),
//                        @ColumnResult(name = "price"),
//                        @ColumnResult(name = "booking")
//        }))
@Entity
@Data
//@Builder
@Accessors(chain = true)
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "Unique_SeatNo_Flight", columnNames = {"seatNumber", "flightId"})
})
public class Seat implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "seatNumber", columnDefinition = "varchar(3)")
    private String seatNumber;
    private String type;
    @Column(name = "description", columnDefinition = "varchar(MAX)")
    private String description;
    private double price = 0.0;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flightId", referencedColumnName = "id", nullable = false)
    private Flight flight;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingId")
    private Booking booking;
}
