package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import rs.ac.uns.ftn.isa.isa.model.enums.Role;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Builder
public class SignInResponse {

    @NotNull
    private UUID userId;

    @NotEmpty
    private String jwt;

    @NotNull
    private Role role;

}
