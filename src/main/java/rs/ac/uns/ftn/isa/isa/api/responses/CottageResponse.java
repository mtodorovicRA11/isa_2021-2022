package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public class CottageResponse {

    private UUID id;
    private String name;
    private String address;
    private String promotional;
    private String photoURLs;
    private Integer roomNumber;
    private Integer bedNumber;
    private String rules;
    // TODO: 1/10/22 return avg rating
}
