package at.htl.model;

import io.vertx.codegen.annotations.Nullable;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "LF_GROUP")
@NamedQueries({
        @NamedQuery(
                name = "Group.getByName",
                query = "SELECT g from Group g where g.name= :NAME"
        ),
        @NamedQuery(
                name = "Group.deleteById",
                query = "DELETE from Group g where g.id= :ID"
        )
}
)
public class Group {


    //Long id;
    @Column(name = "G_NAME")
    String name;
    @Column(name = "G_YEAR")
    String year;
    @Id
    @Column(name = "G_ID", insertable = false, updatable = false)
    String id;
    @ManyToMany(mappedBy = "groups")
    @Nullable
    Set<Survey> surveys;

    public Group() {
    }

    public Group(String name, String year) {
        this.name = name;
        this.year = year;
        this.id = this.year + "_" + this.name;
    }

    public String getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = getYear() + "_" + getName();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public void setId(String id) {
        this.id = id;
    }

    public @Nullable Set<Survey> getSurveys() {
        return surveys;
    }

    public void setSurveys(@Nullable Set<Survey> surveys) {
        this.surveys = surveys;
    }
}
