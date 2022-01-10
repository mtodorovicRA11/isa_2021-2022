package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateBoatDateRangeRequest;
import rs.ac.uns.ftn.isa.isa.model.Boat;
import rs.ac.uns.ftn.isa.isa.model.BoatDateRange;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.repository.BoatDateRangeRepository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BoatDateRangeService {

    private final BoatDateRangeRepository boatDateRangeRepository;
    private final BoatService boatService;
    private final UserService userService;

    public BoatDateRangeService(BoatDateRangeRepository boatDateRangeRepository, BoatService boatService, UserService userService) {
        this.boatDateRangeRepository = boatDateRangeRepository;
        this.boatService = boatService;
        this.userService = userService;
    }


    public List<BoatDateRange> getAllForBoatId(UUID id) throws Exception {

        final Boat boat = boatService.getById(id);
        return boat.getDateRanges();
    }

    public void create(UUID boatId, CreateBoatDateRangeRequest request) throws Exception {

        final User user = userService.getMe();
        final Boat boat = boatService.getById(boatId);
        if (boat.getOwner().getId()!=user.getId()){
            throw new Exception("Only Boat Owner can create boat slots");
        }

        createBoatDateRange(boat, request.getRenter(), request.getBeginning(), request.getEnd(), request.getMaxRenters(), request.getAdditionalOffers(), request.getPrice());
    }

    public BoatDateRange createBoatDateRange(Boat boat, User user, ZonedDateTime beginning, ZonedDateTime end, int maxRenters, String additionalOffers, Integer price){

        BoatDateRange boatDateRange = new BoatDateRange();
        boatDateRange.setBoat(boat);
        boatDateRange.setRenter(user);
        boatDateRange.setBeginning(beginning);
        boatDateRange.setEnd(end);
        boatDateRange.setMaxRenters(maxRenters);
        boatDateRange.setAdditionalOffers(additionalOffers);
        boatDateRange.setPrice(price);

        return boatDateRangeRepository.save(boatDateRange);
    }
}
