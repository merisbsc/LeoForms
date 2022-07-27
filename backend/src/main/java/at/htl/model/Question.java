package at.htl.model;

import javax.persistence.*;

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
    Template template;

    public Question() {
    }

    public Question(Long id, String questionText, String fieldname, Template template) {
        this.id = id;
        this.questionText = questionText;
        this.fieldname = fieldname;
        this.template = template;
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

    public Template getTemplate() {
        return template;
    }

    public void setTemplate(Template template) {
        this.template = template;
    }
}
