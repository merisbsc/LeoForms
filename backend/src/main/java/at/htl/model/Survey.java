package at.htl.model;

import io.vertx.codegen.annotations.Nullable;

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
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    Template template;
    @Column(name = "SU_STATUS")
    @Enumerated(EnumType.STRING)
    Status status;


    public Survey() {
    }

    public Survey(Long id, LocalDate creationDate, LocalDate endDate, Status status) {
        this.id = id;
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.status = status;
    }

    public Survey(Long id, LocalDate creationDate, LocalDate endDate, Template template, Status status) {
        this.id = id;
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.template = template;
        this.status = status;
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

}
