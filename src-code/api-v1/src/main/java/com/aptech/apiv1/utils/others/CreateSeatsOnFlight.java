package com.aptech.apiv1.utils.others;

import com.aptech.apiv1.enums.SeatType;
import com.aptech.apiv1.model.Flight;
import com.aptech.apiv1.model.Seat;
import com.aptech.apiv1.utils.business.SeatUtils;

import java.util.ArrayList;
import java.util.List;

public class CreateSeatsOnFlight {
    static int rowStart = 1, rowEnd = 30;
    // ASCII A: 65 -> F:70
    static int colStart = 65, colEnd = 70;

    public static List<Seat> createSeatsA320(Flight flight) {
        List<Seat> seatmap = new ArrayList<>();
        SeatType seatType;
        for (int i = rowStart; i <= rowEnd; i++) {
            if((i>=6 && i<11)||(i>12 && i<=31)){ // Row: 6-11, 13,14 - 31: Standard
                seatType = SeatType.STANDARD;
            }else if(i>=11 && i<=12){ // row 11-12: Exit
                seatType = SeatType.EXIT;
            }else {
                seatType= SeatType.HOTSEAT;
            }
            for (int j = colStart; j <= colEnd; j++) {
                String r = i<10?"0"+i:String.valueOf(i);

                Seat seat = new Seat().setSeatNumber(r+(char)j)
                        .setType(seatType.toString())
                        .setPrice(SeatUtils.getPrice(seatType))
                        .setDescription(SeatUtils.getDescription(seatType));
                seat.setFlight(flight);
                seatmap.add(seat);
            }
        }
        return seatmap;
    }
}
