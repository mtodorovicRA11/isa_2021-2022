package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Builder
@Getter
public class CottageDateRangeResponse {

    private UUID id;
    private ZonedDateTime beginning;
    private ZonedDateTime end;
    private Boolean available;
}
