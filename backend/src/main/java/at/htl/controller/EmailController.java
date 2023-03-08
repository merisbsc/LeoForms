package at.htl.controller;

import javax.enterprise.context.ApplicationScoped;
import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

@ApplicationScoped
public class EmailController {

    public void sendSurveyInvitationEmail(String receiver, String link) {
        String from = "leoforms@gmx.at";
        String host = "mail.gmx.net";
        Properties properties = System.getProperties();

        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication(from, "MySuperPassword");

            }

        });

        session.setDebug(true);

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
            message.setSubject("LeoForms Survey Invitation");
            message.setText("Please participate using the following link: " + link);

            System.out.println("sending...");
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

}
