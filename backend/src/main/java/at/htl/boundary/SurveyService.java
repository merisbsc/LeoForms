package at.htl.boundary;

import at.htl.model.Group;
import at.htl.model.Survey;
import at.htl.model.SurveyDTO;
import at.htl.model.Template;
import at.htl.repositories.GroupRepository;
import at.htl.repositories.SurveyRepository;
import at.htl.repositories.TemplateRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.List;
import java.util.ResourceBundle;


@Path("/survey")
public class SurveyService {


    @Inject
    SurveyRepository surveyRepository;

    @Inject
    TemplateRepository templateRepository;

    @Inject
    GroupRepository groupRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Survey> getAllSurveys() {
        return surveyRepository.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveSurvey(SurveyDTO survey) {
        Template t;

        if (survey.templateId != null) {
            t = templateRepository.findById(survey.templateId);
        } else {
            t = null;
            return Response.serverError().build();
        }

        String content = survey.html;

        Survey s = new Survey(survey.creationDate, survey.endDate, t, survey.status,
                survey.name, survey.description, survey.groups, survey.html);
        surveyRepository.persist(s);
        saveHTML(s, content);

        return Response.ok().build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.TEXT_HTML)
    public InputStream getHTML(@PathParam("id") Long id) {
        File f = new File("src/main/resources/survey-html/" + id + ".html");
        try {
            return new FileInputStream(f);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }


    private void saveHTML(Survey survey, String content) {

        File html = new File("src/main/resources/survey-html/" + survey.getId() + ".html");
        try {
            FileWriter writer = new FileWriter(html);
            writer.write(content);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
