package at.htl.repositories;

import at.htl.model.Question;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QuestionRepository implements PanacheRepository<Question> {
}
