package at.htl.repositories;

import at.htl.model.Survey;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.sql.*;
import java.util.Properties;

@ApplicationScoped
public class SurveyRepository implements PanacheRepository<Survey> {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/db";
        String user = "user";
        String pass = "password";

        Connection con = null;
        try {
            con = DriverManager.getConnection(url, user, pass);
            Statement stm = con.createStatement();
            ResultSet rsStudent = stm.executeQuery("SELECT * FROM LF_STUDENT");
            ResultSet rsQuestionnaire = stm.executeQuery("SELECT * FROM LF_QUESTIONNAIRE");

            while (rsStudent.next()) {
                String to = rsStudent.getString(2);
                String from = "florianklausner15@gmail.com";
                String host = "smtp.gmail.com";
                Properties properties = System.getProperties();

                properties.put("mail.smtp.host", host);
                properties.put("mail.smtp.port", "465");
                properties.put("mail.smtp.ssl.enable", "true");
                properties.put("mail.smtp.auth", "true");

                Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(
                                "florianklausner15@gmail.com",
                                "AlexFlo120403"
                        );
                    }
                });

                session.setDebug(true);

                String matrikelNo = rsStudent.getString(5);
                String questionnaireId = rsQuestionnaire.getString(4);

                try {
                    MimeMessage message = new MimeMessage(session);
                    message.setFrom(new InternetAddress(from));
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
                    message.setSubject("This is a test email!");
                    message.setText("Hallo " + rsStudent.getString(3) + " "  + rsStudent.getString(4)
                            + " hier ist Ihr Formular zum ausfüllen \n"
                            + "http://localhost:4200/new/" + matrikelNo);
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
