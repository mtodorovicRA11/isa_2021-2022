package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ChangePasswordRequest {

    @NotBlank
    private String newPassword;
}
