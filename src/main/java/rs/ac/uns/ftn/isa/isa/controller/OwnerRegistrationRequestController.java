package rs.ac.uns.ftn.isa.isa.controller;

import rs.ac.uns.ftn.isa.isa.email.EmailServiceImpl;
import rs.ac.uns.ftn.isa.isa.model.OwnerRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.repository.OwnerRegistrationRequestRepository;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/owner_registration")
public class OwnerRegistrationRequestController {

    @Autowired
    private OwnerRegistrationRequestRepository ownerRegistrationRequestRepository;

    @Autowired
    private EmailServiceImpl emailService;

    @PostMapping("/create")
    public @ResponseBody String createNewZahtevZaRegistraciju() throws MessagingException {

        OwnerRegistrationRequest noviZahtev = new OwnerRegistrationRequest();

        noviZahtev.setEmail("bobanpoznanovic1@gmail.com");
        noviZahtev.setPassword("mojaLozinka");
        noviZahtev.setAddress("Boska Petrovica 6");
        noviZahtev.setCity("Novi Sad");
        noviZahtev.setCountry("Srbija");
        noviZahtev.setPhoneNumber("06000123456");
        noviZahtev.setRegistrationType("Vlasnik broda");
        noviZahtev.setRegistrationExplanation("Testiranje zahteva");
        noviZahtev.setRequestProcessed(false);

        ownerRegistrationRequestRepository.save(noviZahtev);

        emailService.sendSimpleMessage(noviZahtev.getEmail(), "Uspesna registracija", "Cestitamo, uspesno ste se registrovali" );

        return  "Saved";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<OwnerRegistrationRequest> getAllZahteviZaRegistraciju() {
        return ownerRegistrationRequestRepository.findAll();
    }
}
