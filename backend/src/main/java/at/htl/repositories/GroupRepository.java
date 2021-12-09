package at.htl.repositories;

import at.htl.model.Group;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GroupRepository implements PanacheRepository<Group> {
}
