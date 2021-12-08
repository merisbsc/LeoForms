package at.htl.model;

import javax.persistence.*;

@Entity
@Table(name = "LF_STUDENT")
public class Student {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
            @Column(name = "S_ID", insertable = false, updatable = false)
    Long id;

    @Column(name = "S_FIRSTNAME")
    String firstName;
    @Column(name = "S_LASTNAME")
    String lastName;
    @Column(name = "S_EMAIL")
    String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "G_ID")
    Group group;

}
