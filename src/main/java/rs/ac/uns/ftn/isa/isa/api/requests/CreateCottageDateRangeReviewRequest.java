package rs.ac.uns.ftn.isa.isa.api.requests;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CreateCottageDateRangeReviewRequest {

    @NotBlank
    private String comment;

    @NotNull
    private Boolean showed;

    @NotBlank
    private String rating;
}
