package rs.ac.uns.ftn.isa.isa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.uns.ftn.isa.isa.model.Cottage;

import java.util.UUID;

@Repository
public interface CottageRepository extends JpaRepository<Cottage, UUID> {
    
}
