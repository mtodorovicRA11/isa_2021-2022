package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateUserRequest;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.model.enums.Role;
import rs.ac.uns.ftn.isa.isa.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public User getMe() throws Exception {

        return getUserById((java.util.UUID)SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    public void updateMe(UpdateUserRequest request) throws Exception {

        User user = getMe();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setCountry(request.getCountry());
        user.setPhoneNumber(request.getPhoneNumber());

        userRepository.save(user);
    }

    public void changePassword(String password) throws Exception {

        User user = getMe();
        user.setHashedPasword(passwordEncoder.encode(password));

        userRepository.save(user);
    }

    public void deactivateMe() throws Exception {

        User user = getMe();
        user.setDeleted(true);

        userRepository.save(user);
    }

    public User getUserByEmail(String email) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional.orElseThrow(() -> new Exception("User not found"));
    }

    public User getUserById(UUID id) throws Exception {
        Optional<User> userOptional = userRepository.findById(id);

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
