package at.htl.repositories;

import at.htl.model.Answer;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AnswerRepository implements PanacheRepository<Answer> {
}
