package rs.ac.uns.ftn.isa.isa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.uns.ftn.isa.isa.model.BoatDateRange;

import java.util.UUID;

@Repository
public interface BoatDateRangeRepository extends JpaRepository<BoatDateRange, UUID> {
    
}
