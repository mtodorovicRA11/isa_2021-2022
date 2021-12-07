package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "quick_adventure_reservation")
@Setter
@Getter
@NoArgsConstructor
public class QuickAdventureReservation {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private UUID id;

    @NotNull
    private ZonedDateTime beginning;

    @NotNull
    private ZonedDateTime end;

    private String address;
    private int maxVisitors;
    /* TODO tags for extra services private List<String> extraService = new ArrayList<>(); */
    private Integer price;

}
