package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Builder
public class SignInResponse {

    @NotNull
    private UUID userId;

    @NotEmpty
    private String jwt;

    // TODO: 12/6/21 finish all the parameters

}
