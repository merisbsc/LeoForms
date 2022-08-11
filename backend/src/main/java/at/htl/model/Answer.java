package at.htl.model;

import javax.persistence.*;

@Entity
@Table(name = "LF_ANSWER")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "A_ID")
    Long id;

    @Column(name = "A_VALUE")
    String value;
    @ManyToOne
    Question question;

    public Answer() {
    }

    public Answer(String value) {
        this.value = value;
    }

    public Answer(Long id, String value, Question question) {
        this.id = id;
        this.value = value;
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
