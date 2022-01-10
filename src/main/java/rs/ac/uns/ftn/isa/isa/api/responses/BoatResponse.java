package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public class BoatResponse {

    private UUID id;
    private String name;
    private String type;
    private Double length;
    private String motorNumber;
    private Integer motorPower;
    private Integer maxSpeed;
    private String address;
    private String navigationEquipment;
    private String promo;
    private String photoURLs;
    private Integer capacity;
    private String rules;
    private String fishingEquipment;
    private String additionalInformation;
    // TODO: 1/10/22 return avg rating
}
