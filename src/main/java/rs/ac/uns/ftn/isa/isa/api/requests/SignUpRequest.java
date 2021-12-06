package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Data
public class SignUpRequest {

    @NotBlank
    private String email;

    // TODO: 12/6/21 finish all the parameters

}
