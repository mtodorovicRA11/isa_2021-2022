package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;
import rs.ac.uns.ftn.isa.isa.model.enums.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class SignUpRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String passwordRepeat;

    @NotNull
    private Role role;

    @NotEmpty
    private String name;
    @NotEmpty
    private String surname;

    private String address;
    private String city;
    private String country;
    private String phoneNumber;
    private String reason;

}
