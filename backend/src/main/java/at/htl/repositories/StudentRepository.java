package at.htl.repositories;

import at.htl.model.Student;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StudentRepository implements PanacheRepository<Student> {
    public Student merge(Student student) {
        return getEntityManager().merge(student);
    }

}
