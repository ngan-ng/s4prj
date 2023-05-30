package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.BookingPaymentDto;
import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.aptech.apiv1.dto.paypal.ReviewPaypalResponseDto;
import com.aptech.apiv1.dto.paypal.SinglePaypalReviewDto;
import com.aptech.apiv1.enums.PaymentStatus;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.repository.BookingRepository;
import com.aptech.apiv1.repository.PaymentRepository;
import com.aptech.apiv1.service.PaymentService;
import com.aptech.apiv1.utils.business.PaymentUtils;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.aptech.apiv1.utils.business.PaymentUtils.getTransactionInformation;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    //    private static final String CLIENT_ID = "AZtv8J9ajlDoiZflPaFVEwy_ComBYd78xBkYib65BrXSb6PoA4_w6q5MgPSuvmYF_9KyIPibTGYnRP8t";
//    private static final String SECRET_KEY = "EKQMOr-drhyOL8gQq_a77qsT-bEWoSPfRF-DoQAcE-AyV8DDGfln-5XcyiQDqb33waMgmHBWit29hsHk";
//    private static final String MODE = "sandbox";
    @Value("${paypal.client-id}")
    String CLIENT_ID;
    @Value("${paypal.secret-key}")
    String SECRET_KEY;
    @Value("${paypal.mode}")
    String MODE;
    @Value("${security.cors.origin}")
    String contextPath;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    public String authorizePayment(GroupBookingPaymentDto bookings) throws PayPalRESTException {
        Payer payer = getPayerInformation(bookings.getBookings().get(0));
        List<Transaction> transactions = getTransactionInformation(bookings);
        Payment requestPayment = new Payment();
        requestPayment.setTransactions(transactions)
                .setRedirectUrls(getRedirectUrls())
                .setPayer(payer)
                .setIntent("authorize");

        APIContext apiContext = new APIContext(CLIENT_ID, SECRET_KEY, MODE);
        Payment approvedPayment = requestPayment.create(apiContext);
        /// get and return approval_url
        Links links = approvedPayment.getLinks().stream()
                .filter(l -> l.getRel().equalsIgnoreCase("approval_url"))
                .findFirst().orElseThrow(null);
        return links.getHref();
    }

    public ReviewPaypalResponseDto reviewPaypal(String paymentId) throws PayPalRESTException {
        Payment payment = getPaymentDetails(paymentId);
        Transaction transaction = payment.getTransactions().get(0);
        List<com.aptech.apiv1.model.Payment> payments = PaymentUtils.transactionToPayments(transaction, PaymentStatus.APPROVED);

        long bookingId = Long.parseLong(transaction.getItemList().getItems().get(0).getName());
        String pnr = bookingRepository.findById(bookingId).get().getPnr();
        List<Booking> bookings = bookingRepository.findBookingByPnr(pnr);

        Payer payer = payment.getPayer();
        PayerInfo payerInfo = payer.getPayerInfo();

        ReviewPaypalResponseDto responseDtos = new ReviewPaypalResponseDto()
                .setPaymentMethod(payer.getPaymentMethod())
                .setStatus(payer.getStatus())
                .setAmount(transaction.getAmount())
                .setPayerEmail(payerInfo.getEmail())
                .setPayerFullName(payerInfo.getFirstName() + " " + payerInfo.getLastName())
                .setReviewDtos(bookings.stream().map(b ->
                                new SinglePaypalReviewDto()
                                        .setBooking(b)
                                        .setPayments(payments.stream().filter(p ->
                                                p.getBookingId() == b.getId()).toList()))
                        .toList());
        /// Save payment into DB under status APPROVED
//        paymentRepository.saveAll(payments);
        return responseDtos;
    }

    public List<com.aptech.apiv1.model.Payment> executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = getPaymentDetails(paymentId);
        Transaction transaction = payment.getTransactions().get(0);
        List<com.aptech.apiv1.model.Payment> payments = PaymentUtils.transactionToPayments(transaction, PaymentStatus.COMPLETED);

        APIContext apiContext = new APIContext(CLIENT_ID, SECRET_KEY, MODE);
        PaymentExecution paymentExecution = new PaymentExecution().setPayerId(payerId);
        Payment executePayment = new Payment().setId(paymentId).execute(apiContext, paymentExecution);
        if(executePayment != null){
            return paymentRepository.saveAll(payments);
        }
        return null;
    }

    public Payment getPaymentDetails(String paymentId) throws PayPalRESTException {
        APIContext apiContext = new APIContext(CLIENT_ID, SECRET_KEY, MODE);
        return Payment.get(apiContext, paymentId);
    }

    private RedirectUrls getRedirectUrls() {

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(contextPath + "/canceled-paypal");
        redirectUrls.setReturnUrl(contextPath + "/review-paypal");
        return redirectUrls;
    }

    private Payer getPayerInformation(BookingPaymentDto booking) {
        return new Payer().setPaymentMethod("paypal")
                .setPayerInfo(new PayerInfo()
                        .setFirstName(booking.getFirstName())
                        .setLastName(booking.getLastName())
                        .setEmail(booking.getEmail()));
    }
}
