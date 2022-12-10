package at.htl.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "LF_TEMPLATE")
@NamedQueries(
        @NamedQuery(
                name = "Template.getTemplateByName",
                query = "select t from Template t where t.name = :NAME"
        )
)
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "T_ID")
    Long id;

    @Column(name = "T_NAME")
    String name;

    @Column(name = "T_CREATION_DATE")
    LocalDate creationDate;

    @Column(name = "T_MARKDOWN" ,columnDefinition="TEXT")
    String markdown;

    @Column(name = "T_DESCRIPTION")
    String description;


    public Template() {
    }

    public Template(Long id, String name, LocalDate creationDate, String markdown) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.markdown = markdown;
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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getMarkdown() {
        return markdown;
    }

    public void setMarkdown(String markdown) {
        this.markdown = markdown;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
