package at.htl.boundary;

import at.htl.model.Answer;
import at.htl.model.Question;
import at.htl.repositories.AnswerRepository;

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

    @GET
    public List<Answer> getAllAnswers() {
        return answerRepository.listAll();
    }

    @Transactional
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveAnswer(String answer) {
        Answer a = new Answer(answer);
        answerRepository.persist(a);

        return Response.ok().build();

    }

}
