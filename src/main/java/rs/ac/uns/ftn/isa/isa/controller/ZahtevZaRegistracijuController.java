package rs.ac.uns.ftn.isa.isa.controller;

import rs.ac.uns.ftn.isa.isa.model.ZahtevZaRegistraciju;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.repository.ZahtevZaRegistracijuRepository;

@Controller
@RequestMapping("/registracija_vlasnika_instruktora")
@CrossOrigin(origins = "*")
public class ZahtevZaRegistracijuController {

    @Autowired
    private ZahtevZaRegistracijuRepository zahtevZaRegistracijuRepository;

    @PostMapping("/create")
    public @ResponseBody String createNewZahtevZaRegistraciju() {

        ZahtevZaRegistraciju noviZahtev = new ZahtevZaRegistraciju();

        noviZahtev.setEmail("bobanpoznanovic1@gmail.com");
        noviZahtev.setLozinka("mojaLozinka");
        noviZahtev.setAdresa("Boska Petrovica 6");
        noviZahtev.setGrad("Novi Sad");
        noviZahtev.setDrzava("Srbija");
        noviZahtev.setBrojTelefona("06000123456");
        noviZahtev.setTipRegistracije("Vlasnik broda");
        noviZahtev.setObrazlozenjeRegistracije("Testiranje zahteva");
        noviZahtev.setZahtevObradjen(false);

        zahtevZaRegistracijuRepository.save(noviZahtev);

        return  "Saved";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<ZahtevZaRegistraciju> getAllZahteviZaRegistraciju() {
        return zahtevZaRegistracijuRepository.findAll();
    }
}
