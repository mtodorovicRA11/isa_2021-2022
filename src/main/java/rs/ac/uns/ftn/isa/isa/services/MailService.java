package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//added another implementation
@Service
public class MailService {

    private final JavaMailSender sender;

    public MailService(JavaMailSender sender) {
        this.sender = sender;
    }

    public void sendSimpleMessage(String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@isa.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        sender.send(message);
    }
}
