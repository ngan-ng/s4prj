import 'dart:convert';
import 'dart:typed_data';

import '../../flutter_flow/flutter_flow_util.dart';

import 'api_manager.dart';

export 'api_manager.dart' show ApiCallResponse;

const _kPrivateApiFunctionName = 'ffPrivateApiCall';

class FetchAirportsCall {
  static Future<ApiCallResponse> call() {
    return ApiManager.instance.makeApiCall(
      callName: 'fetchAirports',
      apiUrl:
          'https://api-s4prj-f330af7ed779.herokuapp.com/api-v1/guest/airport/getAll',
      callType: ApiCallType.GET,
      headers: {},
      params: {},
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }

  static dynamic airports(dynamic response) => getJsonField(
        response,
        r'''$''',
        true,
      );
}

class SearchFlightCall {
  static Future<ApiCallResponse> call({
    String? origin = '',
    String? destination = '',
    String? departDate = '',
    String? returnDate = '',
    String? tripType = '',
  }) {
    final body = '''
{
  "origin": "${origin}",
  "destination": "${destination}",
  "departDate": "${departDate}",
  "returnDate": "${returnDate}",
  "tripType": "${tripType}"
}''';
    return ApiManager.instance.makeApiCall(
      callName: 'searchFlight',
      apiUrl:
          'https://api-s4prj-f330af7ed779.herokuapp.com/api-v1/guest/flight/search',
      callType: ApiCallType.POST,
      headers: {},
      params: {},
      body: body,
      bodyType: BodyType.JSON,
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }

  static dynamic outboundFlights(dynamic response) => getJsonField(
        response,
        r'''$.outboundFlights''',
        true,
      );
  static dynamic inboundFlights(dynamic response) => getJsonField(
        response,
        r'''$.inboundFlights''',
        true,
      );
}

class CreateBookingsCall {
  static Future<ApiCallResponse> call({
    dynamic? bookingsJson,
  }) {
    final bookings = _serializeJson(bookingsJson, true);
    final body = '''
{
  "bookings": ${bookings}
}''';
    return ApiManager.instance.makeApiCall(
      callName: 'createBookings',
      apiUrl:
          'https://api-s4prj-f330af7ed779.herokuapp.com/api-v1/guest/booking/create',
      callType: ApiCallType.POST,
      headers: {},
      params: {},
      body: body,
      bodyType: BodyType.JSON,
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }
}

class GetSeatsByFlightIdCall {
  static Future<ApiCallResponse> call({
    int? flightId,
  }) {
    return ApiManager.instance.makeApiCall(
      callName: 'getSeatsByFlightId',
      apiUrl:
          'https://api-s4prj-f330af7ed779.herokuapp.com/api-v1/guest/seat/getAllByFlight/${flightId}',
      callType: ApiCallType.GET,
      headers: {},
      params: {},
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }
}

class HandleSeatCall {
  static Future<ApiCallResponse> call({
    int? id,
    int? bookingId,
    String? action = '',
  }) {
    final body = '''
{
  "id": ${id},
  "bookingId": ${bookingId},
  "action": "${action}"
}''';
    return ApiManager.instance.makeApiCall(
      callName: 'handleSeat',
      apiUrl:
          'https://api-s4prj-f330af7ed779.herokuapp.com/api-v1/guest/seat/handle',
      callType: ApiCallType.POST,
      headers: {},
      params: {},
      body: body,
      bodyType: BodyType.JSON,
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }
}

class ApiPagingParams {
  int nextPageNumber = 0;
  int numItems = 0;
  dynamic lastResponse;

  ApiPagingParams({
    required this.nextPageNumber,
    required this.numItems,
    required this.lastResponse,
  });

  @override
  String toString() =>
      'PagingParams(nextPageNumber: $nextPageNumber, numItems: $numItems, lastResponse: $lastResponse,)';
}

String _serializeList(List? list) {
  list ??= <String>[];
  try {
    return json.encode(list);
  } catch (_) {
    return '[]';
  }
}

String _serializeJson(dynamic jsonVar, [bool isList = false]) {
  jsonVar ??= (isList ? [] : {});
  try {
    return json.encode(jsonVar);
  } catch (_) {
    return isList ? '[]' : '{}';
  }
}
