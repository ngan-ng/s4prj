package com.aptech.apiv1;

import com.aptech.apiv1.enums.ACType;
import com.aptech.apiv1.enums.FlightStatus;
import com.aptech.apiv1.enums.IataCode;
import com.aptech.apiv1.enums.PromotionType;
import com.aptech.apiv1.model.*;
import com.aptech.apiv1.model.user.Role;
import com.aptech.apiv1.model.user.UserRole;
import com.aptech.apiv1.repository.*;
import com.aptech.apiv1.utils.others.CreateSeatsOnFlight;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.aptech.apiv1.utils.business.IataCodeUtils.getAirport;
import static com.aptech.apiv1.utils.business.IataCodeUtils.getLocation;

//@ComponentScan(basePackageClasses = SecurityConfiguration.class)
@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "springdoc-openapi", version = "1.0.0"), security = {
        @SecurityRequirement(name = "bearer-key")})
public class ApiV1Application {

    public static void main(String[] args) {
        var context = SpringApplication.run(ApiV1Application.class, args);
//        initialize(context);
//        addPromotions(context);
    }

    static void addPromotions(ConfigurableApplicationContext context) {
        PromotionPolicyRepository policyRepository = context.getBean((PromotionPolicyRepository.class));
        int year = 2023, month = 6, day = 18;
        PromotionsPolicy promotionsPolicy = new PromotionsPolicy()
                .setPromotionCode("PT1399")
                .setDescription("Promotion by points of member!")
                .setDateStart(LocalDateTime.of(year, month, day, 0, 0, 0))
                .setDateEnd(LocalDateTime.of(LocalDate.of(year, month + 1, day), LocalTime.now()))
                .setPromotionType(PromotionType.POINTS.toString())
                .setApplyRate(0.05)
                .setCreatedBy(1);
        policyRepository.save(promotionsPolicy);
    }

    static void initialize(ConfigurableApplicationContext context) {
        AirportRepository airportRepository = context.getBean(AirportRepository.class);
        FlightRepository flightRepository = context.getBean(FlightRepository.class);
        SeatRepository seatRepository = context.getBean(SeatRepository.class);
        AircraftRepository acRepository = context.getBean(AircraftRepository.class);
        Aircraft ac1 = new Aircraft().setType(ACType.A320.toString())
                .setReg("VNA-688").setConfig("Y180");
        Aircraft ac2 = new Aircraft().setType(ACType.A320.toString())
                .setReg("VNA-689").setConfig("Y180");
        acRepository.save(ac1);
        acRepository.save(ac2);
        List<Airport> airportList = new ArrayList<>();
        IataCode.stream().forEach(i -> {
            airportList.add(new Airport()
                    .setIata_code(i.toString())
                    .setName(getAirport(i))
                    .setLocation(getLocation(i)));
        });
        Airport origin = new Airport()
                .setIata_code(IataCode.SGN.toString())
                .setName(getAirport(IataCode.SGN))
                .setLocation(getLocation(IataCode.SGN));
        Airport destination = new Airport()
                .setIata_code(IataCode.HAN.toString())
                .setName(getAirport(IataCode.HAN))
                .setLocation(getLocation(IataCode.HAN));
        airportRepository.saveAll(airportList);
        List<Seat> seatList = new ArrayList<>();

        int durationTurnAround = 60;
        LocalDateTime std;
        // To HA NOI
        // First flight to HAN is at 05:10 AM
        for (int k = 0; k < 3; k += 2) {
            std = LocalDateTime.of(2023, 7, new Date().getDate(), 5, 10, 0);
            std = std.plusDays(k);
            int durationSgnHan = 130;
            for (int i = 120; i <= 125; i++) {
                int stdHr = std.getHour();
                boolean goldenTime = (stdHr > 5 && stdHr < 9) || (stdHr > 16 && stdHr < 20);
                double basePrice = 128;
                Flight flight = getFlight(ac1, origin, destination, std, durationSgnHan, i, goldenTime, basePrice);
                flight = flightRepository.save(flight);
                List<Seat> seatmap = CreateSeatsOnFlight.createSeatsA320(flight);
                seatList.addAll(seatmap);
                std = std.plusMinutes(durationSgnHan + durationTurnAround); // 130 min duration + 60 min turn-around
            }
        }
        // To DA NANG
        // First flight to DAD is at 06:20 AM
        for (int k = 0; k < 3; k += 2) {
            std = LocalDateTime.of(2023, 7, new Date().getDate(), 6, 20, 0);
            std = std.plusDays(k);
            destination.setIata_code(IataCode.DAD.toString())
                    .setName(getAirport(IataCode.DAD))
                    .setLocation(getLocation(IataCode.DAD));
            airportRepository.save(destination);
            int durationSgnDad = 80;
            for (int i = 620; i <= 625; i++) {
                int stdHr = std.getHour();
                boolean goldenTime = (stdHr > 5 && stdHr < 9) || (stdHr > 16 && stdHr < 20);
                double basePrice = 68;
                Flight flight = getFlight(ac2, origin, destination, std, durationSgnDad, i, goldenTime, basePrice);


                flight = flightRepository.save(flight);
                List<Seat> seatmap = CreateSeatsOnFlight.createSeatsA320(flight);
                seatList.addAll(seatmap);
                std = std.plusMinutes(durationSgnDad + durationTurnAround); // 130 min duration + 60 min turn-around
            }
        }

        seatRepository.saveAll(seatList);

        // Role
        RoleRepository roleRepository = context.getBean(RoleRepository.class);
        List<Role> roles = new ArrayList<>();
        roles.add(new Role().setRole(UserRole.ADMIN));
        roles.add(new Role().setRole(UserRole.GENERAL_ADMIN));
        roles.add(new Role().setRole(UserRole.MEMBER));
        roleRepository.saveAll(roles);
    } // .end of initialize();

    private static Flight getFlight(Aircraft ac, Airport origin, Airport destination, LocalDateTime std, int durationSgnHan, int i, boolean goldenTime, double basePrice) {
        return new Flight().setFlightNumber(i)
                .setSTD(std)
                .setDuration(durationSgnHan)
                .setOrigin(i % 2 == 0 ? origin : destination)
                .setDestination(i % 2 == 0 ? destination : origin)
                .setFlightStatus(FlightStatus.ONTIME.toString())
                .setAircraft(ac)
                .setBasePrice(goldenTime ? basePrice + 15 : basePrice);
    }

}
