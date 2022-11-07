package at.htl.boundary;

import at.htl.model.Survey;
import at.htl.repositories.SurveyRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.ResourceBundle;

@Path("/survey")
public class SurveyService {


    @Inject
    SurveyRepository surveyRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Survey> getAllSurveys() {
        return surveyRepository.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveSurvey(Survey survey) {
        surveyRepository.persist(survey);

        return Response.ok().build();
    }
}
