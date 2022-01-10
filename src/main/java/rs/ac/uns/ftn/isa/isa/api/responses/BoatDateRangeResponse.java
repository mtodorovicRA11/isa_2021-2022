package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Builder
@Getter
public class BoatDateRangeResponse {

    private UUID id;
    private ZonedDateTime beginning;
    private ZonedDateTime end;
    private int maxRenters;
    private String additionalOffers;
    private Boolean available;
}
