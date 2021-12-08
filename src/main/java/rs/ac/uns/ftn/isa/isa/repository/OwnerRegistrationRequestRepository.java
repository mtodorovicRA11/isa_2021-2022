package rs.ac.uns.ftn.isa.isa.repository;

import rs.ac.uns.ftn.isa.isa.model.OwnerRegistrationRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface OwnerRegistrationRequestRepository extends CrudRepository<OwnerRegistrationRequest, UUID> {
}
