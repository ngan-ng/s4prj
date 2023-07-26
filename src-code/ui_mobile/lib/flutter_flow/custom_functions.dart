import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'lat_lng.dart';
import 'place.dart';
import 'uploaded_file.dart';

dynamic getPaxQty(
  int? adl,
  int? chd,
  int? inf,
) {
  return {
    'adl': adl ?? 1,
    'chd': chd ?? 0,
    'inf': inf ?? 0,
  };
}

List<dynamic>? genPaxSchema(
  int? adl,
  int? chd,
  int? inf,
) {
  int index = 0;
  if (adl == null) {
    adl = 1;
  }
  List<Map<String, dynamic>> bookingList = [];
  for (int i = 0; i < adl; i++) {
    if (index == i) {
      bookingList.add({
        "id": index.toString(),
        "title": "",
        "firstName": "",
        "lastName": "",
        "gender": "ADL",
        "dob": "",
        "mobile": "",
        "email": ""
      });
    } else {
      bookingList.add({
        "id": index.toString(),
        "title": "",
        "firstName": "",
        "lastName": "",
        "gender": "ADL",
        "dob": ""
      });
    }
    index++;
  }
  if (chd != null) {
    for (int i = 1; i <= chd; i++) {
      bookingList.add({
        "id": index.toString(),
        "title": "",
        "firstName": "",
        "lastName": "",
        "gender": "CHD",
        "dob": ""
      });
      index++;
    }
  }
  if (inf != null) {
    for (int i = 1; i <= inf; i++) {
      bookingList.add({
        "id": index.toString(),
        "associate": "0",
        "firstName": "",
        "lastName": "",
        "gender": "INF",
        "dob": ""
      });
      index++;
    }
  }
  return bookingList;
}

dynamic editPax(
  String? title,
  String firstName,
  String lastName,
  String dob,
  String? email,
  String? mobile,
  String gender,
  String? associate,
  String? index,
) {
  if (gender == 'ADL') {
    if (email != null && mobile != null) {
      return {
        "id": index,
        "title": title,
        "firstName": firstName,
        "lastName": lastName,
        "gender": 'ADL',
        "dob": dob,
        "email": email,
        "mobile": mobile
      };
    }
    return {
      "id": index,
      "title": title,
      "firstName": firstName,
      "lastName": lastName,
      "gender": 'ADL',
      "dob": dob
    };
  }
  if (gender == 'INF') {
    return {
      "id": index,
      "associate": associate,
      "firstName": firstName,
      "lastName": lastName,
      "dob": dob,
      "gender": "INF"
    };
  }
  if (gender == 'CHD') {
    return {
      "id": index,
      "title": title,
      "firstName": firstName,
      "lastName": lastName,
      "gender": 'CHD',
      "dob": dob
    };
  }
}

List<dynamic>? finalizeBookings(
  List<dynamic>? bookings,
  dynamic departFlight,
  dynamic returnFlight,
) {
  List<Map<String, dynamic>> groupBooking = [];
  int? departId = departFlight["id"];

  for (var b in bookings!) {
    Map<String, dynamic> item = {};
    item["dob"] = b["dob"];
    item["firstName"] = b["firstName"];
    item["lastName"] = b["lastName"];
    item["gender"] = b["gender"];
    item["flight"] = {"id": departId};
    item["loadSeatDto"] = {"id": 0};
    if (b.containsKey("title")) {
      item["title"] = b["title"];
    }
    if (b.containsKey("email") || b.containsKey("mobile")) {
      item["email"] = b["email"];
      item["mobile"] = b["mobile"];
    }

    for (var inf in bookings) {
      if (inf["gender"] == "INF") {
        if (b["id"] == inf["associate"]) {
          item["infant"] = inf;
        }
      }
    }

    groupBooking.add(item);
  }
  if (returnFlight.isNotEmpty) {
    int? returnId = returnFlight["id"];
    for (var b in bookings) {
      Map<String, dynamic> item = {};
      item["dob"] = b["dob"];
      item["firstName"] = b["firstName"];
      item["lastName"] = b["lastName"];
      item["gender"] = b["gender"];
      item["flight"] = {"id": returnId};
      item["loadSeatDto"] = {"id": 0};
      if (b.containsKey("title")) {
        item["title"] = b["title"];
      }
      if (b.containsKey("email") || b.containsKey("mobile")) {
        item["email"] = b["email"];
        item["mobile"] = b["mobile"];
      }

      for (var inf in bookings) {
        if (inf["gender"] == "INF") {
          if (b["id"] == inf["associate"]) {
            item["infant"] = inf;
          }
        }
      }
      groupBooking.add(item);
    }
  }
  return groupBooking;
}

List<dynamic>? genSeatRow(List<dynamic>? seats) {
  List<Map<String, dynamic>> block = [];

  List<List> rows = [];
  List singleRow = [];
  for (int index = 0; index < seats!.length; index++) {
    print(seats[index]);
    if ((index + 1) % 3 != 0) {
      block.add(seats[index]);
    } else {
      block.add(seats[index]);
      singleRow.add(block);
      if (singleRow.length % 2 == 0) {
        rows.add(singleRow);
        singleRow = [];
      }
      block = [];
    }
  }
  return rows;
}
