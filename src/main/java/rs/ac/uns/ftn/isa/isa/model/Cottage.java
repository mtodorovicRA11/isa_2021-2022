package rs.ac.uns.ftn.isa.isa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Cottage {
    
    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

}
