package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;
import rs.ac.uns.ftn.isa.isa.model.User;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

@Data
public class CreateCottageDateRangeRequest {

    @NotNull
    private ZonedDateTime beginning;

    @NotNull
    private ZonedDateTime end;

    @NotNull
    private int maxOccupants;

    @NotEmpty
    private String description;

    @NotEmpty
    private Integer price;

    private User occupant;
}
