package at.htl.boundary;

import at.htl.model.Group;
import at.htl.model.Student;
import at.htl.repositories.GroupRepository;
import at.htl.repositories.StudentRepository;
import org.eclipse.microprofile.openapi.annotations.Operation;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;

@ApplicationScoped
@Path("/student")
public class StudentService {

    @Inject
    StudentRepository studentRepository;

    @Inject
    GroupRepository groupRepository;

    @Inject
    EntityManager em;

    //region GET-Endpoints
    @GET
    @Operation(
            summary = "Get all Students"
    )
    @Produces(MediaType.APPLICATION_JSON)
    public List<Student> getAll() {
        return studentRepository.listAll();
    }

    @GET
    @Operation(
            summary = "Get Students by Group ID",
            description = "Get Students by Group ID"
    )
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/bygroupid/{groupid}")
    public List<Student> getByGroupId(@PathParam("groupid") long id) {
        try {
            Group g = groupRepository.findById(id);
            TypedQuery<Student> query = em.createNamedQuery("Student.getStudentByGroupId", Student.class)
                    .setParameter("GROUP", g);

            return query.getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    @GET
    @Operation(
            summary = "Get Students by Group Name"
    )
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/bygroupname/{name}")
    public List<Student> getByGroupName(@PathParam("name") String name) {
        try {
            TypedQuery<Group> gq = em.createNamedQuery("Group.getByName", Group.class)
                    .setParameter("NAME", name);
            Group g = gq.getSingleResult();

            TypedQuery<Student> query = em.createNamedQuery("Student.getStudentByGroupName", Student.class)
                    .setParameter("GROUP", g);
            return query.getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }
    //endregion

    //region POST-Endpoints
    @POST
    @Operation(
            summary = "Create a new Student",
            description = "Create a new Student"
    )
    @Transactional
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)

    public Response create(Student student, @Context UriInfo info) {

        studentRepository.merge(student);
        return Response.created(URI.create(info.getPath())).build();
    }
    //endregion

    //region DELETE-Endpoints
    @DELETE
    @Transactional
    @Operation(
            summary = "Delete a student by ID"
    )
    @Path("/deletebyid/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("id") long id) {
        try {
            Student s = studentRepository.findById(id);
            studentRepository.deleteById(id);
            return Response.status(200).header("Deleted", s.getFirstName() + " " + s.getLastName()).build();
        } catch (IllegalArgumentException e) {
            return Response.status(400).header("Reason", "Student mit id " + id + " existiert nicht").build();
        }

    }
    //endregion

}
