package com.aptech.apiv1;

import com.aptech.apiv1.enums.AirportName;
import com.aptech.apiv1.enums.Cities;
import com.aptech.apiv1.enums.IataCode;
import com.aptech.apiv1.model.Airport;
import com.aptech.apiv1.model.Flight;
import com.aptech.apiv1.repository.AirportRepository;
import com.aptech.apiv1.repository.FlightRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiV1Application {

	public static void main(String[] args) {
		var context = SpringApplication.run(ApiV1Application.class, args);
		AirportRepository airportRepository = context.getBean(AirportRepository.class);
		FlightRepository flightRepository = context.getBean(FlightRepository.class);
		Airport origin = new Airport()
				.setIata_code(IataCode.SGN.toString())
				.setName(AirportName.TANSANNHAT.toString())
				.setCity(Cities.HCM.toString());
		Airport destination = new Airport()
				.setIata_code(IataCode.HAN.toString())
				.setName(AirportName.HANOI.toString())
				.setCity(Cities.HANOI.toString());
		airportRepository.save(origin);
		airportRepository.save(destination);
		for(int i =120; i<=124; i+=2){
			Flight flight = new Flight()
					.setFlightNumber(i)
					.setOrigin(origin)
					.setDestination(destination);
			flightRepository.save(flight);
		}
		for(int i =121; i<=125; i+=2){
			Flight flight = new Flight()
					.setFlightNumber(i)
					.setOrigin(destination)
					.setDestination(origin);
			flightRepository.save(flight);
		}

	}
//	@Bean
//	CommandLineRunner init(FlightRepository flightRepository){
//		return args -> {
//
//		};
//	}
}
