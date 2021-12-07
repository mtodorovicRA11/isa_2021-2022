package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateUserRequest;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.model.enums.Role;
import rs.ac.uns.ftn.isa.isa.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public User getMe(){
        // TODO: 12/6/21 add implementation
        return null;
    }

    public void updateMe(UpdateUserRequest request){
        // TODO: 12/6/21 add implementation
    }

    public void changePassword(String password){
        // TODO: 12/6/21 add implementation
    }

    public void deactivateMe(){
        // TODO: 12/6/21 add implementation
    }

    public User getUserByEmail(String email) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional.orElseThrow(() -> new Exception("User not found"));
    }

    public void createUser(String email, String password, Role role, String name, String surname, String address, String city, String country, String phoneNumber, String reason){

        User user = new User();
        user.setEmail(email);
        user.setHashedPasword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setName(name);
        user.setSurname(surname);
        user.setAddress(address);
        user.setCity(city);
        user.setCountry(country);
        user.setPhoneNumber(phoneNumber);
        user.setReasonForRegistration(reason);
        user.setDeleted(false);
        user.setApproved(false);

        userRepository.save(user);
    }

}
