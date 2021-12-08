package rs.ac.uns.ftn.isa.isa.api.responses;

import lombok.Builder;
import lombok.Getter;
import rs.ac.uns.ftn.isa.isa.model.enums.Role;

import java.util.UUID;

@Builder
@Getter
public class UserResponse {

    private UUID id;
    private Role role;
    private String email;
    private String name;
    private String surname;
    private String address;
    private String city;
    private String country;
    private String phoneNumber;
    private String reasonForRegistration;

}
