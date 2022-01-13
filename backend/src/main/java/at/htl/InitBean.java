package at.htl;

import at.htl.model.Group;
import at.htl.model.Student;
import at.htl.repositories.GroupRepository;
import at.htl.repositories.QuestionnaireRepository;
import at.htl.repositories.StudentRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class InitBean {


    final String FILE_NAME = "src/main/resources/students.csv";
    //src/main/java/at/htl/InitBean.java

    @Inject
    GroupRepository groupRepository;

    @Inject
    StudentRepository studentRepository;

    @Inject
    QuestionnaireRepository questionnaireRepository;

    @Transactional
    void onStart(@Observes StartupEvent event) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME));

        reader.lines().skip(1)
                .distinct()
                .map(x -> x.split(";"))
                .peek(x -> {
                    System.out.printf("%s: %s %s\n", x[4], x[0], x[1]);
                    Group g = new Group(x[4], x[3]);
                    Student s = new Student(x[0], x[1], x[2], g);
                    studentRepository.merge(s);
                    System.out.println("Saved: " + x[0] + " " + x[1]);
                })
                .count();
    }

}
