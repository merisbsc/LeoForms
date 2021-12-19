package at.htl.model;

import javax.persistence.*;

@Entity
@Table(name = "LF_GROUP")
@NamedQueries(
        @NamedQuery(
                name = "Group.getByName",
                query = "SELECT g from Group g where g.name= :NAME"
        )
)
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "G_ID", insertable = false, updatable = false)
    Long id;

    @Column(name = "G_NAME")
    String name;
    @Column(name = "G_YEAR")
    String year;

    public Group() {
    }

    public Group(String name, String year) {
        this.name = name;
        this.year = year;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

}
