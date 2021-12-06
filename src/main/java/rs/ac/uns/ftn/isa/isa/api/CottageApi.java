package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateCottageRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateCottageRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.CottageResponse;
import rs.ac.uns.ftn.isa.isa.model.Cottage;
import rs.ac.uns.ftn.isa.isa.services.CottageService;

import javax.validation.Valid;
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
    public List<CottageResponse> getAll(){
        return cottageService.getMine().stream().map(this::toCottageResponse).collect(Collectors.toList());
    }

    @GetMapping(value = "/filter")
    @ResponseStatus(HttpStatus.OK)
    public List<CottageResponse> filterByName(@RequestParam(name = "cottage_name") String name){
        return cottageService.filterByName(name).stream().map(this::toCottageResponse).collect(Collectors.toList());
    }

    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(@RequestBody @Valid CreateCottageRequest request){
        return cottageService.create(request);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CottageResponse getById(@PathVariable UUID id){
        return toCottageResponse(cottageService.getById(id));
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@PathVariable UUID id, @RequestBody @Valid UpdateCottageRequest request){
        cottageService.update(id, request);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id){
        cottageService.deleteById(id);
    }

    private CottageResponse toCottageResponse(Cottage cottage){
        return CottageResponse.builder().build();
    }
}
