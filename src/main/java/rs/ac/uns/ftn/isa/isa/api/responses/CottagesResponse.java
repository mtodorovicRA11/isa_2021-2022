package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public class CottagesResponse {

    private UUID id;
    private String name;
    private String address;
    private Double rating;
}
