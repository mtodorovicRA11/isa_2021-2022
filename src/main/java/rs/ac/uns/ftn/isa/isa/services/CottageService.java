package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateCottageRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateCottageRequest;
import rs.ac.uns.ftn.isa.isa.model.Cottage;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.repository.CottageRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CottageService {

    private final CottageRepository cottageRepository;
    private final UserService userService;

    public CottageService(CottageRepository cottageRepository, UserService userService) {
        this.cottageRepository = cottageRepository;
        this.userService = userService;
    }

    public List<Cottage> getMine() throws Exception {

        final User user = userService.getMe();
        return user.getCottages();
    }

    public List<Cottage> filterMineByName(String name) throws Exception {

        return getMine().stream().filter(cottage -> cottage.getName().toLowerCase().contains(name.toLowerCase())).collect(Collectors.toList());
    }

    public UUID create(CreateCottageRequest request) throws Exception {

        final User user = userService.getMe();
        final Cottage cottage = createCottage(user, request.getName(), request.getAddress(), request.getPromotional(), request.getPhotoUrls(), request.getRoomNumber(), request.getBedNumber(), request.getRules());

        return cottage.getId();
    }

    public Cottage getById(UUID id) throws Exception {

        Optional<Cottage> cottageOptional = cottageRepository.findById(id);

        return cottageOptional.orElseThrow(() -> new Exception("Cottage not found"));
    }

    public void update(UUID uuid, UpdateCottageRequest request) throws Exception {

        Cottage cottage = getById(uuid);

        cottage.setName(request.getName());
        cottage.setAddress(request.getAddress());
        cottage.setPromotional(request.getPromotional());
        cottage.setPhotoURLs(request.getPhotoUrls());
        cottage.setRoomNumber(request.getRoomNumber());
        cottage.setBedNumber(request.getBedNumber());
        cottage.setRules(request.getRules());

        cottageRepository.save(cottage);
    }

    public void deleteById(UUID id) throws Exception {

        Cottage cottage = getById(id);
        cottage.setDeleted(true);

        cottageRepository.save(cottage);
    }

    public Cottage createCottage(User user, String name, String address, String promotional, String photoUrls, Integer roomNumber, Integer bedNumber, String rules) {

        Cottage cottage = new Cottage();
        cottage.setName(name);
        cottage.setAddress(address);
        cottage.setPromotional(promotional);
        cottage.setPhotoURLs(photoUrls);
        cottage.setRoomNumber(roomNumber);
        cottage.setBedNumber(bedNumber);
        cottage.setRules(rules);
        cottage.setOwner(user);
        cottage.setDeleted(false);

        return cottageRepository.save(cottage);

    }

}
