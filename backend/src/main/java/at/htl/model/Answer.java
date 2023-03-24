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

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "P_ID")
    Poll poll;

    public Answer() {
    }

    public Answer(String value) {
        this.value = value;
    }

    public Answer(String value, Poll poll) {
        this.value = value;
        this.poll = poll;
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

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }
}
