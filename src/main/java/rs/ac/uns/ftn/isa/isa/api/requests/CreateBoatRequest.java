package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class CreateBoatRequest {

    @NotEmpty
    private String name;

    @NotEmpty
    private String type;

    @NotEmpty
    private Double length;

    @NotEmpty
    private String motorNumber;

    @NotEmpty
    private Integer motorPower;

    @NotEmpty
    private Integer maxSpeed;

    @NotEmpty
    private String address;

    private String navigationEquipment;
    private String promo;
    private String photoURLs;
    private Integer capacity;
    private String rules;
    private String fishingEquipment;
    private String additionalInformation;
}
