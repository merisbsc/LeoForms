package at.htl.model;

import javax.persistence.*;
import javax.ws.rs.ext.ParamConverter;

@Entity
@Table(name = "LF_POLL")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "P_ID")
    Long id;
    @Column(name = "P_TOKEN")
    String token;
    @ManyToOne(fetch = FetchType.LAZY)
    Student student;
    @ManyToOne(fetch = FetchType.LAZY)
    Survey survey;

    public Poll() {
    }

    public Poll(Long id, String token, Student student, Survey survey) {
        this.id = id;
        this.token = token;
        this.student = student;
        this.survey = survey;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }
}
