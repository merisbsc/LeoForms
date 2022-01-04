package at.htl;

import at.htl.repositories.GroupRepository;
import at.htl.repositories.QuestionnaireRepository;
import at.htl.repositories.StudentRepository;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

@ApplicationScoped
public class InitBean {

    @Inject
    GroupRepository groupRepository;

    @Inject
    StudentRepository studentRepository;

    @Inject
    QuestionnaireRepository questionnaireRepository;

    void onStart(@Observes StartupEvent event) {

    }

}
