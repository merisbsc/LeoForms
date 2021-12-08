package at.htl.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "LF_QUESTIONNAIRE")
public class Questionnaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QN_ID")
    Long id;

    @Column(name = "QN_NAME")
    String name;

    @Column(name = "QN_CREATION_DATE")
    LocalDate creationDate;

    @Column(name = "QN_MARKDOWN")
    String markdown;

    public Questionnaire() {
    }

    public Questionnaire(Long id, String name, LocalDate creationDate, String markdown) {
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
}
