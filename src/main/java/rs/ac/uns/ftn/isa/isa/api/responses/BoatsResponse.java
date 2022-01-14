package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public class BoatsResponse {

    private UUID id;
    private String name;
    private String type;
    private String address;
    private Double rating;
}
