package at.htl.repositories;

import at.htl.model.Template;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TemplateRepository implements PanacheRepository<Template> {
    public Template merge(Template template) {
        return getEntityManager().merge(template);
    }
}
