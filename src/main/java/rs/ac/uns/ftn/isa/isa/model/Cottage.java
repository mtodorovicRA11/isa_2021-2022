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
import java.util.UUID;

@Entity
@Table(name = "cottage")
@Setter
@Getter
@NoArgsConstructor
@Where(clause = "deleted='false'")
public class Cottage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String address;

    private String promotional;
    private String photoURLs;
    private Integer roomNumber;
    private Integer bedNumber;
    private String rules;

    @NotNull
    private Boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User owner;

    @OneToMany(
            mappedBy = "cottage",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CottageDateRange> dateRanges = new ArrayList<>();
}
