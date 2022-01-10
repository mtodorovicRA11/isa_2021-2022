package rs.ac.uns.ftn.isa.isa.services;

import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.isa.isa.api.requests.CreateBoatRequest;
import rs.ac.uns.ftn.isa.isa.api.requests.UpdateBoatRequest;
import rs.ac.uns.ftn.isa.isa.model.Boat;
import rs.ac.uns.ftn.isa.isa.model.User;
import rs.ac.uns.ftn.isa.isa.repository.BoatRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BoatService {

    private final BoatRepository boatRepository;
    private final UserService userService;

    public BoatService(BoatRepository boatRepository, UserService userService) {
        this.boatRepository = boatRepository;
        this.userService = userService;
    }

    public List<Boat> getMine() throws Exception {

        final User user = userService.getMe();
        return user.getBoats();
    }

    public List<Boat> filterMineByName(String name) throws Exception {

        return getMine().stream().filter(boat -> boat.getName().toLowerCase().contains(name.toLowerCase())).collect(Collectors.toList());
    }

    public UUID create(CreateBoatRequest request) throws Exception {

        final User user = userService.getMe();
        final Boat boat = createBoat(user, request.getName(), request.getType(), request.getLength(), request.getMotorNumber(), request.getMotorPower(), request.getMaxSpeed(), request.getAddress(), request.getNavigationEquipment(), request.getPromo(), request.getPhotoURLs(), request.getCapacity(), request.getRules(), request.getFishingEquipment(), request.getAdditionalInformation());

        return boat.getId();
    }

    public Boat getById(UUID id) throws Exception {

        Optional<Boat> boatOptional = boatRepository.findById(id);

        return boatOptional.orElseThrow(() -> new Exception("Boat not found"));
    }

    public void update(UUID uuid, UpdateBoatRequest request) throws Exception {

        Boat boat = getById(uuid);

        boat.setName(request.getName());
        boat.setType(request.getType());
        boat.setLength(request.getLength());
        boat.setMotorNumber(request.getMotorNumber());
        boat.setMotorPower(request.getMotorPower());
        boat.setMaxSpeed(request.getMaxSpeed());
        boat.setAddress(request.getAddress());
        boat.setNavigationEquipment(request.getNavigationEquipment());
        boat.setPromo(request.getPromo());
        boat.setPhotoURLs(request.getPhotoURLs());
        boat.setCapacity(request.getCapacity());
        boat.setRules(request.getRules());
        boat.setFishingEquipment(request.getFishingEquipment());
        boat.setAdditionalInformation(request.getAdditionalInformation());

        boatRepository.save(boat);
    }

    public void deleteById(UUID id) throws Exception {

        Boat boat = getById(id);
        boat.setDeleted(true);

        boatRepository.save(boat);
    }

    public Boat createBoat(User user, String name, String type, Double length, String motorNumber, Integer motorPower, Integer maxSpeed, String address, String navigationEquipment, String promo, String photoURLs, Integer capacity, String rules, String fishingEquipment, String additionalInformation) {

        Boat boat = new Boat();
        boat.setName(name);
        boat.setType(type);
        boat.setLength(length);
        boat.setMotorNumber(motorNumber);
        boat.setMotorPower(motorPower);
        boat.setMaxSpeed(maxSpeed);
        boat.setAddress(address);
        boat.setNavigationEquipment(navigationEquipment);
        boat.setPromo(promo);
        boat.setPhotoURLs(photoURLs);
        boat.setCapacity(capacity);
        boat.setRules(rules);
        boat.setFishingEquipment(fishingEquipment);
        boat.setAdditionalInformation(additionalInformation);
        boat.setOwner(user);
        boat.setDeleted(false);

        return boatRepository.save(boat);

    }

}
