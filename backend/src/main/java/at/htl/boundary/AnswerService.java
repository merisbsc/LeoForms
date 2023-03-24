package at.htl.boundary;

import at.htl.model.Answer;
import at.htl.model.Poll;
import at.htl.model.Question;
import at.htl.repositories.AnswerRepository;
import at.htl.repositories.PollRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/answer")
public class AnswerService {

    @Inject
    AnswerRepository answerRepository;

    @Inject
    PollRepository pollRepository;

    @GET
    public List<Answer> getAllAnswers() {
        return answerRepository.listAll();
    }

    @Transactional
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveAnswer(@QueryParam("token") String token, String answer) {
        System.out.println("token: " + token);
        System.out.println("answer: " + answer);
        Poll poll = pollRepository.find("token", token).firstResult();
        Answer a = new Answer(answer, poll);
        answerRepository.persist(a);

        return Response.ok().build();

    }

}
