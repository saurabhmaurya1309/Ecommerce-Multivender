package com.saurabh.service;

import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	
	private final JavaMailSender javaMailSender;
	
	public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
	
	public void sendVerificationOtpEmail(String userEmail,String otp, String subject, String text) {
		
		try {
			MimeMessage mimeMessage=javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(
					mimeMessage,"utf-8");
			
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setText(text);
			mimeMessageHelper.setTo(userEmail); 
			javaMailSender.send(mimeMessage);
					
		}
		catch(MailException | MessagingException e){
			System.out.print("eoro->"+e);
			throw new MailSendException("Failed to send email");
			
		}
	}
	
}