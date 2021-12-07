package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdateCottageRequest {

    @NotEmpty
    private String name;

    @NotEmpty
    private String address;
    private String promotional;
    private String photoUrls;
    private Integer roomNumber;
    private Integer bedNumber;
    private String rules;
}
