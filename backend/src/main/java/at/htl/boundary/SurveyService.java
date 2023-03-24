package at.htl.boundary;

import at.htl.controller.InviteController;
import at.htl.model.*;
import at.htl.repositories.PollRepository;
import at.htl.repositories.StudentRepository;
import at.htl.repositories.SurveyRepository;
import at.htl.repositories.TemplateRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.List;
import java.util.Set;


@Path("/survey")
public class SurveyService {


    @Inject
    SurveyRepository surveyRepository;

    @Inject
    TemplateRepository templateRepository;

    @Inject
    InviteController inviteController;

    @Inject
    StudentRepository studentRepository;

    @Inject
    PollRepository pollRepository;

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
            return Response.serverError().build();
        }

        String content = survey.html;
        Survey s = new Survey(survey.creationDate, survey.endDate, t, Status.STARTED,
            survey.name, survey.description, survey.groups, survey.html);
        surveyRepository.persist(s);

        saveHTML(s, content);

//        inviteController.invite(survey.templateId, survey.groups);
        inviteController.invite(survey.templateId, Set.of(
                new Group("7ACIF", "202223"),
                new Group("7AKIF", "202223")
        ));

        return Response.ok().build();
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Transactional
    public InputStream getHTML(@QueryParam("token") String token) {
        String[] parts = inviteController.decode(token).split("&");
        long surveyId = Long.parseLong(parts[0]);
        String matNr = parts[1];

        Student student = studentRepository.find("matNr", matNr).firstResult();
        Survey survey = surveyRepository.findById(surveyId);

        pollRepository.persist(new Poll(token, student, survey));

        File f = new File(String.format("src/main/resources/survey-html/%s.html", surveyId));

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
