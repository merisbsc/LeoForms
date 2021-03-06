package at.htl.model;

import javax.json.bind.annotation.JsonbProperty;
import javax.persistence.*;

@Entity
@Table(name = "LF_STUDENT")
@NamedQueries(
        {@NamedQuery(
                name = "Student.getStudentByGroupId",
                query = "SELECT s from Student s where s.group= :GROUP"
        ), @NamedQuery(
                name = "Student.getStudentByGroupName",
                query = "SELECT s from Student s where s.group= :GROUP"
        ), @NamedQuery(
                name = "Student.getStudentByMatNr",
                query = "SELECT s from Student s where s.matNr= :MATNR"
        )
        }

)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "S_ID")
    Long id;

    @Column(name = "S_FIRSTNAME")
    String firstName;
    @Column(name = "S_LASTNAME")
    String lastName;
    @Column(name = "S_EMAIL")
    String email;
    @JsonbProperty
    @Column(name = "S_MATNR")
    String matNr;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "G_ID")
    Group group;

    public Student(String matNr, String firstName, String lastName, String email, Group group) {
        this.matNr = matNr;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.group = group;
    }

    public Student() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public String getMatNr() {
        return matNr;
    }

    public void setMatNr(String matNr) {
        this.matNr = matNr;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", group=" + group +
                '}';
    }
}
