package rs.ac.uns.ftn.isa.isa.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateCottageDateRangeRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateCottageDateRangeReviewRequest;
import rs.ac.uns.ftn.isa.isa.api.responses.CottageDateRangeResponse;
import rs.ac.uns.ftn.isa.isa.model.CottageDateRange;
import rs.ac.uns.ftn.isa.isa.services.CottageDateRangeService;

import javax.validation.Valid;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cottage")
public class CottageDateRangeApi {

    private final CottageDateRangeService cottageDateRangeService;

    public CottageDateRangeApi(CottageDateRangeService cottageDateRangeService) {
        this.cottageDateRangeService = cottageDateRangeService;
    }

    @GetMapping(value = "/{id}/date-range/all")
    @ResponseStatus(HttpStatus.OK)
    public List<CottageDateRangeResponse> getAll(@PathVariable UUID id) throws Exception {
        return cottageDateRangeService.getAllForCottageId(id).stream().map(this::toCottageDateRangeResponse).collect(Collectors.toList());
    }

    @PostMapping(value = "/{id}/date-range/")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@PathVariable UUID id, @RequestBody @Valid CreateCottageDateRangeRequest request) throws Exception {
        cottageDateRangeService.create(id, request);
    }

    @PostMapping(value = "/date-range/{dateRangeId}/occupant-review")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createRenterReview(@PathVariable UUID dateRangeId, @RequestBody @Valid CreateCottageDateRangeReviewRequest request) throws Exception {
        cottageDateRangeService.createOccupantReview(dateRangeId, request.getComment(), request.getShowed(), Integer.parseInt(request.getRating()));
    }

    private CottageDateRangeResponse toCottageDateRangeResponse(CottageDateRange cottageDateRange) {
        String pattern = "dd/MM/yyyy hh:mm";
        return CottageDateRangeResponse.builder()
                .id(cottageDateRange.getId())
                .beginning(DateTimeFormatter.ofPattern(pattern).format(cottageDateRange.getBeginning()))
                .end(DateTimeFormatter.ofPattern(pattern).format(cottageDateRange.getEnd()))
                .availableToOccupy(cottageDateRange.getAvailableToOccupy())
                .occupiedBy(cottageDateRange.getOccupant() != null ? cottageDateRange.getOccupant().getName() : "FREE")
                .occupantReviewLeft(cottageDateRange.getOccupantRating()!=null)
                .build();
    }
}
