package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "`cottage_date_range`")
@Setter
@Getter
@NoArgsConstructor
public class CottageDateRange {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    private ZonedDateTime beginning;

    @NotNull
    private ZonedDateTime end;

    private int maxOccupants;
    private String description;

    @NotEmpty
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cottage cottage;

    @ManyToOne(fetch = FetchType.LAZY)
    private User occupant;
}
