package at.htl.boundary;

import at.htl.model.Group;
import at.htl.model.Student;
import at.htl.repositories.GroupRepository;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.constraints.Positive;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;

@ApplicationScoped
@Path("/group/")
public class GroupService {

    @Inject
    GroupRepository groupRepository;

    @GET
    @Operation(
            summary = "Get all Groups",
            description = "Get all Groups"
    )
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Group> getAllGroups() {
        return groupRepository.listAll();
    }

    @POST
    @Operation(
            summary = "Create a new Group",
            description = "Create a new Group"
    )
    @Transactional
    @Path("/add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(Group group, @Context UriInfo info) {

        groupRepository.persist(group);
        return Response.
                created(URI.create(info.getPath() + "/" + group.getId()))
                .build();
    }


    @DELETE
    @Transactional
    @Path("/deletebyid/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("id") long id) {
        try{
            Group g = groupRepository.findById(id);
            String g_name = g.getName();
            groupRepository.deleteById(id);
            return Response.status(200).header("Deleted", g.getName()).build();
        } catch (IllegalArgumentException e){
            return Response.status(400).header("Reason", "Gruppe mit id " + id + " existiert nicht").build();
        }

    }



}

