package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

@Entity
@Table(name = "`boat_date_range`")
@Setter
@Getter
@NoArgsConstructor
public class BoatDateRange extends BaseEntity {

    @NotNull
    private ZonedDateTime beginning;

    @NotNull
    private ZonedDateTime end;

    private Integer maxRenters;
    private String additionalOffers;

    @NotEmpty
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    private Boat boat;

    @ManyToOne(fetch = FetchType.LAZY)
    private User renter;

    @Min(1)
    @Max(5)
    private Integer renterRating;

    @Min(1)
    @Max(5)
    private int rating;
}
