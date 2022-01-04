package at.htl.repositories;

import at.htl.model.Group;
import at.htl.model.Student;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GroupRepository implements PanacheRepository<Group> {

    public Group merge(Group group) {
        return getEntityManager().merge(group);
    }

}
