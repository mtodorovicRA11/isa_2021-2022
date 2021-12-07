package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.UUID;

@Entity
@Table(name = "adventure")
@Setter
@Getter
@NoArgsConstructor
@Where(clause = "deleter='false'")
public class Adventure {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotEmpty
    private String name;

    private String address;
    private String description;
    private String instructorBiography;
    /*TODO add images*/
    private int maxVisitors;
    /*TODO free slot for quick resevaton*/
    private String rules;
    private String equipment;
    /*TODO prices and info about extra services*/
    /*TODO enum for canceling options*/
}
