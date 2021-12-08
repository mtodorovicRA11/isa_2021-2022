package rs.ac.uns.ftn.isa.isa.model;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.UUIDGenerator;

import java.io.Serializable;

public class BypassIdGenerationIfSet extends UUIDGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor s, Object obj) {
        return ((BaseEntity)obj).getId() != null ? ((BaseEntity)obj).getId() : super.generate(s, obj);
    }

}
