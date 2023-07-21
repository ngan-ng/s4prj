package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.EmailDto;
import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    Logger logger = LogManager.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender emailSender;

    //@Value("${spring.mail.username}")
    //private String emailTo;

    @Async
    public void send(EmailDto emailDto) {

        // prepare email format
        MimeMessagePreparator preparator = new MimeMessagePreparator() {

            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailDto.getEmail()));
                mimeMessage.setSubject("Your booking purchase is confirmed! For PNR: " + emailDto.getPnr());

                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

                helper.setText(
                        "<html>"
                                + "<body>"
                                + "Hi " + emailDto.getFirstName() + " " + emailDto.getLastName() + ","
                                + "<br/><br/>"
                                + "We are so excited to welcome you to FS Airlines. Please find your booking information based on the PNR code below and fill in on our website. Please present your booking upon boarding."
                                + "<br/><br/>"
                                + "Main passenger: " + "<br/>"
                                + "Email: " + emailDto.getEmail() + "<br/>"
                                + "PNR: " + "<strong>" + emailDto.getPnr() + "</strong>" + "<br/>"
                                + "Payment method: " + emailDto.getPaymentMethod() + " with payer email " + emailDto.getPayerEmail()
                                + "<br/><br/>"
                                + "Contact us:" + "<br/>"
                                + "Phone number: 123-456-789" + "<br/>"
                                + "Email: fsairlines.global@gmail.com" + "<br/>"
                                + "<br/><br/>"
                                + "Happy travels!"
                                + "</body>"
                                + "</html>", true
                );
            }
        };

        try {
            emailSender.send(preparator);
            logger.info("Email sent with success.");
        } catch (Exception e) {
            logger.error("Error sending email.");
            throw e;
        }
    }
}
