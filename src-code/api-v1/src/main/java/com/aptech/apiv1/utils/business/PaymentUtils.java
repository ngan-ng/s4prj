package com.aptech.apiv1.utils.business;

import com.aptech.apiv1.dto.BookingPaymentDto;
import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.aptech.apiv1.enums.*;
import com.aptech.apiv1.enums.Gender;
import com.paypal.api.payments.*;

import java.util.ArrayList;
import java.util.List;

public class PaymentUtils {
    public static List<com.aptech.apiv1.model.Payment> transactionToPayments(List<Transaction> transactions){
        List<com.aptech.apiv1.model.Payment> payments = new ArrayList<>();
        transactions.forEach(t->{
            t.getItemList().getItems().forEach(item -> {
                com.aptech.apiv1.model.Payment payment = new com.aptech.apiv1.model.Payment();
                payment.setPaymentMethod(PaymentMethod.PAYPAL.toString());
                payment.setStatus(String.valueOf(PaymentStatus.APPROVED));
                payment.setPrice(Double.parseDouble(item.getPrice()));
                payment.setCategory(item.getDescription());
                payment.setBookingId(Long.parseLong(item.getName()));
                payments.add(payment);
            });
        });
        return payments;
    }
    public static List<Transaction> getTransactionInformation(GroupBookingPaymentDto groupBooking) {
        List<Transaction> transactionList = new ArrayList<>();
        Details details = new Details();
        Amount amount = new Amount();
        Transaction transaction = new Transaction();
        List<Item> items = new ArrayList<>();
        double totalAmount = 0;
        double VAT = 0.1;

        for (BookingPaymentDto b : groupBooking.getBookings()) {

            double ticketPrice = b.getFlight().getBasePrice();
//            String fullname = String.format("%s. %s %s",
//                    b.getTitle(), b.getFirstName(), b.getLastName());
            Gender gender = Gender.valueOf(b.getGender());
            BagAllowance bagAllowance = BagUtils.fromInt(b.getBagAllowance());
            String bookingId = String.valueOf(b.getId());

            for (int i = 0; i < 4; i++) {
                // Each booking got 4 item payment
                Item item = new Item().setCurrency("USD");
                switch (i) {
                    case 0 -> {
                        item.setPrice(String.format("%.2f", ticketPrice))
                                .setName(bookingId)
                                .setDescription(PaymentCategory.TICKET.toString())
                                .setQuantity("1");
                        totalAmount += ticketPrice;
                        if(b.getInfant() != null){
                            double infantPrice = 5; // Infant fee: $5 USD
                            item.setPrice(String.format("%.2f", infantPrice))
                                    .setName(bookingId)
                                    .setDescription(PaymentCategory.INFANT_FEE.toString())
                                    .setQuantity("1");
                            totalAmount += infantPrice;
                        }
                    }
                    case 1 -> {
                        double airportTax = TaxUtils.getAirportTax(gender);
                        item.setPrice(String.format("%.2f", airportTax))
                                .setName(bookingId)
                                .setDescription(PaymentCategory.AIRPORT_TAX.toString())
                                .setQuantity("1");
                        totalAmount += airportTax;
                    }
                    case 2 -> {
                        double bagAllowanceFee = BagUtils.getCheckedBaggageChargePurchaseOnline(bagAllowance);
                        item.setPrice(String.valueOf(bagAllowanceFee))
                                .setName(bookingId)
                                .setDescription(PaymentCategory.BAG_ALLOWANCE.toString())
                                .setQuantity("1");
                        totalAmount += bagAllowanceFee;
                    }
                    case 3 -> {
                        double seatPrice = b.getLoadSeatDto().getPrice();
                        item.setPrice(String.format("%.2f", seatPrice))
                                .setName(bookingId)
                                .setDescription(PaymentCategory.SEAT+"-"+ b.getLoadSeatDto().getSeatNumber())
                                .setQuantity("1");
                        totalAmount += seatPrice;
                    }
//                    case 4 -> {
//                        item.setCategory("Meal")
//                                .setPrice("0")
//                                .setDescription("Airport tax and security service charge")
//                                .setQuantity("1");
//                        items.add(item);
//                    }
                }
                items.add(item);
            }
        } // end foreach
        details.setShipping(String.format("%.2f", 0.0));
        details.setSubtotal(String.format("%.2f", totalAmount));
        details.setTax(String.format("%.2f", totalAmount * VAT));
        amount.setCurrency("USD");
        amount.setTotal(String.format("%.2f", totalAmount * (1 + VAT)));
        amount.setDetails(details);
        ItemList itemList = new ItemList();
        itemList.setItems(items);
        transaction.setAmount(amount);
        transaction.setItemList(itemList).setDescription(groupBooking.getBookings().get(0).getPnr());
        transactionList.add(transaction);
        return transactionList;
    }

}
