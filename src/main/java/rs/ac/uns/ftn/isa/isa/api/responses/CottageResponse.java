package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;

import java.util.UUID;

@Builder
public class CottageResponse {

    private UUID id;
    private String name;
    private String address;
    private String ownerName;
    private String ownerSurname;
}
