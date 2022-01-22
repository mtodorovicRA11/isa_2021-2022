package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateBoatDateRangeRequest;
import rs.ac.uns.ftn.isa.isa.model.Boat;
import rs.ac.uns.ftn.isa.isa.model.BoatDateRange;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.repository.BoatDateRangeRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class BoatDateRangeService {

    private final BoatDateRangeRepository boatDateRangeRepository;
    private final BoatService boatService;
    private final UserService userService;
    private final MailService mailService;

    public BoatDateRangeService(BoatDateRangeRepository boatDateRangeRepository, BoatService boatService, UserService userService, MailService mailService) {
        this.boatDateRangeRepository = boatDateRangeRepository;
        this.boatService = boatService;
        this.userService = userService;
        this.mailService = mailService;
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

        final User renter = request.getRenterId() != null ? userService.getUserById(request.getRenterId()) : null;

        ZonedDateTime beginning = LocalDateTime.parse(request.getBeginning()).atZone(ZoneId.systemDefault());
        ZonedDateTime end = LocalDateTime.parse(request.getEnd()).atZone(ZoneId.systemDefault());

        createBoatDateRange(boat, renter, beginning, end, request.getMaxRenters(), request.getAdditionalOffers(), request.getPrice(), Objects.equals(request.getAvailableToRent(), "Yes"));

        if(renter!=null){
            mailService.sendSimpleMessage(renter.getEmail(), "You've just rented a Boat", "Please check it out");
        }

//        since this is not implemented -> the below line is commented
//        mailService.sendSimpleMessage("EACH_MAIL_FROM_THE_LIST", "Boat availability changed", "Check it out!");
    }

    public void createRenterReview(UUID dateRangeId, String comment, Boolean showed, Integer rating) throws Exception {

        BoatDateRange boatDateRange = getById(dateRangeId);
        boatDateRange.setRenterRating(rating);
        boatDateRange.setRenterShowed(showed);
        boatDateRange.setRenterComment(comment);
        boatDateRangeRepository.save(boatDateRange);

        if(rating==1){
            final String mailText = "User "+boatDateRange.getRenter().getName() + " received rating of 1";
            mailService.sendSimpleMessage("katarina.kaca.pantovic@gmail.com", "Low user rating", mailText);
        }
    }

    private BoatDateRange getById(UUID id) throws Exception {

        Optional<BoatDateRange> boatDateRangeOptional = boatDateRangeRepository.findById(id);

        return boatDateRangeOptional.orElseThrow(() -> new Exception("Boat date range not found"));
    }

    public BoatDateRange createBoatDateRange(Boat boat, User user, ZonedDateTime beginning, ZonedDateTime end, int maxRenters, String additionalOffers, Integer price, Boolean availableToRent) throws Exception {

        checkRanges(boat, beginning, end);

        BoatDateRange boatDateRange = new BoatDateRange();
        boatDateRange.setBoat(boat);
        boatDateRange.setRenter(user);
        boatDateRange.setBeginning(beginning);
        boatDateRange.setEnd(end);
        boatDateRange.setMaxRenters(maxRenters);
        boatDateRange.setAdditionalOffers(additionalOffers);
        boatDateRange.setPrice(price);
        boatDateRange.setAvailableToRent(availableToRent);

        return boatDateRangeRepository.save(boatDateRange);
    }

    private void checkRanges(Boat boat, ZonedDateTime beginning, ZonedDateTime end) throws Exception {

        if(!beginning.isBefore(end)){
            throw new Exception("Beginning has to be BEFORE the End");
        }

        if(beginning.isBefore(ZonedDateTime.now())){
            throw new Exception("Creation in the past error");
        }

        //(StartA <= EndB) and (EndA >= StartB)
        for (BoatDateRange dateRange : boat.getDateRanges()) {
            if(dateRange.getBeginning().isBefore(end) && dateRange.getEnd().isAfter(beginning)){
                throw new Exception("Range clash error");
            }
        }
    }
}
