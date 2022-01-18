package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public class CottageDateRangeResponse {

    private UUID id;
    private String beginning;
    private String end;
    private Boolean availableToOccupy;
    private String occupiedBy;
}
