package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "owner_registration_request")
@Setter
@Getter
@NoArgsConstructor
public class OwnerRegistrationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String repeatPassword;

    private String address;

    private String city;

    private String country;

    private String phoneNumber;

    private String registrationType; /* TODO implement types per owner type*/

    private String registrationExplanation;

    @NotNull
    private Boolean requestProcessed;

}
