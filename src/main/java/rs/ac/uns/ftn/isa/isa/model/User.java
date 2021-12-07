package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import rs.ac.uns.ftn.isa.isa.model.enums.Role;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "user")
@Setter
@Getter
@NoArgsConstructor
@Where(clause = "deleted='false'")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Email
    @NotEmpty
    @Column(unique = true)
    private String email;

    @NotEmpty
    private String hashedPasword;

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    private String address;
    private String city;
    private String country;
    private String phoneNumber;
    private String reasonForRegistration;

    @NotNull
    private Boolean deleted;

    @NotNull
    private Boolean approved;

    @OneToMany(
            mappedBy = "owner",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Cottage> cottages = new ArrayList<>();

    @OneToMany(
            mappedBy = "occupant",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CottageDateRange> cottageDateRanges = new ArrayList<>();

}
