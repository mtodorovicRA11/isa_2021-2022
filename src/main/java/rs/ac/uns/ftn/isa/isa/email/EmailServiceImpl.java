package rs.ac.uns.ftn.isa.isa.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private Environment env;

    public void sendSimpleMessage(String to, String subject, String text) throws MessagingException {

        MimeMessage message = emailSender.createMimeMessage();

        message.setSubject(subject);

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(env.getProperty("spring.mail.username"));

        helper.setTo(to);

        helper.setText(text, true);

        emailSender.send(message);
    }
}
