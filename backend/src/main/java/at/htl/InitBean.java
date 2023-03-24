package at.htl;

import at.htl.controller.InviteController;
import at.htl.model.Group;
import at.htl.model.Student;
import at.htl.repositories.GroupRepository;
import at.htl.repositories.TemplateRepository;
import at.htl.repositories.StudentRepository;
import io.quarkus.runtime.StartupEvent;
import org.apache.commons.io.FileUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class InitBean {

    //final String FILE_NAME = "src/main/resources/students.csv";

    @Inject
    GroupRepository groupRepository;

    @Inject
    StudentRepository studentRepository;

    @Inject
    TemplateRepository templateRepository;

    @Inject
    InviteController inviteController;

    @Transactional
    void onStart(@Observes StartupEvent event) throws IOException {

        Files.createDirectories(Paths.get("src/main/resources/survey-html"));
        FileUtils.cleanDirectory(new File("src/main/resources/survey-html"));

        BufferedReader reader = new BufferedReader(new FileReader("src/main/resources/students.csv"));

        reader.lines().skip(1)
                .distinct()
                .map(x -> x.split(";"))
                .peek(x -> {
                    System.out.printf("%s: %s %s\n", x[4], x[0], x[1]);
                    Group g = new Group(x[5], x[4]);
                    Student s = new Student(x[0], x[1], x[2],x[3], g);
                    studentRepository.merge(s);
                })
                .count();

        BufferedReader reader2 = new BufferedReader(new FileReader("src/main/resources/groups.csv"));

        reader2.lines().skip(1)
                .distinct()
                .peek(x -> {
                    Group g = new Group(x, "202223");
                    groupRepository.persist(g);

                })
                .count();

        inviteController.invite(1, Set.of(
                new Group("7ACIF", "202223"),
                new Group("7AKIF", "202223")
        ));
    }

}
