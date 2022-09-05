package at.htl.repositories;

import at.htl.model.Survey;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SurveyRepository implements PanacheRepository<Survey> {
}
