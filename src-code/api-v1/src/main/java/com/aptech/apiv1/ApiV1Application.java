package com.aptech.apiv1;

import com.aptech.apiv1.enums.ACType;
import com.aptech.apiv1.enums.IataCode;
import com.aptech.apiv1.model.Airport;
import com.aptech.apiv1.model.Flight;
import com.aptech.apiv1.model.Seat;
import com.aptech.apiv1.repository.AirportRepository;
import com.aptech.apiv1.repository.FlightRepository;
import com.aptech.apiv1.repository.SeatRepository;
import com.aptech.apiv1.utils.others.CreateSeatsOnFlight;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.aptech.apiv1.utils.business.IataCodeUtils.*;

@SpringBootApplication
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

	static void initialize(ConfigurableApplicationContext context){
		AirportRepository airportRepository = context.getBean(AirportRepository.class);
		FlightRepository flightRepository = context.getBean(FlightRepository.class);
		SeatRepository seatRepository = context.getBean(SeatRepository.class);
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
		for(int i =120; i<=124; i+=2){
			Flight flight = new Flight()
					.setFlightNumber(i)
					.setDate(new Date())
					.setOrigin(origin)
					.setDestination(destination);
			flight = flightRepository.save(flight);
			List<Seat> seatmap = CreateSeatsOnFlight.createSeatsA320(flight);
			seatRepository.saveAll(seatmap);
		}
		for(int i =121; i<=125; i+=2){
			Flight flight = new Flight()
					.setFlightNumber(i)
					.setDate(new Date())
					.setOrigin(destination)
					.setDestination(origin);
			flight = flightRepository.save(flight);
			List<Seat> seatmap = CreateSeatsOnFlight.createSeatsA320(flight);
			seatRepository.saveAll(seatmap);
		}
	} // .end of initialize();

}
