package rs.ac.uns.ftn.isa.isa.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ZahtevZaRegistraciju {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String email;

    private String lozinka;

    private String ponovljenaLozinka;

    private String adresa;

    private String grad;

    private String drzava;

    private String brojTelefona;

    private String tipRegistracije;

    private String obrazlozenjeRegistracije;

    private Boolean zahtevObradjen;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getGrad() {
        return grad;
    }

    public void setGrad(String grad) {
        this.grad = grad;
    }

    public String getDrzava() {
        return drzava;
    }

    public void setDrzava(String drzava) {
        this.drzava = drzava;
    }

    public String getBrojTelefona() {
        return brojTelefona;
    }

    public void setBrojTelefona(String brojTelefona) {
        this.brojTelefona = brojTelefona;
    }

    public String getTipRegistracije() {
        return tipRegistracije;
    }

    public void setTipRegistracije(String tipRegistracije) {
        this.tipRegistracije = tipRegistracije;
    }

    public String getObrazlozenjeRegistracije() {
        return obrazlozenjeRegistracije;
    }

    public void setObrazlozenjeRegistracije(String obrazlozenjeRegistracije) {
        this.obrazlozenjeRegistracije = obrazlozenjeRegistracije;
    }

    public Boolean getZahtevObradjen() {
        return zahtevObradjen;
    }

    public void setZahtevObradjen(Boolean zahtevObradjen) {
        this.zahtevObradjen = zahtevObradjen;
    }
}
