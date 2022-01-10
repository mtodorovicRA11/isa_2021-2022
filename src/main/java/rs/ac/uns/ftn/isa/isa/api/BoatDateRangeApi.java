package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateBoatDateRangeRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.BoatDateRangeResponse;
import rs.ac.uns.ftn.isa.isa.model.BoatDateRange;
import rs.ac.uns.ftn.isa.isa.services.BoatDateRangeService;

import javax.validation.Valid;
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

    private BoatDateRangeResponse toBoatDateRangeResponse(BoatDateRange boatDateRange){
        return BoatDateRangeResponse.builder()
                .id(boatDateRange.getId())
                .beginning(boatDateRange.getBeginning())
                .end(boatDateRange.getEnd())
                .maxRenters(boatDateRange.getMaxRenters())
                .additionalOffers(boatDateRange.getAdditionalOffers())
                .available(boatDateRange.getRenter()==null)
                .build();
    }
}
