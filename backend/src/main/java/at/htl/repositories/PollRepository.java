package at.htl.repositories;

import at.htl.model.Poll;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PollRepository implements PanacheRepository<Poll> {
}
