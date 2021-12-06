package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateCottageRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateCottageRequest;
import rs.ac.uns.ftn.isa.isa.model.Cottage;

import java.util.List;
import java.util.UUID;

@Service
public class CottageService {

    public List<Cottage> getMine(){
        // TODO: 12/6/21 add implementation
        return null;
    }

    public List<Cottage> filterByName(String name){
        // TODO: 12/6/21 add implementation
        return null;
    }

    public UUID create(CreateCottageRequest request){
        // TODO: 12/6/21 add implementation
        return null;
    }

    public Cottage getById(UUID id){
        // TODO: 12/6/21 add implementation
        return null;
    }

    public void update(UUID uuid, UpdateCottageRequest request){
        // TODO: 12/6/21 add implementation
    }

    public void deleteById(UUID id){
        // TODO: 12/6/21 add implementation
    }

}
