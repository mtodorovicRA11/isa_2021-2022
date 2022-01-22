package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateBoatDateRangeRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateBoatDateRangeReviewRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.BoatDateRangeResponse;
import rs.ac.uns.ftn.isa.isa.model.BoatDateRange;
import rs.ac.uns.ftn.isa.isa.services.BoatDateRangeService;

import javax.validation.Valid;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/boat")
public class BoatDateRangeApi {

    private final BoatDateRangeService boatDateRangeService;

    public BoatDateRangeApi(BoatDateRangeService boatDateRangeService) {
        this.boatDateRangeService = boatDateRangeService;
    }

    @GetMapping(value = "/{id}/date-range/all")
    @ResponseStatus(HttpStatus.OK)
    public List<BoatDateRangeResponse> getAll(@PathVariable UUID id) throws Exception {
        return boatDateRangeService.getAllForBoatId(id).stream().map(this::toBoatDateRangeResponse).collect(Collectors.toList());
    }

    @PostMapping(value = "/{id}/date-range/")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@PathVariable UUID id, @RequestBody @Valid CreateBoatDateRangeRequest request) throws Exception {
        boatDateRangeService.create(id, request);
    }

    private BoatDateRangeResponse toBoatDateRangeResponse(BoatDateRange boatDateRange) {
        String pattern = "dd/MM/yyyy hh:mm";
        return BoatDateRangeResponse.builder()
                .id(boatDateRange.getId())
                .beginning(DateTimeFormatter.ofPattern(pattern).format(boatDateRange.getBeginning()))
                .end(DateTimeFormatter.ofPattern(pattern).format(boatDateRange.getEnd()))
                .availableToRent(boatDateRange.getAvailableToRent())
                .rentedBy(boatDateRange.getRenter() != null ? boatDateRange.getRenter().getName() : "FREE")
                .renterReviewLeft(boatDateRange.getRenterRating()!=null)
                .build();
    }

    @PostMapping(value = "/date-range/{dateRangeId}/renter-review")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createRenterReview(@PathVariable UUID dateRangeId, @RequestBody @Valid CreateBoatDateRangeReviewRequest request) throws Exception {
        boatDateRangeService.createRenterReview(dateRangeId, request.getComment(), request.getShowed(), Integer.parseInt(request.getRating()));
    }
}
