package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boat")
@Setter
@Getter
@NoArgsConstructor
@Where(clause = "deleted='false'")
public class Boat extends BaseEntity{

    @NotEmpty
    private String name;

    @NotEmpty
    private String type;

    @NotEmpty
    private Double length;

    @NotEmpty
    private String motorNumber;

    @NotEmpty
    private Integer motorPower;

    @NotEmpty
    private Integer maxSpeed;

    @NotEmpty
    private String address;

    private String navigationEquipment;
    private String promo;
    private String photoURLs;
    private Integer capacity;
    private String rules;
    private String fishingEquipment;
    private String additionalInformation;

    @NotNull
    private Boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User owner;

    @OneToMany(
            mappedBy = "boat",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<BoatDateRange> dateRanges = new ArrayList<>();
}
