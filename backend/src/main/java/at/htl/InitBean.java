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

    final String FILE_NAME = "/Users/merisbesic/Documents/SCHULE/DIPLOMARBEIT/LeoForms/backend/src/main/resources/students.csv";

    @Inject
    GroupRepository groupRepository;

    @Inject
    StudentRepository studentRepository;

    @Inject
    QuestionnaireRepository questionnaireRepository;

    void onStart(@Observes StartupEvent event) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME));

        reader.lines().skip(1)
                .map(x -> x.split(";"))
                .peek(x -> {
                    System.out.printf("%s: %s %s\n", x[4], x[0], x[1]);

                })
                .count();
    }

}
