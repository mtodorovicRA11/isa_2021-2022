package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class CreateCottageDateRangeRequest {

    @NotNull
    private ZonedDateTime beginning;

    @NotNull
    private ZonedDateTime end;

    @NotNull
    private int maxOccupants;

    @NotEmpty
    private Integer price;

    private String description;
    private UUID occupantId;
}
