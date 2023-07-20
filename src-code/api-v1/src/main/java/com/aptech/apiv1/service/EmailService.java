package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.paypal.ReviewPaypalResponseDto;
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

    @Value("${spring.mail.username}")
    private String emailTo;

    @Async
    public void send(ReviewPaypalResponseDto reviewPaypalResponseDto) {

        // prepare email format
        MimeMessagePreparator preparator = new MimeMessagePreparator() {

            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailTo));
                mimeMessage.setSubject(reviewPaypalResponseDto.getPayerEmail());

                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

                helper.setText(
                        "<html>"
                                + "<body>"
                                + "Email sent by: " + reviewPaypalResponseDto.getStatus() + "<br/>"
                                + "Email address: " + reviewPaypalResponseDto.getPayerEmail()
                                + "<br/><br/>"
                                + reviewPaypalResponseDto.getReviewDtos()
                                + "</body>"
                                + "</html>", true);
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
