package at.htl.boundary;

import at.htl.model.Survey;
import at.htl.model.SurveyDTO;
import at.htl.model.Template;
import at.htl.repositories.SurveyRepository;
import at.htl.repositories.TemplateRepository;

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

    @Inject
    TemplateRepository templateRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Survey> getAllSurveys() {
        return surveyRepository.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveSurvey(SurveyDTO survey) {
        //surveyRepository.persist(survey);
        Template t;


        if (survey.templateId != null) {
            t = templateRepository.findById(survey.templateId);
        } else {
            t = null;
            return Response.serverError().build();
        }

        Survey s = new Survey(survey.creationDate, survey.endDate, t, survey.status, survey.name, survey.description);
        surveyRepository.persist(s);

        return Response.ok().build();
    }
}
