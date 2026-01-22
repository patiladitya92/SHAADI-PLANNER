package com.exam.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    public void sendResetPasswordEmail(String toEmail, String resetToken, String userName) {
        String resetUrl = "http://localhost:3000/reset-password?token=" + resetToken;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset Your ServiceBooking Password");
        message.setFrom("palroshan255793@gmail.com");  // Same as username above
        
        message.setText("""
            Hi %s,
            
            Click this link to reset your password (valid for 1 hour):
            %s
            
            If you didn't request this, simply ignore this email.
            
            Regards,
            ServiceBooking Team
            """.formatted(userName, resetUrl));
        
        mailSender.send(message);
        System.out.println("✅ Reset email sent to: " + toEmail);
    }
}
