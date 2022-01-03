package at.htl.repositories;

import at.htl.model.Questionnaire;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QuestionnaireRepository implements PanacheRepository<Questionnaire> {
    public Questionnaire merge(Questionnaire questionnaire) {
        return getEntityManager().merge(questionnaire);
    }
}
