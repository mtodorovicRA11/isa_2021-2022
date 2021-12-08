package rs.ac.uns.ftn.isa.isa.model;

import lombok.Getter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.util.UUID;

@MappedSuperclass
@Getter
public class BaseEntity implements Persistable<UUID> {

    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "BypassIdGenerationIfSet")
    @GenericGenerator(name = "BypassIdGenerationIfSet", strategy = "rs.ac.uns.ftn.isa.isa.model.BypassIdGenerationIfSet")
    private UUID id;

    @Transient
    public boolean isNew() {
        return null == this.getId();
    }
}
