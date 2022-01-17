package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.SignInRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.SignUpRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.SignInResponse;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.security.JwtUtils;

import java.util.Objects;

@Service
public class AuthenticationService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    public AuthenticationService(UserService userService, MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
        passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public void signUp(SignUpRequest request) throws Exception {

        if(!Objects.equals(request.getPassword(), request.getPasswordRepeat())){
            throw new Exception("Passwords don't match");
        }

        userService.createUser(request.getEmail(), request.getPassword(), request.getRole(), request.getName(), request.getSurname(), request.getAddress(), request.getCity(), request.getCountry(), request.getPhoneNumber(), request.getReason());

        String emailText = request.getName() + " just registered! You need to activate this user!";
        mailService.sendSimpleMessage("lazarpantovic@gmail.com", "NEW REGISTRATION", emailText);
    }

    public SignInResponse signIn(SignInRequest request) throws Exception {

        final User user = userService.getUserByEmail(request.getEmail());
        if(!user.getApproved()){
            throw new Exception("User is not Approved");
        }
        if(!passwordEncoder.matches(request.getPassword(), user.getHashedPasword())){
            throw new Exception("Wrong Email or Password");
        }
        final String token = JwtUtils.generateJwtToken(user);
        return SignInResponse.builder().userId(user.getId()).jwt(token).role(user.getRole()).build();
    }
}
