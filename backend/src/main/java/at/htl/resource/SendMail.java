package at.htl.resource;

import java.sql.*;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMail {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/db";
        String user = "user";
        String pass = "password";

        Connection con = null;
        try {
            con = DriverManager.getConnection(url, user, pass);
            Statement stm = con.createStatement();
            ResultSet rs = stm.executeQuery("SELECT * FROM LF_STUDENT");

            while (rs.next()) {
                String to = rs.getString(2);
                String from = "florianklausner15@gmail.com";
                String host = "smtp.gmail.com";
                Properties properties = System.getProperties();

                properties.put("mail.smtp.host", host);
                properties.put("mail.smtp.port", "465");
                properties.put("mail.smtp.ssl.enable", "true");
                properties.put("mail.smtp.auth", "true");

                Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("florianklausner15@gmail.com", "AlexFlo120403");
                    }
                });

                session.setDebug(true);

                try {
                    MimeMessage message = new MimeMessage(session);
                    message.setFrom(new InternetAddress(from));
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
                    message.setSubject("This is a test email!");
                    message.setText("Hello World!");
                    System.out.println("sending...");

                    Transport.send(message);
                    System.out.println("Sent message successfully....");
                } catch (MessagingException mex) {
                    mex.printStackTrace();
                }
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
