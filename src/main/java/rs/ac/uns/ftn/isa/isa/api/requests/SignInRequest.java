package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SignInRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

}
