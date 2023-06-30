package com.aptech.apiv1.utils.others;

import com.aptech.apiv1.enums.SeatStatus;
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
        int randRowMax = 28;
        int randRowMin = 23;
        int randColMax = 70;
        int randColMin = 66;
        int k = 0;
        List<Integer> arrI = new ArrayList<>();
        List<Integer> arrJ = new ArrayList<>();
        while (k < 5) {
            int randI = (int) (Math.random() * (randRowMax - randRowMin + 1)) + randRowMin;
            int randJ = (int) (Math.random() * (randColMax - randColMin + 1)) + randColMin;
            arrI.add(randI);
            arrJ.add(randJ);
            k++;
        }
        for (int i = rowStart; i <= rowEnd; i++) {
            if ((i >= 6 && i < 11) || (i > 12 && i <= 31)) { // Row: 6-11, 13,14 - 31: Standard
                seatType = SeatType.STANDARD;
            } else if (i >= 11 && i <= 12) { // row 11-12: Exit
                seatType = SeatType.EXIT;
            } else {
                seatType = SeatType.HOTSEAT;
            }
            for (int j = colStart; j <= colEnd; j++) {
                SeatStatus status = SeatStatus.AVAILABLE;
                if(isSelected(i, j, arrI, arrJ)){
                    status = SeatStatus.SELECTED;
                }
                String r = i < 10 ? "0" + i : String.valueOf(i);
                if ((j == 65 || j == 70) && i == 11) {
                    Seat seat = new Seat().setFlight(flight).setPrice(0.0).setSeatNumber(r + (char) j);
                    seatmap.add(seat);
                } else {
                    Seat seat = new Seat().setSeatNumber(r + (char) j)
                            .setSeatType(seatType.toString())
                            .setStatus(String.valueOf(status))
                            .setPrice(SeatUtils.getPrice(seatType))
                            .setDescription(SeatUtils.getDescription(seatType));
                    seat.setFlight(flight);
                    seatmap.add(seat);
                }
            }
        }
        return seatmap;
    }
    static boolean isSelected(int i, int j, List<Integer> arrI, List<Integer> arrJ) {
        return arrI.contains(i) && arrJ.contains(j);
    }
}
