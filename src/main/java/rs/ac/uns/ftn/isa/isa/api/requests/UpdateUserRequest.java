package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

@Data
public class UpdateUserRequest {

    private String name;
    private String surname;
    private String address;
    private String city;
    private String country;
    private String phoneNumber;
}
