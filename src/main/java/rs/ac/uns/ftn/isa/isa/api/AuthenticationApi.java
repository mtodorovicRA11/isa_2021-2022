package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.SignInRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.SignUpRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.SignInResponse;
import rs.ac.uns.ftn.isa.isa.services.AuthenticationService;

import javax.validation.Valid;

@RestController
@RequestMapping("/authentication")
public class AuthenticationApi {

    private final AuthenticationService authenticationService;

    public AuthenticationApi(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(value = "/sign-up")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void signUp(@RequestBody @Valid SignUpRequest request) {
        authenticationService.signUp(request);
    }

    @PostMapping(value = "/sign-in")
    @ResponseStatus(HttpStatus.OK)
    public SignInResponse signIn(@RequestBody @Valid SignInRequest request) throws Exception {
        return authenticationService.signIn(request);
    }

}
