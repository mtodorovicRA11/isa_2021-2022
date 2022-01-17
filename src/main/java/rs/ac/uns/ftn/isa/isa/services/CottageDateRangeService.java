package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateCottageDateRangeRequest;
import rs.ac.uns.ftn.isa.isa.model.*;
import rs.ac.uns.ftn.isa.isa.repository.CottageDateRangeRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CottageDateRangeService {

    private final CottageDateRangeRepository cottageDateRangeRepository;
    private final CottageService cottageService;
    private final UserService userService;

    public CottageDateRangeService(CottageDateRangeRepository cottageDateRangeRepository, CottageService cottageService, UserService userService) {
        this.cottageDateRangeRepository = cottageDateRangeRepository;
        this.cottageService = cottageService;
        this.userService = userService;
    }

    public List<CottageDateRange> getAllForCottageId(UUID id) throws Exception {

        final Cottage cottage = cottageService.getById(id);
        return cottage.getDateRanges();
    }

    public void create(UUID cottageId, CreateCottageDateRangeRequest request) throws Exception {

        final User user = userService.getMe();
        final Cottage cottage = cottageService.getById(cottageId);
        if (cottage.getOwner().getId() != user.getId()) {
            throw new Exception("Only Cottage Owner can create slots");
        }

        ZonedDateTime beginning = LocalDateTime.parse(request.getBeginning()).atZone(ZoneId.systemDefault());
        ZonedDateTime end = LocalDateTime.parse(request.getEnd()).atZone(ZoneId.systemDefault());

        final User occupant = request.getOccupantId() != null ? userService.getUserById(request.getOccupantId()) : null;

        createCottageDateRange(cottage, occupant, beginning, end, request.getMaxOccupants(), request.getDescription(), request.getPrice());
    }

    public CottageDateRange createCottageDateRange(Cottage cottage, User user, ZonedDateTime beginning, ZonedDateTime end, int maxOccupants, String description, Integer price) throws Exception {

        checkRanges(cottage, beginning, end);

        CottageDateRange cottageDateRange = new CottageDateRange();
        cottageDateRange.setCottage(cottage);
        cottageDateRange.setOccupant(user);
        cottageDateRange.setBeginning(beginning);
        cottageDateRange.setEnd(end);
        cottageDateRange.setMaxOccupants(maxOccupants);
        cottageDateRange.setDescription(description);
        cottageDateRange.setPrice(price);

        return cottageDateRangeRepository.save(cottageDateRange);
    }

    private void checkRanges(Cottage cottage, ZonedDateTime beginning, ZonedDateTime end) throws Exception {

        if(!beginning.isBefore(end)){
            throw new Exception("Beginning has to be BEFORE the End");
        }

        if(beginning.isBefore(ZonedDateTime.now())){
            throw new Exception("Creation in the past error");
        }

        //(StartA <= EndB) and (EndA >= StartB)
        for (CottageDateRange dateRange : cottage.getDateRanges()) {
            if(dateRange.getBeginning().isBefore(end) && dateRange.getEnd().isAfter(beginning)){
                throw new Exception("Range clash error");
            }
        }
    }
}
