package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.BookingPaymentDto;
import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.aptech.apiv1.dto.ReviewPaypalResponseDto;
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
import java.util.stream.Collectors;

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
        String approvalUrl = getApprovalLink(approvedPayment);
        if (approvalUrl == null) {
            return null;
        }

//        /// Save payment into DB under status APPROVED
//        List<com.aptech.apiv1.model.Payment> payments = PaymentUtils.transactionToPayments(approvedPayment.getTransactions());
//        paymentRepository.saveAll(payments);

        System.out.println(approvedPayment);
        List<Transaction> transactionList = approvedPayment.getTransactions();
        System.out.println(transactionList);
//        List<Links> links = approvedPayment.getLinks();
//        Optional<Links> link = links.stream().filter(l -> l.getRel().equalsIgnoreCase("approval_url")).findFirst();
//        return link.map(Links::getHref).orElse(null);

        return approvalUrl;
    }

    private String getApprovalLink(Payment approvedPayment) {
        List<Links> links = approvedPayment.getLinks();
        String approvalLink = null;
        for (Links link : links) {
            if (link.getRel().equalsIgnoreCase("approval_url")) {
                approvalLink = link.getHref();
            }
        }
        return approvalLink;
    }

    public List<ReviewPaypalResponseDto> reviewPaypal(List<Transaction> transactions) {
        List<ReviewPaypalResponseDto> responseDtos = new ArrayList<>();
        long bookingId = Long.parseLong(transactions.get(0).getItemList().getItems().get(0).getName());
        String pnr = bookingRepository.findById(bookingId).get().getPnr();
        List<Booking> bookings = bookingRepository.findBookingByPnr(pnr);

        List<com.aptech.apiv1.model.Payment> payments = PaymentUtils.transactionToPayments(transactions);
        bookings.forEach(b -> {
            String fullName = b.getFirstName() + " " + b.getLastName();
            ReviewPaypalResponseDto review = new ReviewPaypalResponseDto();
            review.setFullName(fullName);
            review.setPayments(payments.stream().filter(p -> p.getBookingId() == b.getId()).toList());
        });
        /// Save payment into DB under status APPROVED
        paymentRepository.saveAll(payments);
        return responseDtos;
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        APIContext apiContext = new APIContext(CLIENT_ID, SECRET_KEY, MODE);
        PaymentExecution paymentExecution = new PaymentExecution().setPayerId(payerId);

        List<Transactions> transactionList = paymentExecution.getTransactions();
        System.out.println(transactionList);
        Payment payment = new Payment().setId(paymentId);
        return payment.execute(apiContext, paymentExecution);
    }

    public Payment getPaymentDetails(String paymentId) throws PayPalRESTException {
        APIContext apiContext = new APIContext(CLIENT_ID, SECRET_KEY, MODE);
        return Payment.get(apiContext, paymentId);
    }

    private RedirectUrls getRedirectUrls() {
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://localhost:3000/canceled-paypal");
        redirectUrls.setReturnUrl("http://localhost:3000/review-paypal");
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
