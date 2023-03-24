package at.htl.controller;

import at.htl.model.Group;
import at.htl.model.Student;
import at.htl.repositories.StudentRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class InviteController {

    @Inject
    StudentRepository studentRepository;

    @Inject
    EmailController emailController;

    public void invite(long templateId, Set<Group> groups) {
        List<String> groupIds = groups.stream().map(Group::getId).collect(Collectors.toList());
        List<Student> students = studentRepository.findStudentsByGroupIds(groupIds);

        students.forEach(s -> {
            emailController.sendSurveyInvitationEmail(s.getEmail(), createLink(templateId, s.getMatNr()));
            System.out.println(encode(templateId + "&" + s.getMatNr()));
            System.out.println(decode(encode(templateId + "&" + s.getMatNr())));
        });

    }

    public String createLink(long templateId, String matNr) {
        return "http://localhost:8080/survey?token=" + encode(templateId + "&" + matNr);
    }

    public String encode(String data) {
        return Base64.getEncoder().encodeToString(data.getBytes());
    }

    public String decode(String data) {
        return new String(Base64.getDecoder().decode(data));
    }

}
