package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateCottageRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateCottageRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.CottageResponse;
import rs.ac.uns.ftn.isa.isa.api.responses.CottagesResponse;
import rs.ac.uns.ftn.isa.isa.model.Cottage;
import rs.ac.uns.ftn.isa.isa.model.CottageDateRange;
import rs.ac.uns.ftn.isa.isa.services.CottageService;

import javax.validation.Valid;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cottage")
public class CottageApi {

    private final CottageService cottageService;

    public CottageApi(CottageService cottageService) {
        this.cottageService = cottageService;
    }

    @GetMapping(value = "/all")
    @ResponseStatus(HttpStatus.OK)
    public List<CottagesResponse> getAll() throws Exception {
        return cottageService.getMine().stream().map(this::toCottagesResponse).collect(Collectors.toList());
    }

    @GetMapping(value = "/filter")
    @ResponseStatus(HttpStatus.OK)
    public List<CottagesResponse> filterByName(@RequestParam(name = "cottage_name") String name) throws Exception {
        return cottageService.filterMineByName(name).stream().map(this::toCottagesResponse).collect(Collectors.toList());
    }

    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(@RequestBody @Valid CreateCottageRequest request) throws Exception {
        return cottageService.create(request);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CottageResponse getById(@PathVariable UUID id) throws Exception {
        return toCottageResponse(cottageService.getById(id));
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@PathVariable UUID id, @RequestBody @Valid UpdateCottageRequest request) throws Exception {
        cottageService.update(id, request);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) throws Exception {
        cottageService.deleteById(id);
    }

    private CottagesResponse toCottagesResponse(Cottage cottage){
        return CottagesResponse.builder()
                .id(cottage.getId())
                .name(cottage.getName())
                .address(cottage.getAddress())
                .rating(cottage.getDateRanges().stream().filter(b->b.getEnd().isBefore(ZonedDateTime.now())&&b.getRating()!=0).mapToDouble(CottageDateRange::getRating)
                        .average()
                        .orElse(0))
                .build();
    }

    private CottageResponse toCottageResponse(Cottage cottage){
        return CottageResponse.builder()
                .id(cottage.getId())
                .name(cottage.getName())
                .address(cottage.getAddress())
                .promotional(cottage.getPromotional())
                .photoURLs(cottage.getPhotoURLs())
                .roomNumber(cottage.getRoomNumber())
                .bedNumber(cottage.getBedNumber())
                .rules(cottage.getRules())
                .build();
    }
}
