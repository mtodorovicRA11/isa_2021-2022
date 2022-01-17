package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateBoatRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateBoatRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.BoatResponse;
import rs.ac.uns.ftn.isa.isa.api.responses.BoatsResponse;
import rs.ac.uns.ftn.isa.isa.model.Boat;
import rs.ac.uns.ftn.isa.isa.model.BoatDateRange;
import rs.ac.uns.ftn.isa.isa.services.BoatService;

import javax.validation.Valid;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/boat")
public class BoatApi {

    private final BoatService boatService;

    public BoatApi(BoatService boatService) {
        this.boatService = boatService;
    }

    @GetMapping(value = "/all")
    @ResponseStatus(HttpStatus.OK)
    public List<BoatsResponse> getAll() throws Exception {
        return boatService.getMine().stream().map(this::toBoatsResponse).collect(Collectors.toList());
    }

    @GetMapping(value = "/filter")
    @ResponseStatus(HttpStatus.OK)
    public List<BoatsResponse> filterByName(@RequestParam(name = "boat_name") String name) throws Exception {
        return boatService.filterMineByName(name).stream().map(this::toBoatsResponse).collect(Collectors.toList());
    }

    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(@RequestBody @Valid CreateBoatRequest request) throws Exception {
        return boatService.create(request);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BoatResponse getById(@PathVariable UUID id) throws Exception {
        return toBoatResponse(boatService.getById(id));
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@PathVariable UUID id, @RequestBody @Valid UpdateBoatRequest request) throws Exception {
        boatService.update(id, request);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) throws Exception {
        boatService.deleteById(id);
    }

    private BoatsResponse toBoatsResponse(Boat boat){
        return BoatsResponse.builder()
                .id(boat.getId())
                .name(boat.getName())
                .type(boat.getType())
                .address(boat.getAddress())
                .rating(boat.getDateRanges().stream().filter(b->b.getEnd().isBefore(ZonedDateTime.now())&&b.getRating()!=0).mapToDouble(BoatDateRange::getRating)
                        .average()
                        .orElse(0))
                .build();
    }

    private BoatResponse toBoatResponse(Boat boat){
        return BoatResponse.builder()
                .id(boat.getId())
                .name(boat.getName())
                .type(boat.getType())
                .length(boat.getLength())
                .motorNumber(boat.getMotorNumber())
                .motorPower(boat.getMotorPower())
                .maxSpeed(boat.getMaxSpeed())
                .address(boat.getAddress())
                .navigationEquipment(boat.getNavigationEquipment())
                .promo(boat.getPromo())
                .photoURLs(boat.getPhotoURLs())
                .capacity(boat.getCapacity())
                .rules(boat.getRules())
                .fishingEquipment(boat.getFishingEquipment())
                .additionalInformation(boat.getAdditionalInformation())
                .build();
    }
}
