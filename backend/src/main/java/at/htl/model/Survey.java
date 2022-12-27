package at.htl.model;

import io.vertx.codegen.annotations.Nullable;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "LF_SURVEY")
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SU_ID")
    Long id;
    @Column(name = "SU_CREATION_DATE")
    LocalDate creationDate;
    @Column(name = "SU_END_DATE")
    LocalDate endDate;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Template template;
    @Column(name = "SU_STATUS")
    @Enumerated(EnumType.STRING)
    Status status;
    @Column(name = "SU_NAME")
    String name;
    @Column(name = "SU_DESCRIPTION")
    String description;

    @Column(name = "SU_HTML")
    String html;

    @JsonbTransient
    @ManyToMany
    @JoinTable(
            name = "LF_SURVEY_GROUP",
            joinColumns = @JoinColumn(name = "LF_SG_SURVEY_ID"),
            inverseJoinColumns = @JoinColumn(name = "LF_SG_GROUP_ID")
    )
    Set<Group> groups;

    public Survey() {

    }

    public Survey(LocalDate creationDate, LocalDate endDate, Template template,
                  Status status, String name, String description, Set<Group> groups,
                  String html) {
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.template = template;
        this.status = status;
        this.name = name;
        this.description = description;
        this.groups = groups;
        this.html = html;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Template getTemplate() {
        return template;
    }

    public void setTemplate(Template template) {
        this.template = template;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }
}
