package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class CreateBoatDateRangeRequest {

    @NotNull
    private ZonedDateTime beginning;

    @NotNull
    private ZonedDateTime end;

    @NotNull
    private int maxRenters;

    @NotEmpty
    private String additionalOffers;

    @NotEmpty
    private Integer price;

    private UUID renterId;
}
