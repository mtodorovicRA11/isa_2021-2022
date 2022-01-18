package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class CreateBoatDateRangeRequest {

    @NotNull
    private String beginning;

    @NotNull
    private String end;

    @NotEmpty
    private Integer price;

    @NotNull
    private int maxRenters;

    @NotNull
    private String availableToRent;

    private String additionalOffers;

    private UUID renterId;

}
