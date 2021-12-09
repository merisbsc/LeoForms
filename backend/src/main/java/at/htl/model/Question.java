package at.htl.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "LF_QUESTION")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Q_ID")
    Long id;

    @Column(name = "Q_QUESTION_TEXT")
    String questionText;

    @Column(name = "Q_FIELD_NAME")
    String fieldname;

    @ManyToOne(fetch = FetchType.LAZY)
    Questionnaire questionnaire;

    public Question() {
    }

    public Question(Long id, String questionText, String fieldname, Questionnaire questionnaire) {
        this.id = id;
        this.questionText = questionText;
        this.fieldname = fieldname;
        this.questionnaire = questionnaire;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getFieldname() {
        return fieldname;
    }

    public void setFieldname(String fieldname) {
        this.fieldname = fieldname;
    }

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }
}
