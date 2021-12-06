package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.ChangePasswordRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateUserRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.UserResponse;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.services.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserApi {

    private final UserService userService;

    public UserApi(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/me")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse getMe(){
        return toUserResponse(userService.getMe());
    }

    @PutMapping(value = "/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateMe(@RequestBody @Valid UpdateUserRequest request){
        userService.updateMe(request);
    }

    @PutMapping(value = "/me/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestBody @Valid ChangePasswordRequest request){
        userService.changePassword(request.getNewPassword());
    }

    @PutMapping(value = "/me/deactivate")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deactivateMe(){
        userService.deactivateMe();
    }

    private UserResponse toUserResponse(User user){
        return UserResponse.builder().build();
    }
}
