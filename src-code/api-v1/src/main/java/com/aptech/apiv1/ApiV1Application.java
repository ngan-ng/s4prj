package com.aptech.apiv1;

import com.aptech.apiv1.enums.ACType;
import com.aptech.apiv1.enums.FlightStatus;
import com.aptech.apiv1.enums.IataCode;
import com.aptech.apiv1.model.Aircraft;
import com.aptech.apiv1.model.Airport;
import com.aptech.apiv1.model.Flight;
import com.aptech.apiv1.model.Seat;
import com.aptech.apiv1.model.admin.AdminRole;
import com.aptech.apiv1.model.admin.Role;
import com.aptech.apiv1.repository.*;
import com.aptech.apiv1.utils.others.CreateSeatsOnFlight;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.*;

import static com.aptech.apiv1.utils.business.IataCodeUtils.*;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "springdoc-openapi", version = "1.0.0"), security = {
        @SecurityRequirement(name = "bearer-key")})
public class ApiV1Application {

    public static void main(String[] args) {
        var context = SpringApplication.run(ApiV1Application.class, args);
        initialize(context);

    }
//	@Bean
//	CommandLineRunner init(FlightRepository flightRepository){
//		return args -> {
//
//		};
//	}

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
        Airport origin = new Airport()
                .setIata_code(IataCode.SGN.toString())
                .setName(getAirport(IataCode.SGN))
                .setLocation(getLocation(IataCode.SGN));
        Airport destination = new Airport()
                .setIata_code(IataCode.HAN.toString())
                .setName(getAirport(IataCode.HAN))
                .setLocation(getLocation(IataCode.HAN));
        airportRepository.save(origin);
        airportRepository.save(destination);
        List<Seat> seatList = new ArrayList<>();

        // To HA NOI
        // First flight to HAN is at 05:10 AM
        LocalDateTime std = LocalDateTime.of(2023, 7, new Date().getDate(), 5, 10, 0);
        int durationSgnHan = 130;
        int durationTurnAround = 60;
        for (int i = 120; i <= 125; i++) {
            Flight flight = new Flight().setFlightNumber(i)
                    .setSTD(std)
                    .setDuration(durationSgnHan)
                    .setOrigin(i % 2 == 0 ? origin : destination)
                    .setDestination(i % 2 == 0 ? destination : origin)
                    .setFlightStatus(FlightStatus.ONTIME.toString())
                    .setAircraft(ac1);
            flight = flightRepository.save(flight);
            List<Seat> seatmap = CreateSeatsOnFlight.createSeatsA320(flight);
            seatList.addAll(seatmap);
            std = std.plusMinutes(durationSgnHan + durationTurnAround); // 130 min duration + 60 min turn-around
        }
        // To DA NANG
        // First flight to DAD is at 06:20 AM
        std = LocalDateTime.of(2023, 7, new Date().getDate(), 6, 20, 0);
        destination.setIata_code(IataCode.DAD.toString())
                .setName(getAirport(IataCode.DAD))
                .setLocation(getLocation(IataCode.DAD));
        airportRepository.save(destination);
        int durationSgnDad = 80;
        for (int i = 620; i <= 625; i++) {
            Flight flight = new Flight().setFlightNumber(i)
                    .setSTD(std)
                    .setDuration(durationSgnDad)
                    .setOrigin(i % 2 == 0 ? origin : destination)
                    .setDestination(i % 2 == 0 ? destination : origin)
                    .setFlightStatus(FlightStatus.ONTIME.toString())
                    .setAircraft(ac2);
            flight = flightRepository.save(flight);
            List<Seat> seatmap = CreateSeatsOnFlight.createSeatsA320(flight);
            seatList.addAll(seatmap);
            std = std.plusMinutes(durationSgnDad + durationTurnAround); // 130 min duration + 60 min turn-around
        }
        seatRepository.saveAll(seatList);

        // Role
        RoleRepository roleRepository = context.getBean(RoleRepository.class);
        Role adminRole = roleRepository.findByRole(AdminRole.ADMIN);
        if (adminRole == null) {
            adminRole = new Role();
            adminRole.setRole(AdminRole.ADMIN);
            roleRepository.save(adminRole);
        }

    } // .end of initialize();

}
